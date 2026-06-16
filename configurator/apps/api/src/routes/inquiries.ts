import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";

export const inquiriesRouter = Router();

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().max(120).optional(),
  postcode: z.string().max(16).optional(),
  intent: z.enum(["render", "quote", "pro-signup"]).default("render"),
  trade: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
});

// POST /api/inquiries -> capture homeowner/pro interest from the marketing site.
inquiriesRouter.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const inquiry = await prisma.inquiry.create({ data: parsed.data });
  res.status(201).json({ id: inquiry.id, intent: inquiry.intent });
});

// GET /api/inquiries -> recent inquiries (operator view).
inquiriesRouter.get("/", async (_req, res) => {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  res.json(inquiries);
});
