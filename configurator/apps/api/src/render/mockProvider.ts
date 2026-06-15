import { storage } from "../storage/storage.js";
import { overlaySvg } from "./houseSvg.js";
import type { RenderProvider, RenderRequest, RenderResult } from "./provider.js";

/**
 * Generates a placeholder render layer with zero cost or API keys. It produces
 * a transparent SVG overlay that recolors just the targeted house element, then
 * stores it. The configurator stacks these exactly as it would real renders, so
 * the whole pipeline is exercised end-to-end before any AI model is wired in.
 */
export class MockProvider implements RenderProvider {
  readonly name = "mock";

  async render(req: RenderRequest): Promise<RenderResult> {
    // Simulate the seconds-long latency real models have, so polling is real.
    await new Promise((r) => setTimeout(r, 250 + Math.random() * 400));

    const hex = req.swatchHex ?? "#64748b";
    const svg = overlaySvg(req.category, hex);
    const file = `renders/${req.propertyId}/${req.category}-${req.value}.svg`;
    const imageUrl = await storage.save(file, svg, "image/svg+xml");
    return { imageUrl };
  }
}
