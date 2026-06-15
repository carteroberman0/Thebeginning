import { Router } from "express";
import { prisma } from "../db.js";
import { groupOptions } from "../mappers.js";

export const optionsRouter = Router();

// GET /api/options -> the full catalog grouped by category.
optionsRouter.get("/", async (_req, res) => {
  const options = await prisma.optionCatalog.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
  res.json(groupOptions(options));
});
