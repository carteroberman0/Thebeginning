import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { PropertySummary } from "@configurator/shared";
import { api } from "../../api";

export function OperatorPage() {
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const load = () => api.listProperties().then(setProperties).catch(console.error);
  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      const property = await api.createProperty(name.trim(), address.trim() || undefined);
      navigate(`/operator/${property.id}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
        ← Home
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Operator tool</h1>
      <p className="mt-1 text-slate-600">Add a property, then generate its render variants.</p>

      <form onSubmit={create} className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Property name (e.g. 12 Maple St)"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address (optional)"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={busy}
          className="justify-self-start rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {busy ? "Creating…" : "Create property"}
        </button>
      </form>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Properties</h2>
      <ul className="mt-3 grid gap-3">
        {properties.map((p) => (
          <li key={p.id}>
            <Link
              to={`/operator/${p.id}`}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-400"
            >
              <span>
                <span className="font-medium text-slate-900">{p.name}</span>
                <span className="ml-2 text-xs uppercase tracking-wide text-slate-400">{p.status}</span>
              </span>
              <span className="text-slate-400">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
