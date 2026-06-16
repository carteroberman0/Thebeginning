import { Check, Shield } from "@/components/icons";
import {
  ConnectForm,
  FAQS,
  PageHero,
  PLANS,
  Reveal,
} from "@/components/marketing/site";
import { FloatingBackground } from "@/components/FloatingBackground";

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Start free. Pay when it's real."
        sub="Render and design for nothing. Only pay when you're committing to a build."
      />

      {/* Plans */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="h-full">
              <div
                className={`flex h-full flex-col rounded-3xl p-7 transition ${
                  p.highlight
                    ? "border-2 border-violet-500 bg-white shadow-xl shadow-violet-600/15 lg:-translate-y-3"
                    : "border border-violet-100 bg-white hover:shadow-lg hover:shadow-violet-900/10"
                }`}
              >
                {p.highlight && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <div className="text-sm font-semibold text-slate-500">{p.name}</div>
                <div className="mt-2 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold">{p.price}</span>
                  {p.unit && <span className="pb-1 text-sm text-slate-500">{p.unit}</span>}
                </div>
                <p className="mt-2 text-sm text-slate-500">{p.sub}</p>
                <a
                  href="#start"
                  className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    p.highlight
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500"
                      : "border border-violet-200 text-violet-700 hover:bg-violet-50"
                  }`}
                >
                  {p.cta}
                </a>
                <ul className="mt-7 space-y-3 text-sm">
                  {p.feats.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                      <span className="text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Reveal className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Questions, answered
          </h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <details className="group rounded-2xl border border-violet-100 bg-white p-5 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600 transition group-open:rotate-45">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Connect CTA */}
      <section id="start" className="px-4 pb-24 pt-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0b0716] px-6 py-20 text-center text-white">
          <FloatingBackground />
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Claim your free render
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-slate-300">
                Email and postcode is all we need to get your home rendered and your
                local pros lined up.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ConnectForm />
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Shield className="h-4 w-4 text-violet-300" />
                No spam, no obligation. Free render to start.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
