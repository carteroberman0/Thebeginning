import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { PropertySummary } from "@configurator/shared";
import { api } from "../api";

export default function HomePage() {
  const [properties, setProperties] = useState<PropertySummary[]>([]);

  useEffect(() => {
    api.listProperties().then(setProperties).catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Design your exterior</h1>
      <p className="mt-2 text-slate-600">
        Pick a property and try on siding, roof, shutters, trim, garage and landscaping —
        the render updates as you tap.
      </p>

      <div className="mt-6">
        <Link
          to="/operator"
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Operator tool →
        </Link>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Properties</h2>
      {properties.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">
          No properties yet. Create one in the operator tool.
        </p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {properties.map((p) => (
            <li key={p.id}>
              <Link
                to={`/configure/${p.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400"
              >
                <div className="font-medium text-slate-900">{p.name}</div>
                {p.address && <div className="text-sm text-slate-500">{p.address}</div>}
                <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">{p.status}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
