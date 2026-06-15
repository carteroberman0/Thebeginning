import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { RenderProgress } from "@configurator/shared";
import { api, type PropertyDetail } from "../../api";

export function PropertyEditor() {
  const { id = "" } = useParams();
  const [detail, setDetail] = useState<PropertyDetail | null>(null);
  const [progress, setProgress] = useState<RenderProgress | null>(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const poll = useCallback(async () => {
    const p = await api.getProgress(id);
    setProgress(p);
    const finished = p.total > 0 && p.done + p.failed >= p.total;
    if (finished) {
      stopPolling();
      api.getProperty(id).then(setDetail).catch(console.error);
    }
  }, [id]);

  useEffect(() => {
    api.getProperty(id).then(setDetail).catch(console.error);
    poll().catch(() => {});
    return stopPolling;
  }, [id, poll]);

  async function generate() {
    setBusy(true);
    try {
      await api.generate(id); // all options
      stopPolling();
      timer.current = setInterval(() => poll().catch(() => {}), 1000);
    } finally {
      setBusy(false);
    }
  }

  if (!detail) return <div className="p-10 text-slate-500">Loading…</div>;

  const { property } = detail;
  const rendering = progress && progress.total > 0 && progress.done + progress.failed < progress.total;
  const pct = progress && progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/operator" className="text-sm text-slate-500 hover:text-slate-700">
        ← Operator
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">{property.name}</h1>
      {property.address && <p className="text-slate-500">{property.address}</p>}

      {property.baseImageUrl && (
        <img
          src={property.baseImageUrl}
          alt="Base"
          className="mt-4 aspect-[3/2] w-full rounded-2xl object-cover ring-1 ring-slate-200"
        />
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={generate}
          disabled={busy || !!rendering}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {rendering ? "Generating…" : busy ? "Starting…" : "Generate all renders"}
        </button>
        <Link
          to={`/configure/${property.id}`}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-500"
        >
          Open configurator →
        </Link>
      </div>

      {progress && progress.total > 0 && (
        <div className="mt-6">
          <div className="mb-1 flex justify-between text-sm text-slate-600">
            <span>
              {progress.done}/{progress.total} layers{progress.failed ? ` · ${progress.failed} failed` : ""}
            </span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-slate-900 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {progress.jobs.map((j) => (
              <div
                key={j.optionId}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
              >
                <div className="font-medium text-slate-700">
                  {j.category}: {j.value}
                </div>
                <div
                  className={
                    j.status === "done"
                      ? "text-green-600"
                      : j.status === "failed"
                        ? "text-red-600"
                        : "text-slate-500"
                  }
                >
                  {j.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
