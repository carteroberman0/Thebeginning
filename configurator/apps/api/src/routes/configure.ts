import type { ConfiguratorData, OptionCategory, RenderLayer } from "@configurator/shared";
import { Router } from "express";
import { prisma } from "../db.js";
import { groupOptions, toPropertySummary } from "../mappers.js";

export const configureRouter = Router();

// GET /api/configure/:propertyId -> everything the buyer configurator needs.
// Only options that actually have a generated layer are offered, so the UI
// never shows a swatch that can't be previewed.
configureRouter.get("/:propertyId", async (req, res) => {
  const property = await prisma.property.findUnique({ where: { id: req.params.propertyId } });
  if (!property) return res.status(404).json({ error: "Property not found" });

  const assets = await prisma.renderAsset.findMany({
    where: { propertyId: property.id },
    include: { option: true },
  });

  const layers: RenderLayer[] = assets.map((a) => ({
    optionId: a.optionId,
    category: a.option.category as OptionCategory,
    value: a.option.value,
    imageUrl: a.imageUrl,
  }));

  const data: ConfiguratorData = {
    property: toPropertySummary(property),
    options: groupOptions(assets.map((a) => a.option)),
    layers,
  };
  res.json(data);
});
