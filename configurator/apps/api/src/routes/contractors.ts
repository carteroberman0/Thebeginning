import { Router } from "express";
import { prisma } from "../db.js";

export const contractorsRouter = Router();

// GET /api/contractors -> vetted local pros in the network (newest first).
contractorsRouter.get("/", async (_req, res) => {
  const contractors = await prisma.contractor.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, trade: true, serviceArea: true },
  });
  res.json(contractors);
});

// GET /api/contractors/categories -> pro count per trade, for the marketplace grid.
contractorsRouter.get("/categories", async (_req, res) => {
  const grouped = await prisma.contractor.groupBy({
    by: ["trade"],
    _count: { _all: true },
  });
  res.json(grouped.map((g) => ({ trade: g.trade, count: g._count._all })));
});
