import type {
  ConfigurationRecord,
  ConfiguratorData,
  OptionCategory,
  OptionValue,
  PropertySummary,
  RenderProgress,
  Selections,
} from "@configurator/shared";

async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export interface PropertyDetail {
  property: PropertySummary;
  options: OptionValue[];
  assets: Array<{ optionId: string; imageUrl: string }>;
}

export const api = {
  getOptions: () => http<Record<OptionCategory, OptionValue[]>>("/api/options"),

  listProperties: () => http<PropertySummary[]>("/api/properties"),

  createProperty: (name: string, address?: string) =>
    http<PropertySummary>("/api/properties", {
      method: "POST",
      body: JSON.stringify({ name, address }),
    }),

  getProperty: (id: string) => http<PropertyDetail>(`/api/properties/${id}`),

  generate: (id: string, optionIds?: string[]) =>
    http<{ queued: number }>(`/api/properties/${id}/generate`, {
      method: "POST",
      body: JSON.stringify({ optionIds }),
    }),

  getProgress: (id: string) => http<RenderProgress>(`/api/properties/${id}/progress`),

  getConfiguratorData: (propertyId: string) =>
    http<ConfiguratorData>(`/api/configure/${propertyId}`),

  saveConfiguration: (payload: {
    propertyId: string;
    selections: Selections;
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
  }) =>
    http<ConfigurationRecord>("/api/configurations", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
