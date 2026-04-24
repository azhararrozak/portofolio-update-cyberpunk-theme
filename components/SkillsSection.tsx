const skills = [
  { name: "React / Next.js", pct: 92, variant: "red" as const },
  { name: "TypeScript", pct: 88, variant: "cyan" as const },
  { name: "React Native", pct: 82, variant: "red" as const },
  { name: "Flutter", pct: 70, variant: "cyan" as const },
  { name: "Node & APIs", pct: 80, variant: "red" as const },
  { name: "Tailwind / CSS", pct: 90, variant: "cyan" as const },
];

const tags = [
  { label: "📍 Jakarta", cls: "bg-red text-white" },
  { label: "Remote OK", cls: "bg-ink text-paper" },
  { label: "☕ Coffee", cls: "bg-paper-2 text-charcoal" },
  { label: "🎧 Synthwave", cls: "bg-cyan text-ink" },
  { label: "Open Source", cls: "bg-paper-2 text-charcoal" },
];

export default function SkillsSection() {
  return (
    <section className="py-24" id="skills">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Section Head */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-5 border-b border-ink/15">
          <div>
            <div className="font-mono text-xs text-red tracking-[0.22em] uppercase inline-flex items-center gap-3 mb-2.5">
              <span className="w-7 h-0.5 bg-red" />
              Section 02
            </div>
            <h2 className="font-[Orbitron] font-extrabold text-[clamp(32px,4vw,52px)] m-0 leading-none">
              Skills &amp; About
            </h2>
          </div>
          <div className="text-muted text-sm max-w-[420px] font-mono leading-relaxed">
            Full-stack development for web and mobile. 5+ years of production experience across
            startups and agencies.
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8">
          {/* About Panel */}
          <div className="bg-white rounded p-9 relative overflow-hidden shadow-[0_1px_0_rgba(14,15,16,0.08)]">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-muted tracking-[0.18em] uppercase mb-[18px]">
              <span className="w-2 h-2 bg-red" />
              About Me
            </div>
            <h3 className="font-[Orbitron] font-bold text-[32px] leading-[1.15] mb-[18px]">
              Dev by day,
              <br />
              <span className="text-red">tinkerer</span> by night.
            </h3>
            <div>
              <p className="text-charcoal-2 text-[15px] leading-[1.75] mb-3.5">
                I&apos;m a full-stack developer who builds for both the browser and the pocket. My
                work lives at the intersection of solid engineering and interfaces that feel a little
                alive — from e-commerce storefronts to cross-platform apps used by 200k+ people a
                month.
              </p>
              <p className="text-charcoal-2 text-[15px] leading-[1.75] mb-0">
                Outside client work I obsess over typography, build synth patches, and ship
                open-source packages that make other devs&apos; lives slightly less painful.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-[22px]">
              {tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`inline-flex items-center gap-2 px-[13px] py-[7px] rounded-full font-mono text-[11px] tracking-[0.08em] ${tag.cls}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Panel */}
          <div className="bg-white rounded p-9 relative overflow-hidden shadow-[0_1px_0_rgba(14,15,16,0.08)]">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-muted tracking-[0.18em] uppercase mb-[18px]">
              <span className="w-2 h-2 bg-cyan" />
              Tech Stack · 12 items
            </div>
            <div className="flex flex-col gap-[18px]">
              {skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold">{skill.name}</span>
                    <span
                      className={`font-mono font-semibold ${
                        skill.variant === "cyan" ? "text-[#0a9e9e]" : "text-red"
                      }`}
                    >
                      {skill.pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-ink/[0.08] rounded overflow-hidden">
                    <div
                      className={`h-full rounded ${
                        skill.variant === "cyan"
                          ? "bg-gradient-to-r from-cyan to-[#7ff2f2]"
                          : "bg-gradient-to-r from-red to-crimson"
                      }`}
                      style={{ width: `${skill.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
