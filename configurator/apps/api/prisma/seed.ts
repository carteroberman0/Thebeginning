import type { OptionCategory } from "@configurator/shared";
import { PrismaClient } from "@prisma/client";
import { basePlaceholderSvg, overlaySvg } from "../src/render/houseSvg.js";
import { storage } from "../src/storage/storage.js";

const prisma = new PrismaClient();

/** Full exterior package option catalog (one trade, one town MVP). */
const CATALOG: Array<{
  category: OptionCategory;
  value: string;
  label: string;
  swatchHex: string;
  isDefault?: boolean;
}> = [
  // Siding material
  { category: "siding", value: "vinyl", label: "Vinyl", swatchHex: "#d9d9d9", isDefault: true },
  { category: "siding", value: "cedar-board", label: "Cedar Board", swatchHex: "#b88a5e" },
  { category: "siding", value: "fiber-cement", label: "Fiber Cement", swatchHex: "#aeb4ba" },

  // Siding color
  { category: "siding_color", value: "white", label: "White", swatchHex: "#f1f5f9", isDefault: true },
  { category: "siding_color", value: "hale-navy", label: "Hale Navy", swatchHex: "#2f3e4e" },
  { category: "siding_color", value: "sage", label: "Sage Green", swatchHex: "#8a9a7b" },
  { category: "siding_color", value: "charcoal", label: "Charcoal", swatchHex: "#3f4448" },

  // Roof (style + color)
  { category: "roof", value: "arch-charcoal", label: "Architectural · Charcoal", swatchHex: "#36393d", isDefault: true },
  { category: "roof", value: "arch-weathered", label: "Architectural · Weathered Wood", swatchHex: "#6b5d4f" },
  { category: "roof", value: "metal-black", label: "Standing Seam · Black", swatchHex: "#1f2937" },

  // Shutters
  { category: "shutters", value: "black", label: "Black", swatchHex: "#1f2937", isDefault: true },
  { category: "shutters", value: "white", label: "White", swatchHex: "#f1f5f9" },
  { category: "shutters", value: "forest", label: "Forest Green", swatchHex: "#2f4a3a" },
  { category: "shutters", value: "navy", label: "Navy", swatchHex: "#28354a" },

  // Trim
  { category: "trim", value: "white", label: "White", swatchHex: "#f8fafc", isDefault: true },
  { category: "trim", value: "almond", label: "Almond", swatchHex: "#e7dcc6" },
  { category: "trim", value: "black", label: "Black", swatchHex: "#1f2937" },

  // Garage door (style)
  { category: "garage", value: "classic-raised", label: "Classic Raised Panel", swatchHex: "#e5e7eb", isDefault: true },
  { category: "garage", value: "carriage", label: "Carriage House", swatchHex: "#8a6d4b" },
  { category: "garage", value: "modern-glass", label: "Modern Glass", swatchHex: "#9fb3c8" },

  // Landscaping (package)
  { category: "landscaping", value: "none", label: "None", swatchHex: "#c7d2c0", isDefault: true },
  { category: "landscaping", value: "starter", label: "Starter Beds", swatchHex: "#6b8e5a" },
  { category: "landscaping", value: "premium", label: "Premium Package", swatchHex: "#4d7a3a" },
];

async function main() {
  console.log("Seeding option catalog...");
  for (let i = 0; i < CATALOG.length; i++) {
    const o = CATALOG[i];
    await prisma.optionCatalog.upsert({
      where: { category_value: { category: o.category, value: o.value } },
      create: { ...o, sortOrder: i },
      update: { label: o.label, swatchHex: o.swatchHex, isDefault: o.isDefault ?? false, sortOrder: i },
    });
  }

  // A demo property with every layer pre-generated, so the configurator works
  // immediately without going through the operator flow first.
  const name = "Demo — 12 Maple St";
  let property = await prisma.property.findFirst({ where: { name } });
  if (!property) {
    property = await prisma.property.create({ data: { name, address: "12 Maple St" } });
  }
  const baseImageUrl = await storage.save(
    `properties/${property.id}/base.svg`,
    basePlaceholderSvg(property.name),
    "image/svg+xml",
  );

  console.log("Generating demo render layers...");
  const options = await prisma.optionCatalog.findMany();
  for (const opt of options) {
    const svg = overlaySvg(opt.category as OptionCategory, opt.swatchHex ?? "#64748b");
    const imageUrl = await storage.save(
      `renders/${property.id}/${opt.category}-${opt.value}.svg`,
      svg,
      "image/svg+xml",
    );
    await prisma.renderAsset.upsert({
      where: { propertyId_optionId: { propertyId: property.id, optionId: opt.id } },
      create: { propertyId: property.id, optionId: opt.id, imageUrl },
      update: { imageUrl },
    });
  }

  await prisma.property.update({
    where: { id: property.id },
    data: { baseImageUrl, status: "ready" },
  });

  console.log(`Seed complete. Demo property id: ${property.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
