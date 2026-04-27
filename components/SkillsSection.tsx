"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Typed from "typed.js";

/* ────────── data ────────── */

const skills = [
  { name: "React / Next.js", pct: 92, variant: "red" as const },
  { name: "TypeScript", pct: 88, variant: "cyan" as const },
  { name: "React Native", pct: 82, variant: "red" as const },
  { name: "Flutter", pct: 70, variant: "cyan" as const },
  { name: "Node & APIs", pct: 80, variant: "red" as const },
  { name: "Tailwind / CSS", pct: 90, variant: "cyan" as const },
];

const tags = [
  { label: "📍 Tegal, Indonesia", cls: "bg-red text-white" },
  { label: "Remote OK", cls: "bg-ink text-paper" },
  { label: "☕ Coffee", cls: "bg-paper-2 text-charcoal" },
  { label: "🎧 Synthwave", cls: "bg-cyan text-ink" },
];

const yearExp = new Date().getFullYear() - 2024;

/* ────────── animation variants ────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Tag pop-in with spring bounce */
const tagPop: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 18,
      delay: 0.3 + i * 0.1,
    },
  }),
};

/** Skill bar fill animation */
const barFill: Variants = {
  hidden: { width: "0%" },
  visible: (pct: number) => ({
    width: `${pct}%`,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  }),
};

/** blinking text infinity */

const blink: Variants = {
  hidden: { opacity: 0, filter: "blur(2px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
      repeat: Infinity,
      repeatType: "reverse",
    },
  }),
};

/* ────────── TypedHeading (typed.js) ────────── */

function TypedHeading() {
  const el = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.5 });
  const typedRef = useRef<Typed | null>(null);

  useEffect(() => {
    // Only start typing when the element scrolls into view
    if (!isInView || !el.current) return;
    // Don't re-init if already created
    if (typedRef.current) return;

    typedRef.current = new Typed(el.current, {
      strings: [
        'Dev by day,<br/><span class="text-red">tinkerer</span> by night.',
        'Code by day,<br/><span class="text-red">create</span> by night.',
        'Build by day,<br/><span class="text-red">dream</span> by night.',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typedRef.current?.destroy();
      typedRef.current = null;
    };
  }, [isInView]);

  return (
    <motion.h3
      ref={wrapperRef}
      variants={fadeUp}
      custom={1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="font-[Orbitron] font-bold text-[32px] leading-[1.15] mb-[18px]"
    >
      <span ref={el} />
    </motion.h3>
  );
}

/* ────────── component ────────── */

export default function SkillsSection() {
  return (
    <section className="py-24" id="skills">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Section Head */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 pb-5 border-b border-ink/15">
          <div>
            {/* Label — fade left */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="font-mono text-xs text-red tracking-[0.22em] uppercase inline-flex items-center gap-3 mb-2.5"
            >
              <span className="w-7 h-0.5 bg-red" />
              Section 02
            </motion.div>
            {/* Title — fade up */}
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="font-[Orbitron] font-extrabold text-[clamp(32px,4vw,52px)] m-0 leading-none"
            >
              Skills &amp; About
            </motion.h2>
          </div>
          {/* Paragraph — fade up */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-muted text-sm max-w-[420px] font-mono leading-relaxed text-justify"
          >
            Full-stack development for web and mobile. {yearExp}+ years of
            production experience across startups and agencies.
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8">
          {/* About Panel — scale in */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded p-9 relative overflow-hidden shadow-[0_1px_0_rgba(14,15,16,0.08)]"
          >
            <motion.div
              variants={blink}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 font-mono text-[11px] text-muted tracking-[0.18em] uppercase mb-[18px]"
            >
              <span className="w-2 h-2 bg-red" />
              About Me
            </motion.div>

            <TypedHeading />

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-justify"
            >
              <p className="text-charcoal-2 text-[15px] leading-[1.75] mb-3.5">
                I&apos;m a dedicated Mobile and Web Developer with a strong
                focus on creating responsive, cross-platform applications. My
                expertise spans across modern frontend frameworks like React and
                Next.js, as well as mobile development using React Native and
                Flutter.
              </p>
              <p className="text-charcoal-2 text-[15px] leading-[1.75] mb-0">
                Driven by my core philosophy,{" "}
                <em>&quot;Learn to Teach More, Teach to Learn more,&quot;</em> I
                continuously explore new technologies and best practices to
                craft seamless digital experiences that solve real-world
                problems.
              </p>
            </motion.div>

            {/* Tags — spring pop-in */}
            <div className="flex flex-wrap gap-2 mt-[22px]">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag.label}
                  variants={tagPop}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.12,
                    rotate: Math.random() > 0.5 ? 3 : -3,
                    transition: { type: "spring", stiffness: 500, damping: 15 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`inline-flex items-center gap-2 px-[13px] py-[7px] rounded-full font-mono text-[11px] tracking-[0.08em] cursor-default select-none ${tag.cls}`}
                >
                  {tag.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Skills Panel — scale in */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded p-9 relative overflow-hidden shadow-[0_1px_0_rgba(14,15,16,0.08)]"
          >
            <motion.div
              variants={blink}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 font-mono text-[11px] text-muted tracking-[0.18em] uppercase mb-[18px]"
            >
              <span className="w-2 h-2 bg-cyan" />
              Tech Stack · {skills.length} items
            </motion.div>

            <div className="flex flex-col gap-[18px]">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col gap-2"
                >
                  {/* Skill label + percentage */}
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

                  {/* Skill bar with shimmer light effect */}
                  <div className="h-2 bg-ink/[0.08] rounded overflow-hidden">
                    <motion.div
                      variants={barFill}
                      custom={skill.pct}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`h-full rounded relative ${
                        skill.variant === "cyan"
                          ? "bg-gradient-to-r from-cyan to-[#7ff2f2]"
                          : "bg-gradient-to-r from-red to-crimson"
                      }`}
                    >
                      {/* Shimmer light running left → right */}
                      <motion.div
                        className="absolute inset-0 rounded"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                          backgroundSize: "40% 100%",
                          backgroundRepeat: "no-repeat",
                        }}
                        initial={{ backgroundPosition: "-40% 0" }}
                        whileInView={{
                          backgroundPosition: ["−40% 0", "140% 0"],
                        }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 1.8,
                          ease: "easeInOut",
                          delay: 1.2 + i * 0.15,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
