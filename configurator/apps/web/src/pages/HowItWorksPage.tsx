import { Link } from "react-router-dom";
import { ArrowRight } from "@/components/icons";
import { FEATURES, PageHero, Reveal, STEPS } from "@/components/marketing/site";

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From a photo to a built reality"
        sub="Four steps. No measurements, no guesswork, no awkward “imagine it finished”."
      />

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute inset-x-12 top-7 hidden h-px bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200 lg:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.k} delay={i * 90} className="h-full">
              <div className="relative h-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900/10">
                <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-600/30">
                  {s.icon}
                </div>
                <div className="mt-5 text-xs font-semibold tracking-widest text-violet-400">{s.k}</div>
                <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-violet-100 bg-[#faf9ff]">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Reveal>
            <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to sell the renovation
            </h2>
            <p className="mt-4 max-w-xl text-lg text-slate-500">
              Real-time visualization that turns browsing into a structured, quotable job.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 70} className="h-full">
                <div className="h-full rounded-2xl border border-violet-100 bg-white p-6 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-900/10">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                    {f.icon}
                  </div>
                  <h3 className="mt-4 font-semibold">{f.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link
              to="/pricing"
              className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500"
            >
              Get my free render
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
