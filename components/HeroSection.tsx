"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useGlitch, GlitchHandle } from "react-powerglitch";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";

/* ────────── helpers ────────── */

/** Format seconds → MM:SS */
function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ────────── shared animation variants ────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ────────── MagneticButton (cursor-follow effect) ────────── */

function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

  // Slight rotation for extra depth
  const rotateX = useTransform(springY, [-20, 20], [6, -6]);
  const rotateY = useTransform(springX, [-20, 20], [-6, 6]);

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.35);
      y.set((e.clientY - cy) * 0.35);
    },
    [x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, rotateX, rotateY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

/* ────────── CursorRevealName (hover → photo follows cursor) ────────── */

function CursorRevealPhoto({ isVisible, springX, springY, children }: {
  isVisible: boolean;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none"
          style={{
            x: springX,
            y: springY,
            zIndex: 9999,
            translateX: "-50%",
            translateY: "-110%",
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 8 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
            mass: 0.6,
          }}
        >
          <div className="relative w-[160px] h-[200px] rounded-lg overflow-hidden border-2 border-cyan"
            style={{ boxShadow: "0 0 25px rgba(0,255,255,0.3), 0 0 60px rgba(0,255,255,0.1)" }}
          >
            <Image
              src="/profile-azhar.png"
              alt="Azhar Arrozak"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.06) 2px, rgba(0,255,255,0.06) 4px)",
              }}
            />
            {/* Bottom label */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
              <span className="font-mono text-[10px] text-cyan tracking-[0.16em] uppercase">
                {children}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function CursorRevealName({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  // Raw cursor coordinates (viewport-relative)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring-based following
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  const handleEnter = useCallback(
    (e: React.MouseEvent) => {
      // Seed position so image doesn't teleport from (0,0)
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      springX.jump(e.clientX);
      springY.jump(e.clientY);
      setIsHovered(true);
    },
    [cursorX, cursorY, springX, springY],
  );

  const handleLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <>
      <b
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative cursor-none text-cyan transition-colors duration-300 hover:text-white"
        style={{ zIndex: 10 }}
      >
        {/* Underline glow */}
        <span className="relative">
          {children}
          <motion.span
            className="absolute -bottom-[2px] left-0 h-[2px] bg-cyan origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </b>

      {/* Floating photo — portaled to body to avoid p > div hydration error */}
      <CursorRevealPhoto isVisible={isHovered} springX={springX} springY={springY}>
        {children}
      </CursorRevealPhoto>
    </>
  );
}

/* Dynamic Data */
const yearExp = new Date().getFullYear() - 2024;

/* ────────── HeroSection ────────── */

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Glitch for "Code." — triggers early in the cycle
  const glitchCode: GlitchHandle = useGlitch({
    glitchTimeSpan: { start: 0.1, end: 0.25 },
    shake: { velocity: 15, amplitudeX: 0.04, amplitudeY: 0.06 },
    slice: {
      count: 5,
      velocity: 10,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
    pulse: false,
    timing: { duration: 4000, iterations: Infinity },
  });

  // Glitch for "Build." — triggers mid-cycle
  const glitchBuild: GlitchHandle = useGlitch({
    glitchTimeSpan: { start: 0.4, end: 0.55 },
    shake: { velocity: 10, amplitudeX: 0.03, amplitudeY: 0.04 },
    slice: {
      count: 3,
      velocity: 8,
      minHeight: 0.03,
      maxHeight: 0.1,
      hueRotate: true,
    },
    pulse: false,
    timing: { duration: 5000, iterations: Infinity },
  });

  // Glitch for "Ship." — triggers late in the cycle
  const glitchShip: GlitchHandle = useGlitch({
    glitchTimeSpan: { start: 0.65, end: 0.8 },
    shake: { velocity: 18, amplitudeX: 0.05, amplitudeY: 0.07 },
    slice: {
      count: 6,
      velocity: 12,
      minHeight: 0.01,
      maxHeight: 0.2,
      hueRotate: true,
    },
    pulse: false,
    timing: { duration: 3500, iterations: Infinity },
  });

  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isPlaying, setIsPlaying] = useState(true);

  // Pause video when hero is off-screen, resume when visible
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Read real duration & track current time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => setDuration(fmtTime(video.duration));
    const onTime = () => setCurrentTime(fmtTime(video.currentTime));
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    // If already loaded (cached), grab duration immediately
    if (video.readyState >= 1) onMeta();

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-red text-paper relative overflow-hidden"
    >
      {/* Radial overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 400px at 20% 20%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(500px 400px at 85% 90%, rgba(22,42,34,0.35), transparent 60%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-10">
        {/* Meta bar — slide down */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex justify-between font-mono text-[11px] text-white/70 tracking-[0.14em] py-4 border-b border-white/15 relative z-2"
        >
          <span>~/portoflux/home.tsx</span>
          <span>LAT -6.2° · LON 106.8° · UTC+7</span>
          <span className="text-cyan">● AVAILABLE FOR Q2 2026</span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-14 items-center py-20 lg:pb-[100px] relative z-2">
          {/* Visual — scale-in reveal */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative aspect-[4/3] bg-red rounded overflow-hidden"
          >
            {/* Typing Video — autoplay, looped, muted for browser policy */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/typingvideo.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            {/* HUD corners */}
            <div className="absolute top-3.5 left-3.5 w-8 h-8 border-2 border-cyan border-r-0 border-b-0" />
            <div className="absolute top-3.5 right-3.5 w-8 h-8 border-2 border-cyan border-l-0 border-b-0" />
            <div className="absolute bottom-3.5 left-3.5 w-8 h-8 border-2 border-cyan border-r-0 border-t-0" />
            <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-2 border-cyan border-l-0 border-t-0" />
            {/* Labels */}
            <div className="absolute top-6 left-[60px] font-mono text-[11px] text-cyan tracking-[0.14em] bg-black/35 px-2.5 py-1 border border-cyan/40">
              ● REC · CH01 · {currentTime}
            </div>
            <div className="absolute bottom-6 right-[60px] font-mono text-[11px] text-white tracking-[0.14em] bg-black/35 px-2.5 py-1 border border-white/40">
              4K · 60FPS
            </div>
            {/* Play / Pause toggle */}
            <button
              onClick={togglePlay}
              className="absolute bottom-7 left-7 flex gap-3.5 items-center bg-ink/70 backdrop-blur-[8px] py-3 pl-3.5 pr-[18px] border border-cyan/30 rounded-full cursor-pointer transition-all duration-200 hover:bg-ink/90 hover:border-cyan/60"
            >
              <span className="w-11 h-11 rounded-full bg-cyan grid place-items-center text-ink transition-transform duration-200 hover:scale-105">
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <rect
                      x="6"
                      y="5"
                      width="4"
                      height="14"
                      fill="currentColor"
                    />
                    <rect
                      x="14"
                      y="5"
                      width="4"
                      height="14"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M8 5 L20 12 L8 19 Z" fill="currentColor" />
                  </svg>
                )}
              </span>
              <span className="text-white font-mono text-[11px] tracking-[0.16em]">
                {isPlaying ? "PAUSE" : "PLAY"} SHOWREEL · {duration}
              </span>
            </button>
          </motion.div>

          {/* Text */}
          <div className="relative">
            {/* Badge — fade left */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex gap-2.5 items-center px-3.5 py-[7px] bg-white/[0.14] border border-white/25 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase mb-[22px]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)] animate-[pulse-dot_1.6s_infinite]" />
              Available for freelance
            </motion.div>

            {/* Heading — staggered words */}
            <h1 className="font-[Orbitron] font-extrabold text-[clamp(44px,5.2vw,78px)] leading-[0.95] tracking-[-0.01em] text-white mb-3">
              <motion.span
                variants={fadeUp}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                ref={glitchCode.ref}
                className="inline-block"
              >
                Code.
              </motion.span>
              <br />
              <motion.span
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                ref={glitchBuild.ref}
                className="inline-block text-cyan"
              >
                Build.
              </motion.span>
              <br />
              <motion.span
                variants={fadeUp}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                ref={glitchShip.ref}
                className="inline-block text-transparent"
                style={{ WebkitTextStroke: "2px #fff" }}
              >
                Ship.
              </motion.span>
            </h1>

            {/* Role list — staggered */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-2 my-[22px] py-[18px] border-t border-b border-white/20"
            >
              <div className="flex items-center gap-3 font-mono text-[15px] text-white tracking-[0.04em]">
                <span className="text-cyan w-6">01</span>Website Developer
                <span className="text-white/60 ml-auto">→</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[15px] text-white tracking-[0.04em]">
                <span className="text-cyan w-6">02</span>Mobile Developer
                <span className="text-white/60 ml-auto">→</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white/85 text-[15px] leading-[1.7] max-w-[480px] mb-7 justify-center items-center text-justify"
            >
              Hi, I&apos;m{" "}
              <CursorRevealName>Azhar Arrozak</CursorRevealName> — a Mobile and
              Web Developer based in Tegal, Central Java Indonesia. I specialize
              in building robust, cross-platform applications and polished user
              interfaces. With {yearExp}+ years of experience webs and mobile, I
              am driven by the philosophy:
              <br />{" "}
              <em>&quot;Learn to Teach More, Teach to Learn more.&quot;</em>
            </motion.p>

            {/* CTA Buttons — magnetic cursor + fade-up */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-3 flex-wrap"
            >
              <MagneticButton className="inline-flex gap-2.5 items-center px-[26px] py-4 bg-ink text-paper border-0 rounded-[3px] font-sans text-sm font-semibold tracking-[0.08em] uppercase cursor-pointer transition-all duration-200 hover:bg-cyan hover:text-ink hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3 V15 M6 11 L12 17 L18 11 M4 21 H20" />
                </svg>
                Download CV
              </MagneticButton>
              <MagneticButton className="inline-flex gap-2.5 items-center px-6 py-4 bg-transparent text-white border-[1.5px] border-white rounded-[3px] text-sm font-semibold tracking-[0.08em] uppercase cursor-pointer transition-colors duration-200 hover:bg-white hover:text-red">
                Let&apos;s Talk →
              </MagneticButton>
            </motion.div>

            {/* Stats — staggered counters */}
            <div className="grid grid-cols-3 gap-6 mt-9">
              {[
                { value: `${yearExp}`, suffix: "+", label: "Years Exp" },
                { value: "5", suffix: "", label: "Projects" },
                { value: "5", suffix: "", label: "Clients" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={6 + i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col gap-1"
                >
                  <span className="font-[Orbitron] font-extrabold text-4xl text-white">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-cyan">{stat.suffix}</span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-white/70 tracking-[0.16em] uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
