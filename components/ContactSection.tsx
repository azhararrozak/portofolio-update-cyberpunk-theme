"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", type: "Website / Landing", budget: "$2k — $5k", message: "" });

  return (
    <section className="py-24 bg-forest text-paper" id="contact">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Head */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-5 border-b border-white/[0.12]">
          <div>
            <div className="font-mono text-xs text-cyan tracking-[0.22em] uppercase inline-flex items-center gap-3 mb-2.5">
              <span className="w-7 h-0.5 bg-cyan" />Section 05
            </div>
            <h2 className="font-[Orbitron] font-extrabold text-[clamp(32px,4vw,52px)] m-0 leading-none">
              Get in Touch
            </h2>
          </div>
          <div className="text-white/60 text-sm max-w-[420px] font-mono leading-relaxed">
            Open for freelance, contracts, and occasional strange-idea emails. Usually reply within a day.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-stretch">
          {/* Left — Intro */}
          <div className="bg-ink text-paper p-12 rounded relative overflow-hidden flex flex-col gap-6">
            <div className="absolute -top-[60px] -right-[60px] w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,var(--color-red),transparent_70%)] opacity-60 pointer-events-none" />
            <div className="font-mono text-xs text-cyan tracking-[0.22em] uppercase inline-flex items-center gap-3 relative">
              <span className="w-7 h-0.5 bg-cyan" />Say hello
            </div>
            <h3 className="font-[Orbitron] font-extrabold text-[44px] leading-none mt-1.5 mb-2.5 relative">
              Let&apos;s build<br /><span className="text-red">something</span><br /><span className="text-cyan">great</span>.
            </h3>
            <p className="text-white/75 text-[15px] leading-[1.7] m-0 relative">
              Drop a line about a project, a collab, or just say hi. If it involves pixels,
              animation, or a real-time feed — I&apos;m probably in.
            </p>

            {/* Contact rows */}
            <div className="flex flex-col gap-3.5 mt-2.5 relative">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="14" rx="1" />
                      <path d="M3 7 L12 13 L21 7" />
                    </svg>
                  ),
                  iconCls: "bg-red text-white", label: "Email", value: "hello@portoflux.dev",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  iconCls: "bg-cyan text-ink", label: "WhatsApp", value: "+62 811 4242 042",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2 A10 10 0 0 0 8.84 21.5 C9.34 21.58 9.5 21.27 9.5 21 C9.5 20.77 9.49 20.14 9.49 19.31 C6.73 19.91 6.14 17.97 6.14 17.97 C5.68 16.81 5.03 16.5 5.03 16.5 C4.12 15.88 5.1 15.9 5.1 15.9 C6.1 15.97 6.63 16.93 6.63 16.93 C7.5 18.45 8.97 18.01 9.54 17.76 C9.63 17.11 9.89 16.67 10.17 16.42 C7.97 16.17 5.62 15.31 5.62 11.5 C5.62 10.39 6 9.5 6.65 8.79 C6.54 8.54 6.2 7.5 6.75 6.15 C6.75 6.15 7.59 5.88 9.5 7.17 C10.29 6.95 11.15 6.84 12 6.84 C12.85 6.84 13.71 6.95 14.5 7.17 C16.41 5.88 17.25 6.15 17.25 6.15 C17.8 7.5 17.46 8.54 17.35 8.79 C18 9.5 18.38 10.39 18.38 11.5 C18.38 15.32 16.03 16.17 13.82 16.41 C14.17 16.72 14.5 17.33 14.5 18.26 C14.5 19.6 14.49 20.68 14.49 21 C14.49 21.27 14.66 21.59 15.17 21.5 A10 10 0 0 0 12 2 z" />
                    </svg>
                  ),
                  iconCls: "bg-red text-white", label: "GitHub", value: "github.com/portoflux",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45z" />
                    </svg>
                  ),
                  iconCls: "bg-cyan text-ink", label: "LinkedIn", value: "/in/ayla-nakamura",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  className="flex gap-3.5 items-center p-3.5 bg-white/[0.06] border border-white/10 rounded-[3px] transition-all duration-200 hover:bg-white/[0.12] hover:border-cyan cursor-pointer"
                >
                  <div className={`w-10 h-10 grid place-items-center rounded-[3px] ${item.iconCls}`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-mono text-[10px] text-white/50 tracking-[0.14em] uppercase">
                      {item.label}
                    </span>
                    <span className="font-mono text-sm text-white">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form
            className="bg-white rounded p-12 flex flex-col gap-[18px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex justify-between items-baseline pb-4 border-b border-ink/10 mb-2.5">
              <h3 className="font-[Orbitron] font-bold text-[22px] m-0">Send a message</h3>
              <span className="font-mono text-[11px] text-red tracking-[0.18em]">avg reply · 12h</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-[7px]">
                <label className="font-mono text-[11px] text-muted tracking-[0.14em] uppercase">
                  <span className="text-red font-semibold mr-2">01</span>Name
                </label>
                <input
                  className="bg-paper border border-ink/[0.12] rounded-[3px] text-ink px-3.5 py-3 font-mono text-[13px] outline-none transition-all focus:border-red focus:shadow-[0_0_0_3px_rgba(248,10,38,0.1)]"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-[7px]">
                <label className="font-mono text-[11px] text-muted tracking-[0.14em] uppercase">
                  <span className="text-red font-semibold mr-2">02</span>Email
                </label>
                <input
                  type="email"
                  className="bg-paper border border-ink/[0.12] rounded-[3px] text-ink px-3.5 py-3 font-mono text-[13px] outline-none transition-all focus:border-red focus:shadow-[0_0_0_3px_rgba(248,10,38,0.1)]"
                  placeholder="you@domain.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-[7px]">
                <label className="font-mono text-[11px] text-muted tracking-[0.14em] uppercase">
                  <span className="text-red font-semibold mr-2">03</span>Project Type
                </label>
                <select
                  className="bg-paper border border-ink/[0.12] rounded-[3px] text-ink px-3.5 py-3 font-mono text-[13px] outline-none transition-all focus:border-red focus:shadow-[0_0_0_3px_rgba(248,10,38,0.1)]"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option>Website / Landing</option>
                  <option>Web App / SaaS</option>
                  <option>Mobile App</option>
                  <option>Something Weird</option>
                </select>
              </div>
              <div className="flex flex-col gap-[7px]">
                <label className="font-mono text-[11px] text-muted tracking-[0.14em] uppercase">
                  <span className="text-red font-semibold mr-2">04</span>Budget Range
                </label>
                <select
                  className="bg-paper border border-ink/[0.12] rounded-[3px] text-ink px-3.5 py-3 font-mono text-[13px] outline-none transition-all focus:border-red focus:shadow-[0_0_0_3px_rgba(248,10,38,0.1)]"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                >
                  <option>$2k — $5k</option>
                  <option>$5k — $15k</option>
                  <option>$15k — $40k</option>
                  <option>$40k+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-[7px]">
              <label className="font-mono text-[11px] text-muted tracking-[0.14em] uppercase">
                <span className="text-red font-semibold mr-2">05</span>Message
              </label>
              <textarea
                className="bg-paper border border-ink/[0.12] rounded-[3px] text-ink px-3.5 py-3 font-mono text-[13px] outline-none transition-all focus:border-red focus:shadow-[0_0_0_3px_rgba(248,10,38,0.1)] min-h-[110px] resize-y"
                placeholder="Tell me about your project, timeline, and why it matters."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div className="flex justify-between items-center mt-1">
              <span className="font-mono text-[11px] text-muted">
                I&apos;ll reply within 24h · UTC+7
              </span>
              <button
                type="button"
                className="inline-flex gap-2.5 items-center px-[22px] py-3.5 bg-red text-white border-0 rounded-[3px] text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-ink"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2 L11 13 M22 2 L15 22 L11 13 L2 9 Z" />
                </svg>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
