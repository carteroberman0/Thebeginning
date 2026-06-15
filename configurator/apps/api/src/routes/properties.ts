import type { RenderProgress } from "@configurator/shared";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { renderQueue } from "../jobs/queue.js";
import { toOptionValue, toPropertySummary } from "../mappers.js";
import { basePlaceholderSvg } from "../render/houseSvg.js";
import { storage } from "../storage/storage.js";

export const propertiesRouter = Router();

const createSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
});

// GET /api/properties -> list (newest first).
propertiesRouter.get("/", async (_req, res) => {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: "desc" } });
  res.json(properties.map(toPropertySummary));
});

// POST /api/properties -> create + generate a placeholder base image.
propertiesRouter.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const property = await prisma.property.create({ data: parsed.data });
  const baseImageUrl = await storage.save(
    `properties/${property.id}/base.svg`,
    basePlaceholderSvg(property.name),
    "image/svg+xml",
  );
  const updated = await prisma.property.update({
    where: { id: property.id },
    data: { baseImageUrl },
  });
  res.status(201).json(toPropertySummary(updated));
});

// GET /api/properties/:id -> property + its option list + generated layers.
propertiesRouter.get("/:id", async (req, res) => {
  const property = await prisma.property.findUnique({ where: { id: req.params.id } });
  if (!property) return res.status(404).json({ error: "Property not found" });

  const [options, assets] = await Promise.all([
    prisma.optionCatalog.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] }),
    prisma.renderAsset.findMany({ where: { propertyId: property.id } }),
  ]);

  res.json({
    property: toPropertySummary(property),
    options: options.map(toOptionValue),
    assets: assets.map((a) => ({ optionId: a.optionId, imageUrl: a.imageUrl })),
  });
});

const generateSchema = z.object({
  // Which catalog options to render. Omit/empty => render everything.
  optionIds: z.array(z.string()).optional(),
});

// POST /api/properties/:id/generate -> create + enqueue render jobs.
propertiesRouter.post("/:id/generate", async (req, res) => {
  const parsed = generateSchema.safeParse(req.body ?? {});
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const property = await prisma.property.findUnique({ where: { id: req.params.id } });
  if (!property) return res.status(404).json({ error: "Property not found" });

  const requestedIds = parsed.data.optionIds?.length
    ? parsed.data.optionIds
    : (await prisma.optionCatalog.findMany({ select: { id: true } })).map((o) => o.id);

  // Upsert one job per option, resetting status so re-running regenerates.
  const jobIds: string[] = [];
  for (const optionId of requestedIds) {
    const job = await prisma.renderJob.upsert({
      where: { propertyId_optionId: { propertyId: property.id, optionId } },
      create: { propertyId: property.id, optionId, status: "queued" },
      update: { status: "queued", error: null },
    });
    jobIds.push(job.id);
  }

  await prisma.property.update({ where: { id: property.id }, data: { status: "rendering" } });
  renderQueue.enqueue(jobIds);

  res.status(202).json({ queued: jobIds.length });
});

// GET /api/properties/:id/progress -> render progress for polling.
propertiesRouter.get("/:id/progress", async (req, res) => {
  const jobs = await prisma.renderJob.findMany({
    where: { propertyId: req.params.id },
    include: { option: true },
  });

  const progress: RenderProgress = {
    total: jobs.length,
    done: jobs.filter((j) => j.status === "done").length,
    failed: jobs.filter((j) => j.status === "failed").length,
    jobs: jobs.map((j) => ({
      optionId: j.optionId,
      category: j.option.category as RenderProgress["jobs"][number]["category"],
      value: j.option.value,
      status: j.status as RenderProgress["jobs"][number]["status"],
      error: j.error,
    })),
  };
  res.json(progress);
});
