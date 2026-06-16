import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { ArrowUpRight, Quote } from "@/components/icons";
import { CATEGORIES, PageHero, Reveal, TESTIMONIALS } from "@/components/marketing/site";

export default function MarketplacePage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => {
    api
      .listContractorCategories()
      .then((rows) => setCounts(Object.fromEntries(rows.map((r) => [r.trade, r.count]))))
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHero
        eyebrow="The marketplace"
        title="Vetted local pros for every part of the exterior"
        sub="Your finished design routes to the right trades near you — each one quoting from the same render."
      />

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.key} delay={i * 60} className="h-full">
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-violet-100 bg-white p-5 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-900/10">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                  {c.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{c.label}</div>
                  <div className="text-sm text-slate-500">
                    {(counts[c.key] ?? c.base).toLocaleString()}+ vetted pros
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-violet-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-violet-100 bg-[#faf9ff]">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Reveal className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Homeowners design it. Pros build it.
            </h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.n} delay={i * 90} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
                  <Quote className="h-8 w-8 text-violet-200" />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                    "{t.q}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-violet-50 pt-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
                      {t.n[0]}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{t.n}</span>
                      <span className="block text-xs text-slate-500">{t.r}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500"
            >
              Get matched with pros near you
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
