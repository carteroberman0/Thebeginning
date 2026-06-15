import type { ConfigurationRecord, Selections } from "@configurator/shared";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";

export const configurationsRouter = Router();

const saveSchema = z.object({
  propertyId: z.string().min(1),
  selections: z.record(z.string()), // { category: optionValue }
  buyerName: z.string().optional(),
  buyerEmail: z.string().email().optional(),
  buyerPhone: z.string().optional(),
});

function toRecord(c: {
  id: string;
  propertyId: string;
  selections: unknown;
  buyerName: string | null;
  buyerEmail: string | null;
  buyerPhone: string | null;
  createdAt: Date;
}): ConfigurationRecord {
  return {
    id: c.id,
    propertyId: c.propertyId,
    selections: c.selections as Selections,
    buyerName: c.buyerName,
    buyerEmail: c.buyerEmail,
    buyerPhone: c.buyerPhone,
    createdAt: c.createdAt.toISOString(),
  };
}

// POST /api/configurations -> persist the scoped job (the buyer's full design).
// A Lead row is created at the same time so phase-2 routing has somewhere to go.
configurationsRouter.post("/", async (req, res) => {
  const parsed = saveSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { propertyId, selections, ...buyer } = parsed.data;

  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) return res.status(404).json({ error: "Property not found" });

  const configuration = await prisma.configuration.create({
    data: {
      propertyId,
      selections,
      buyerName: buyer.buyerName,
      buyerEmail: buyer.buyerEmail,
      buyerPhone: buyer.buyerPhone,
      // Phase-2 scaffold: the lead exists but isn't routed to a contractor yet.
      lead: { create: {} },
    },
  });

  res.status(201).json(toRecord(configuration));
});

// GET /api/configurations/:id -> read back a saved configuration.
configurationsRouter.get("/:id", async (req, res) => {
  const configuration = await prisma.configuration.findUnique({ where: { id: req.params.id } });
  if (!configuration) return res.status(404).json({ error: "Configuration not found" });
  res.json(toRecord(configuration));
});
