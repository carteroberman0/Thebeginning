import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { api } from "../../api";
import {
  ArrowRight,
  Bolt,
  Brush,
  Check,
  Clock,
  DocCheck,
  Hammer,
  Handshake,
  HouseMark,
  Layers,
  MapPin,
  Roof,
  Sliders,
  Sun,
  Tree,
  Upload,
  Wand,
  Window,
} from "../icons";

/* ── scroll-reveal primitives ─────────────────────────────────── */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Counter({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── data ─────────────────────────────────────────────────────── */
export const STEPS = [
  { icon: <Upload className="h-6 w-6" />, k: "01", t: "Upload a drone photo", d: "Send one aerial or street shot. No measurements, no CAD, no site visit." },
  { icon: <Wand className="h-6 w-6" />, k: "02", t: "We render it photoreal", d: "Our pipeline turns the photo into a clean, editable render in minutes." },
  { icon: <Sliders className="h-6 w-6" />, k: "03", t: "Redesign in the editor", d: "Swap siding, roof, shutters, trim, garage and landscaping like configuring a car." },
  { icon: <Handshake className="h-6 w-6" />, k: "04", t: "Get it built for real", d: "We match your design with vetted local pros who quote from the exact render." },
];

export const FEATURES = [
  { icon: <Bolt className="h-5 w-5" />, t: "Real-time renders", d: "Pre-generated layers composite the instant you tap — no waiting on AI." },
  { icon: <Layers className="h-5 w-5" />, t: "7 exterior systems", d: "Siding, color, roof, shutters, trim, garage and landscaping — all swappable." },
  { icon: <DocCheck className="h-5 w-5" />, t: "Build-ready quotes", d: "Every saved design becomes a structured scope a contractor can price." },
  { icon: <MapPin className="h-5 w-5" />, t: "Local pro routing", d: "Finished designs turn into qualified, pre-visualized leads for nearby pros." },
];

export const CATEGORIES = [
  { key: "shutters", icon: <Window className="h-6 w-6" />, label: "Shutters & windows", base: 86 },
  { key: "builder", icon: <Hammer className="h-6 w-6" />, label: "Builders & remodelers", base: 124 },
  { key: "roofer", icon: <Roof className="h-6 w-6" />, label: "Roofers", base: 73 },
  { key: "landscaper", icon: <Tree className="h-6 w-6" />, label: "Landscapers", base: 92 },
  { key: "painter", icon: <Brush className="h-6 w-6" />, label: "Painters", base: 64 },
  { key: "solar", icon: <Sun className="h-6 w-6" />, label: "Solar & energy", base: 41 },
];

export const TESTIMONIALS = [
  { q: "I uploaded a photo on Sunday and had three quotes from local shutter companies by Wednesday — all from the same render.", n: "Maya R.", r: "Homeowner, Austin TX" },
  { q: "Clients used to struggle to picture the finished exterior. Now they design it themselves and approve in one meeting.", n: "Devin P.", r: "Remodeler, BuildRight Co." },
  { q: "The lead quality is unreal. Every job comes with a render, a scope, and a budget. We just confirm and schedule.", n: "Sofia L.", r: "Owner, CedarLine Exteriors" },
];

export const PLANS = [
  { name: "Starter", price: "Free", sub: "1 render to try the whole flow", cta: "Get my free render", highlight: false, feats: ["1 photoreal render", "Full live editor", "Save & share 1 design", "Local pro matching"] },
  { name: "Homeowner", price: "$29", unit: "/ project", sub: "For a renovation you're committing to", cta: "Start my project", highlight: true, feats: ["Unlimited renders & revisions", "All 7 exterior systems", "Up to 5 matched local pros", "Side-by-side quote comparison", "Priority render queue"] },
  { name: "Pro / Teams", price: "Custom", sub: "For builders, agents & dealers", cta: "Talk to sales", highlight: false, feats: ["White-label editor", "Lead routing & CRM sync", "Team seats & roles", "API access"] },
];

export const FAQS = [
  { q: "What kind of photo do I need?", a: "A single clear drone, aerial, or straight-on street photo of the home. No measurements, drawings, or special equipment." },
  { q: "How accurate is the render?", a: "It preserves the home's real structure — only the surfaces you change are swapped, so quotes map to reality." },
  { q: "How do the local pros work?", a: "Vetted shutter companies, builders, roofers, landscapers and more receive your finished design as a pre-visualized lead and quote from it." },
  { q: "How fast is matching?", a: "Most homeowners are matched with available local pros within 48 hours of saving a design." },
  { q: "Is there any obligation?", a: "None. Render and design for free, compare quotes, and only move forward if a pro and price feel right." },
];

/* ── marquee ─────────────────────────────────────────────────── */
export function Marquee() {
  const items = ["ShutterWorks", "BuildRight Co.", "GreenScape", "RoofLine", "BrightSolar", "TrueTrim", "CedarLine", "PaverPros", "ClearView Windows", "Summit Builders"];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap pr-12">
        {row.map((name, i) => (
          <span key={i} className="font-display text-lg font-semibold tracking-tight text-violet-900/40">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── connect form (POSTs to /api/inquiries) ──────────────────── */
export function ConnectForm() {
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      await api.createInquiry({ email, postcode: postcode || undefined, intent: "render" });
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-violet-400/30 bg-violet-500/10 px-5 py-4 text-sm text-white">
        <Check className="h-5 w-5 text-violet-300" />
        You're in — we'll be in touch within 48 hours.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="h-12 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
      />
      <input
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder="Postcode"
        aria-label="Postcode"
        className="h-12 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40 sm:w-28"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="h-12 shrink-0 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-600/40 transition hover:bg-violet-500 disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Get my render"}
      </button>
    </form>
  );
}

/* ── tab nav + footer + layout ───────────────────────────────── */
const TABS = [
  { label: "Home", to: "/" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Pricing", to: "/pricing" },
];

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#140a24]/75 py-2 pl-5 pr-2 text-white shadow-lg shadow-violet-950/40 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 shadow-md shadow-violet-600/40">
            <HouseMark className="h-4 w-4 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Rerender</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/operator"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:block"
          >
            Sign in
          </Link>
          <Link
            to="/pricing"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#15101f] transition hover:bg-violet-100"
          >
            Get a render
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const cols = [
    { title: "Product", links: [["How it works", "/how-it-works"], ["Pricing", "/pricing"], ["Live editor", "/operator"]] },
    { title: "Marketplace", links: [["Find local pros", "/marketplace"], ["Join as a pro", "/pricing"]] },
    { title: "Company", links: [["Operator tool", "/operator"], ["Contact", "/pricing"]] },
  ];
  return (
    <footer className="bg-[#0b0716] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600">
              <HouseMark className="h-4 w-4 text-white" />
            </span>
            <span className="font-display text-lg font-bold">Rerender</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            Redesign any home's exterior from a single photo — then get it built by vetted local pros.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
            <Clock className="h-3.5 w-3.5 text-violet-300" />
            48-hour average match time
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {c.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row">
          <span>© 2026 Rerender. Design it. Then build it.</span>
          <span className="inline-flex items-center gap-1.5">
            <ArrowRight className="h-3.5 w-3.5 text-violet-400" />
            Built for homeowners and the pros who serve them.
          </span>
        </div>
      </div>
    </footer>
  );
}

/** Page heading used at the top of inner tab pages. */
export function PageHero({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0b0716] px-4 pb-16 pt-36 text-center text-white sm:pt-44">
      <div
        aria-hidden
        className="anim-drift-1 pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.45), transparent)" }}
      />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">{eyebrow}</p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{title}</h1>
          {sub && <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">{sub}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function MarketingLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return (
    <div className="min-h-screen bg-white text-[#15101f]">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
