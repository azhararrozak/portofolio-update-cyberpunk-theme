"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/** Format seconds → MM:SS */
function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.15 }
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
    <section ref={sectionRef} className="bg-red text-paper relative overflow-hidden">
      {/* Radial overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 400px at 20% 20%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(500px 400px at 85% 90%, rgba(22,42,34,0.35), transparent 60%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-10">
        {/* Meta bar */}
        <div className="flex justify-between font-mono text-[11px] text-white/70 tracking-[0.14em] py-4 border-b border-white/15 relative z-2">
          <span>~/portoflux/home.tsx</span>
          <span>LAT -6.2° · LON 106.8° · UTC+7</span>
          <span className="text-cyan">● AVAILABLE FOR Q2 2026</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-14 items-center py-20 lg:pb-[100px] relative z-2">
          {/* Visual */}
          <div className="relative aspect-[4/3] bg-red rounded overflow-hidden">
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
                    <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                    <rect x="14" y="5" width="4" height="14" fill="currentColor" />
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
          </div>

          {/* Text */}
          <div className="relative">
            <div className="inline-flex gap-2.5 items-center px-3.5 py-[7px] bg-white/[0.14] border border-white/25 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase mb-[22px]">
              <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)] animate-[pulse-dot_1.6s_infinite]" />
              Available for freelance
            </div>

            <h1 className="font-[Orbitron] font-extrabold text-[clamp(44px,5.2vw,78px)] leading-[0.95] tracking-[-0.01em] text-white mb-3">
              Code.
              <br />
              <span className="text-cyan">Build.</span>
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>
                Ship.
              </span>
            </h1>

            <div className="flex flex-col gap-2 my-[22px] py-[18px] border-t border-b border-white/20">
              <div className="flex items-center gap-3 font-mono text-[15px] text-white tracking-[0.04em]">
                <span className="text-cyan w-6">01</span>Website Developer
                <span className="text-white/60 ml-auto">→</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[15px] text-white tracking-[0.04em]">
                <span className="text-cyan w-6">02</span>Mobile Developer
                <span className="text-white/60 ml-auto">→</span>
              </div>
            </div>

            <p className="text-white/85 text-[15px] leading-[1.7] max-w-[480px] mb-7">
              Hi, I&apos;m <b>Ayla Nakamura</b> — a developer based in Jakarta building polished
              interfaces for web and mobile. 5+ years shipping products for startups, agencies, and
              the occasional wild idea.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button className="inline-flex gap-2.5 items-center px-[26px] py-4 bg-ink text-paper border-0 rounded-[3px] font-sans text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-200 hover:bg-cyan hover:text-ink hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3 V15 M6 11 L12 17 L18 11 M4 21 H20" />
                </svg>
                Download CV
              </button>
              <button className="inline-flex gap-2.5 items-center px-6 py-4 bg-transparent text-white border-[1.5px] border-white rounded-[3px] text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-white hover:text-red">
                Let&apos;s Talk →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-9">
              <div className="flex flex-col gap-1">
                <span className="font-[Orbitron] font-extrabold text-4xl text-white">
                  05<span className="text-cyan">+</span>
                </span>
                <span className="font-mono text-[11px] text-white/70 tracking-[0.16em] uppercase">
                  Years Exp
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-[Orbitron] font-extrabold text-4xl text-white">42</span>
                <span className="font-mono text-[11px] text-white/70 tracking-[0.16em] uppercase">
                  Projects
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-[Orbitron] font-extrabold text-4xl text-white">18</span>
                <span className="font-mono text-[11px] text-white/70 tracking-[0.16em] uppercase">
                  Clients
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
