import type {
  OptionCategory,
  OptionValue,
  PropertySummary,
} from "@configurator/shared";
import { OPTION_CATEGORIES } from "@configurator/shared";
import type { OptionCatalog, Property } from "@prisma/client";

export function toPropertySummary(p: Property): PropertySummary {
  return {
    id: p.id,
    name: p.name,
    address: p.address,
    baseImageUrl: p.baseImageUrl,
    status: p.status as PropertySummary["status"],
    createdAt: p.createdAt.toISOString(),
  };
}

export function toOptionValue(o: OptionCatalog): OptionValue {
  return {
    id: o.id,
    category: o.category as OptionCategory,
    value: o.value,
    label: o.label,
    swatchHex: o.swatchHex,
    sortOrder: o.sortOrder,
    isDefault: o.isDefault,
  };
}

/** Group a flat option list into the per-category shape the UI expects. */
export function groupOptions(options: OptionCatalog[]): Record<OptionCategory, OptionValue[]> {
  const grouped = Object.fromEntries(
    OPTION_CATEGORIES.map((c) => [c, [] as OptionValue[]]),
  ) as Record<OptionCategory, OptionValue[]>;

  for (const o of options) {
    const cat = o.category as OptionCategory;
    if (grouped[cat]) grouped[cat].push(toOptionValue(o));
  }
  return grouped;
}
