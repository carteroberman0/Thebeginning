import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type {
  ConfiguratorData,
  OptionCategory,
  Selections,
} from "@configurator/shared";
import { CATEGORY_META, OPTION_CATEGORIES } from "@configurator/shared";
import { api } from "../../api";
import { ConfiguratorViewer } from "../../components/ConfiguratorViewer";
import { OptionPanel } from "../../components/OptionPanel";

const ORDERED = [...OPTION_CATEGORIES].sort(
  (a, b) => CATEGORY_META[a].order - CATEGORY_META[b].order,
);

export function ConfiguratorPage() {
  const { propertyId = "" } = useParams();
  const [data, setData] = useState<ConfiguratorData | null>(null);
  const [selections, setSelections] = useState<Selections>({});
  const [view, setView] = useState<"configure" | "saving" | "saved">("configure");
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getConfiguratorData(propertyId)
      .then((d) => {
        setData(d);
        // Default each axis to its marked default, else the first value.
        const initial: Selections = {};
        for (const cat of OPTION_CATEGORIES) {
          const values = d.options[cat];
          if (values?.length) initial[cat] = (values.find((v) => v.isDefault) ?? values[0]).value;
        }
        setSelections(initial);
      })
      .catch((e) => setError(String(e)));
  }, [propertyId]);

  // The stacked layer URLs for the current selection, in compositing order.
  const layerUrls = useMemo(() => {
    if (!data) return [];
    return ORDERED.map((cat) => {
      const value = selections[cat];
      return data.layers.find((l) => l.category === cat && l.value === value)?.imageUrl;
    }).filter((u): u is string => Boolean(u));
  }, [data, selections]);

  function select(category: OptionCategory, value: string) {
    setSelections((prev) => ({ ...prev, [category]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setView("saving");
    setError(null);
    try {
      await api.saveConfiguration({
        propertyId,
        selections,
        buyerName: buyer.name || undefined,
        buyerEmail: buyer.email || undefined,
        buyerPhone: buyer.phone || undefined,
      });
      setView("saved");
    } catch (err) {
      setError(String(err));
      setView("configure");
    }
  }

  if (error && !data) return <div className="p-10 text-red-600">{error}</div>;
  if (!data) return <div className="p-10 text-slate-500">Loading…</div>;

  const summary = ORDERED.filter((c) => selections[c]).map((c) => {
    const v = data.options[c].find((o) => o.value === selections[c]);
    return { label: CATEGORY_META[c].label, value: v?.label ?? selections[c]! };
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
        ← Home
      </Link>
      <h1 className="mt-2 text-xl font-bold text-slate-900">{data.property.name}</h1>
      {data.property.address && <p className="text-sm text-slate-500">{data.property.address}</p>}

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ConfiguratorViewer baseImageUrl={data.property.baseImageUrl} layerUrls={layerUrls} />
        </div>

        <div>
          {view === "saved" ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
              <h2 className="text-lg font-semibold text-green-800">Design saved 🎉</h2>
              <p className="mt-1 text-sm text-green-700">
                We saved your selection. A local contractor can pick this up as a
                pre-visualized quote.
              </p>
              <dl className="mt-4 grid gap-1 text-sm">
                {summary.map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-green-100 py-1">
                    <dt className="text-green-700">{s.label}</dt>
                    <dd className="font-medium text-green-900">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <>
              <OptionPanel options={data.options} selections={selections} onSelect={select} />

              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-sm font-semibold text-slate-900">Get this built</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Save your design and we'll connect you with a local pro.
                </p>
                <form onSubmit={save} className="mt-3 grid gap-2">
                  <input
                    value={buyer.name}
                    onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                    placeholder="Your name"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    type="email"
                    value={buyer.email}
                    onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
                    placeholder="Email"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={buyer.phone}
                    onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
                    placeholder="Phone (optional)"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  {error && <p className="text-xs text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={view === "saving"}
                    className="mt-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
                  >
                    {view === "saving" ? "Saving…" : "Save my design"}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
