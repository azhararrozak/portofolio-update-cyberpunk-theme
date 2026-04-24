"use client";

import { useState } from "react";

interface Project {
  id: string;
  category: string;
  year: string;
  title: string;
  desc: string;
  stack: string[];
  cta: string;
  gradient: string;
  thumb: React.ReactNode;
  statusStyle?: string;
  status: string;
}

const projects: Project[] = [
  {
    id: "PRJ.01", category: "WEB · E-COMMERCE", year: "2026", title: "Neon Shop",
    desc: "Headless storefront for a streetwear label. Real-time inventory, custom cart, 98 Lighthouse score.",
    stack: ["Next.js", "Stripe"], cta: "CASE STUDY →", status: "LIVE",
    gradient: "from-red to-crimson",
    thumb: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <rect x="50" y="60" width="140" height="130" fill="none" stroke="#fff" strokeWidth="2" opacity="0.8" />
        <rect x="62" y="72" width="60" height="8" fill="#fff" opacity="0.9" />
        <rect x="62" y="88" width="110" height="4" fill="#fff" opacity="0.5" />
        <rect x="62" y="98" width="90" height="4" fill="#fff" opacity="0.5" />
        <rect x="62" y="130" width="50" height="14" fill="var(--color-cyan)" />
        <circle cx="310" cy="120" r="60" fill="none" stroke="var(--color-cyan)" strokeWidth="2" />
        <circle cx="310" cy="120" r="30" fill="var(--color-cyan)" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "PRJ.02", category: "MOBILE · HEALTH", year: "2025", title: "Pulse Fit",
    desc: "Cross-platform workout tracker with HealthKit sync, offline-first, haptic-driven timers.",
    stack: ["React Native", "Expo"], cta: "CASE STUDY →", status: "LIVE",
    gradient: "from-charcoal to-ink",
    thumb: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <rect x="150" y="30" width="100" height="190" rx="12" fill="var(--color-ink)" stroke="var(--color-red)" strokeWidth="2" />
        <rect x="160" y="50" width="80" height="12" fill="var(--color-red)" />
        <rect x="160" y="70" width="80" height="55" fill="var(--color-red)" opacity="0.3" />
        <rect x="160" y="135" width="36" height="36" fill="var(--color-cyan)" />
        <rect x="204" y="135" width="36" height="36" fill="var(--color-cyan)" opacity="0.5" />
        <circle cx="200" cy="200" r="8" fill="var(--color-red)" />
      </svg>
    ),
  },
  {
    id: "PRJ.03", category: "WEB · SAAS", year: "2025", title: "Flux Metrics",
    desc: "Real-time analytics for indie devs. WebSocket ingest, live charts, custom query language.",
    stack: ["Next.js", "WebGL"], cta: "CASE STUDY →", status: "LIVE",
    gradient: "from-forest to-charcoal",
    thumb: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <g stroke="var(--color-cyan)" strokeWidth="2" fill="none">
          <path d="M20 200 L60 140 L100 160 L140 100 L180 130 L220 80 L260 110 L300 70 L340 90 L380 50" />
        </g>
        <path d="M20 200 L60 140 L100 160 L140 100 L180 130 L220 80 L260 110 L300 70 L340 90 L380 50 L380 230 L20 230 Z" fill="var(--color-cyan)" opacity="0.2" />
        <g fill="var(--color-red)"><circle cx="140" cy="100" r="4" /><circle cx="220" cy="80" r="4" /><circle cx="300" cy="70" r="4" /></g>
        <rect x="20" y="20" width="100" height="30" fill="var(--color-cyan)" opacity="0.2" stroke="var(--color-cyan)" />
        <text x="32" y="40" fontFamily="monospace" fontSize="11" fill="var(--color-cyan)">$42.6K +12%</text>
      </svg>
    ),
  },
  {
    id: "PRJ.04", category: "WEB · AI TOOL", year: "2025", title: "Vector AI",
    desc: "Interactive embeddings explorer — visualize semantic relationships in 3D with WebGL.",
    stack: ["Three.js", "Python"], cta: "CASE STUDY →", status: "LIVE",
    gradient: "from-crimson to-ink",
    thumb: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <g stroke="#fff" strokeWidth="2" fill="none" opacity="0.85">
          <polygon points="200,40 340,120 280,210 120,210 60,120" />
          <polygon points="200,70 300,125 270,190 130,190 100,125" opacity="0.5" />
        </g>
        <circle cx="200" cy="130" r="8" fill="var(--color-cyan)" />
        <line x1="200" y1="130" x2="340" y2="120" stroke="var(--color-cyan)" strokeWidth="2" />
        <line x1="200" y1="130" x2="60" y2="120" stroke="var(--color-cyan)" strokeWidth="2" />
        <circle cx="340" cy="120" r="4" fill="var(--color-cyan)" />
        <circle cx="60" cy="120" r="4" fill="var(--color-cyan)" />
      </svg>
    ),
  },
  {
    id: "PRJ.05", category: "MOBILE · TRAVEL", year: "2024", title: "Drift Map",
    desc: "Offline-first travel companion with custom map tiles, crowd-sourced POIs, live translation.",
    stack: ["Flutter", "Mapbox"], cta: "CASE STUDY →", status: "LIVE",
    statusStyle: "bg-red text-white",
    gradient: "from-cyan to-[#2c8f8f]",
    thumb: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <g stroke="var(--color-ink)" strokeWidth="1" opacity="0.25">
          <line x1="0" y1="50" x2="400" y2="50" /><line x1="0" y1="100" x2="400" y2="100" />
          <line x1="0" y1="150" x2="400" y2="150" /><line x1="0" y1="200" x2="400" y2="200" />
          <line x1="80" y1="0" x2="80" y2="250" /><line x1="160" y1="0" x2="160" y2="250" />
          <line x1="240" y1="0" x2="240" y2="250" /><line x1="320" y1="0" x2="320" y2="250" />
        </g>
        <path d="M40 200 Q 120 150 180 170 T 360 60" stroke="var(--color-ink)" strokeWidth="3" fill="none" strokeDasharray="6 4" />
        <circle cx="40" cy="200" r="10" fill="var(--color-red)" stroke="#fff" strokeWidth="2" />
        <circle cx="360" cy="60" r="10" fill="var(--color-ink)" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "PRJ.06", category: "OSS · DEV TOOL", year: "2026", title: "Flux CLI",
    desc: "Open-source deployment CLI. 2.4k GitHub stars, ships to 12 edge regions in 30s.",
    stack: ["Rust", "Deno"], cta: "GITHUB ↗", status: "BETA",
    gradient: "from-ink to-charcoal",
    thumb: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <rect x="40" y="40" width="320" height="170" fill="#0a0808" stroke="var(--color-red)" strokeWidth="2" />
        <rect x="40" y="40" width="320" height="20" fill="var(--color-red)" />
        <circle cx="56" cy="50" r="3" fill="#fff" /><circle cx="68" cy="50" r="3" fill="#fff" /><circle cx="80" cy="50" r="3" fill="#fff" />
        <g fontFamily="monospace" fontSize="10" fill="var(--color-cyan)">
          <text x="52" y="82">$ flux --init</text>
          <text x="52" y="98" fill="#fff">✓ scaffolding...</text>
          <text x="52" y="114" fill="#fff">✓ 142 packages</text>
          <text x="52" y="132">$ flux deploy --prod</text>
          <text x="52" y="148" fill="var(--color-red)">▸ 42kb · 12 regions</text>
          <text x="52" y="170" fill="var(--color-red)">$ _</text>
        </g>
      </svg>
    ),
  },
];

const filters = ["All · 06", "Web", "Mobile", "OSS"];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All · 06");

  return (
    <section className="py-24 bg-paper-2" id="projects">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Head */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-5 border-b border-ink/15">
          <div>
            <div className="font-mono text-xs text-red tracking-[0.22em] uppercase inline-flex items-center gap-3 mb-2.5">
              <span className="w-7 h-0.5 bg-red" />Section 03
            </div>
            <h2 className="font-[Orbitron] font-extrabold text-[clamp(32px,4vw,52px)] m-0 leading-none">
              Selected Work
            </h2>
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-[9px] rounded-full font-mono text-[11px] tracking-[0.12em] uppercase border transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-red text-white border-red"
                    : "bg-transparent text-charcoal border-ink/20 hover:border-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded overflow-hidden flex flex-col border border-ink/[0.08] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(248,10,38,0.15)] hover:border-red"
            >
              <div className={`aspect-[16/10] relative overflow-hidden border-b border-ink/[0.06] bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between z-2">
                  <span className="font-mono text-[10px] bg-ink/70 text-white px-2.5 py-1 rounded-[2px] tracking-[0.14em]">
                    {p.id}
                  </span>
                  <span className={`font-mono text-[10px] px-2.5 py-1 rounded-[2px] tracking-[0.14em] font-semibold inline-flex items-center gap-1.5 ${p.statusStyle || "bg-cyan text-ink"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.statusStyle ? "bg-white" : "bg-ink"}`} />
                    {p.status}
                  </span>
                </div>
                {p.thumb}
              </div>
              <div className="p-[22px] flex flex-col gap-2.5 flex-1">
                <div className="flex justify-between font-mono text-[10px] text-muted tracking-[0.14em] uppercase">
                  <span>{p.category}</span><span>{p.year}</span>
                </div>
                <h3 className="font-[Orbitron] font-bold text-[22px] m-0">{p.title}</h3>
                <p className="text-[#4a4f54] text-[13px] leading-relaxed m-0">{p.desc}</p>
                <div className="mt-auto pt-3.5 flex justify-between items-center border-t border-ink/[0.06]">
                  <div className="flex gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="px-[9px] py-[3px] rounded-[3px] bg-paper-2 font-mono text-[10px] text-charcoal tracking-[0.06em]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <a className="font-mono text-[11px] text-red font-semibold tracking-[0.1em] inline-flex gap-1.5 items-center cursor-pointer hover:underline">
                    {p.cta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
