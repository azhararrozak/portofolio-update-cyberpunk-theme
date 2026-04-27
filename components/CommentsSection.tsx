"use client";

import { useState } from "react";

const reviews = [
  {
    stars: 5, initials: "MR", color: "bg-red text-white",
    body: "Azhar shipped our storefront two weeks ahead of schedule. The code was clean, the animations were tight, and the team actually understood Git. Rare.",
    name: "Maya Rohmann", role: "CEO · NeonShop",
  },
  {
    stars: 5, initials: "DK", color: "bg-cyan text-ink",
    body: "We needed a cross-platform app that actually felt native on both iOS and Android. Pulse Fit launched with 4.8 stars on day one. Strong handoff, great docs.",
    name: "Daniel Kusuma", role: "Product Lead · Pulse",
  },
  {
    stars: 5, initials: "SH", color: "bg-ink text-white",
    body: "Turned a rough Figma prototype into a real-time dashboard with 60fps charts and a custom query language. Genuinely one of the best contracts I've worked with.",
    name: "Sara Hartono", role: "Founder · FluxMetrics",
  },
  {
    stars: 5, initials: "TW", color: "bg-red text-white",
    body: "Delivered a polished embeddings visualizer in under four weeks. Communication was async-friendly and timezone-aware, which for a remote team is everything.",
    name: "Tomás Wibowo", role: "CTO · Vector.ai",
  },
  {
    stars: 5, initials: "LN", color: "bg-cyan text-ink",
    body: "Custom Mapbox tiles, offline sync, in-app translation — Drift Map hit the App Store featured list in its launch week. 10/10 would ship with her again.",
    name: "Leah Natsir", role: "Founder · DriftMap",
  },
  {
    stars: 4, initials: "AP", color: "bg-ink text-white",
    body: "Flux CLI saved our deploy pipeline. Took a bit of onboarding, but the docs caught up fast and the open-source community around it is genuinely helpful.",
    name: "Aditya Pratama", role: "DevOps · IndieStack",
  },
];

export default function CommentsSection() {
  const [formData, setFormData] = useState({ name: "", role: "", message: "" });
  const [rating, setRating] = useState(5);

  return (
    <section className="py-24 bg-charcoal text-paper" id="comments">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Head */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-5 border-b border-white/[0.12]">
          <div>
            <div className="font-mono text-xs text-cyan tracking-[0.22em] uppercase inline-flex items-center gap-3 mb-2.5">
              <span className="w-7 h-0.5 bg-cyan" />Section 04
            </div>
            <h2 className="font-[Orbitron] font-extrabold text-[clamp(32px,4vw,52px)] m-0 leading-none">
              Client Reviews
            </h2>
          </div>
          <div className="text-white/60 text-sm max-w-[420px] font-mono leading-relaxed">
            What people say after shipping with me. Average rating across 18 projects: 4.9 / 5.
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white/[0.04] border border-white/[0.08] rounded p-[22px] flex flex-col gap-3">
              <div className="text-cyan text-sm tracking-[2px]">
                {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
              </div>
              <p className="text-white/90 text-sm leading-[1.7] m-0">
                <span className="block font-[Orbitron] text-[42px] text-red leading-[0.5] mb-2.5">&ldquo;</span>
                {r.body}
              </p>
              <div className="flex gap-3 items-center pt-3.5 border-t border-white/10 mt-auto">
                <div className={`w-10 h-10 rounded-full grid place-items-center font-bold text-sm font-[Orbitron] ${r.color}`}>
                  {r.initials}
                </div>
                <div className="flex flex-col gap-px">
                  <span className="text-[13px] font-semibold text-white">{r.name}</span>
                  <span className="font-mono text-[10px] text-white/[0.55] tracking-[0.08em]">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white/[0.04] border border-white/10 rounded p-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          <div>
            <div className="font-mono text-xs text-cyan tracking-[0.22em] uppercase inline-flex items-center gap-3 mb-2.5">
              <span className="w-7 h-0.5 bg-cyan" />Leave a review
            </div>
            <h3 className="font-[Orbitron] font-bold text-2xl mb-2.5">
              Worked together? Drop a comment.
            </h3>
            <p className="text-white/70 text-[13px] leading-relaxed m-0">
              Public reviews appear above. I moderate for spam, not for honesty — write what you
              really think.
            </p>
          </div>
          <form className="flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <input
                className="bg-black/30 border border-white/15 rounded-[3px] text-white px-3.5 py-3 font-mono text-[13px] outline-none transition-colors focus:border-cyan placeholder:text-white/40"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                className="bg-black/30 border border-white/15 rounded-[3px] text-white px-3.5 py-3 font-mono text-[13px] outline-none transition-colors focus:border-cyan placeholder:text-white/40"
                placeholder="Role · Company"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-mono text-[11px] text-white/60 tracking-[0.1em] uppercase">
                Rating
              </span>
              <span className="text-cyan text-xl tracking-[4px] cursor-pointer">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} onClick={() => setRating(i)} className="hover:scale-110 inline-block transition-transform">
                    {i <= rating ? "★" : "☆"}
                  </span>
                ))}
              </span>
              <span className="font-mono text-[11px] text-white/60 tracking-[0.1em] uppercase ml-auto">
                {rating}.0 / 5
              </span>
            </div>
            <textarea
              className="bg-black/30 border border-white/15 rounded-[3px] text-white px-3.5 py-3 font-mono text-[13px] outline-none transition-colors focus:border-cyan placeholder:text-white/40 min-h-[90px] resize-y"
              placeholder="Tell others how it went — project, timeline, anything surprising."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button
              type="button"
              className="self-start px-[22px] py-[13px] bg-red text-white border-0 rounded-[3px] text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-cyan hover:text-ink"
            >
              Post Review →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
