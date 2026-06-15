import type { OptionCategory } from "@configurator/shared";

/** One render request: produce the layer for this option on this property. */
export interface RenderRequest {
  propertyId: string;
  baseImageUrl: string | null;
  category: OptionCategory;
  value: string;
  label: string;
  swatchHex: string | null;
}

export interface RenderResult {
  imageUrl: string;
}

/**
 * The seam that keeps render generation swappable. The mock provider ships now;
 * a Replicate/Stability provider implementing the same interface drops in later
 * (geometry-preserving img2img / ControlNet) without changing the job pipeline.
 */
export interface RenderProvider {
  readonly name: string;
  render(req: RenderRequest): Promise<RenderResult>;
}
