/**
 * Shared domain types + constants used by BOTH the API and the web app.
 * Keeping these in one place means the buyer configurator, the operator tool,
 * and the database seed can never drift out of sync on what an "option" is.
 */

/** The independent axes a buyer can change on a property. */
export const OPTION_CATEGORIES = [
  "siding",
  "siding_color",
  "roof",
  "shutters",
  "trim",
  "garage",
  "landscaping",
] as const;

export type OptionCategory = (typeof OPTION_CATEGORIES)[number];

/** Human-friendly metadata for each category, used to render the options panel. */
export const CATEGORY_META: Record<
  OptionCategory,
  { label: string; help: string; order: number }
> = {
  siding: { label: "Siding material", help: "What the walls are made of", order: 1 },
  siding_color: { label: "Siding color", help: "Color of the walls", order: 2 },
  roof: { label: "Roof", help: "Roof style & color", order: 3 },
  shutters: { label: "Shutters", help: "Window shutter color", order: 4 },
  trim: { label: "Trim", help: "Color of the trim", order: 5 },
  garage: { label: "Garage door", help: "Garage door style", order: 6 },
  landscaping: { label: "Landscaping", help: "Front-yard package", order: 7 },
};

export type RenderJobStatus = "queued" | "processing" | "done" | "failed";

export type PropertyStatus = "draft" | "rendering" | "ready";

/** A single selectable option value (e.g. "Cedar Board" siding). */
export interface OptionValue {
  id: string;
  category: OptionCategory;
  value: string; // machine value, e.g. "cedar-board"
  label: string; // display, e.g. "Cedar Board"
  swatchHex: string | null; // color chip for the panel
  sortOrder: number;
  isDefault: boolean;
}

/** A pre-generated render layer for one (property, option) pair. */
export interface RenderLayer {
  optionId: string;
  category: OptionCategory;
  value: string;
  imageUrl: string;
}

export interface PropertySummary {
  id: string;
  name: string;
  address: string | null;
  baseImageUrl: string | null;
  status: PropertyStatus;
  createdAt: string;
}

/** Per-property render progress, used by the operator UI while polling. */
export interface RenderProgress {
  total: number;
  done: number;
  failed: number;
  jobs: Array<{
    optionId: string;
    category: OptionCategory;
    value: string;
    status: RenderJobStatus;
    error: string | null;
  }>;
}

/** Everything the buyer configurator needs to render one property. */
export interface ConfiguratorData {
  property: PropertySummary;
  /** Available pre-generated layers, grouped by category. */
  options: Record<OptionCategory, OptionValue[]>;
  layers: RenderLayer[];
}

/** The buyer's choice per category — the core of the scoped job. */
export type Selections = Partial<Record<OptionCategory, string>>;

/** The structured "scoped job" that becomes a contractor lead in phase 2. */
export interface ConfigurationRecord {
  id: string;
  propertyId: string;
  selections: Selections;
  buyerName: string | null;
  buyerEmail: string | null;
  buyerPhone: string | null;
  createdAt: string;
}
