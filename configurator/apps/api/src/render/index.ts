import { env } from "../env.js";
import { MockProvider } from "./mockProvider.js";
import type { RenderProvider } from "./provider.js";

/** Selects the render provider from env. Add real providers here later. */
export function createRenderProvider(): RenderProvider {
  switch (env.renderProvider) {
    case "mock":
      return new MockProvider();
    // case "replicate": return new ReplicateProvider();
    // case "stability": return new StabilityProvider();
    default:
      throw new Error(
        `Unknown RENDER_PROVIDER "${env.renderProvider}". Use "mock" or add an implementation.`,
      );
  }
}

export const renderProvider = createRenderProvider();
