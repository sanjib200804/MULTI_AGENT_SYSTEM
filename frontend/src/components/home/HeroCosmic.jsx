import React from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroCosmic({ onCtaClick, onExploreClick }) {
  // Balanced monochrome stardust micro-particles distributed around hero content
  const particles = [
    { top: "20%", left: "15%", size: 2, delay: 0.2, dur: 4.5, color: "bg-white", glow: "rgba(255, 255, 255, 0.8)" },
    { top: "28%", left: "82%", size: 2.5, delay: 0.8, dur: 5.2, color: "bg-zinc-300", glow: "rgba(255, 255, 255, 0.6)" },
    { top: "45%", left: "10%", size: 2, delay: 1.4, dur: 4.8, color: "bg-zinc-200", glow: "rgba(255, 255, 255, 0.7)" },
    { top: "52%", left: "88%", size: 3, delay: 2.1, dur: 5.6, color: "bg-white", glow: "rgba(255, 255, 255, 0.9)" },
    { top: "68%", left: "20%", size: 2, delay: 0.5, dur: 4.2, color: "bg-zinc-400", glow: "rgba(255, 255, 255, 0.5)" },
    { top: "72%", left: "80%", size: 2.5, delay: 1.8, dur: 5, color: "bg-white", glow: "rgba(255, 255, 255, 0.8)" },
    { top: "35%", left: "28%", size: 1.5, delay: 2.7, dur: 6, color: "bg-zinc-300", glow: "rgba(255, 255, 255, 0.6)" },
    { top: "38%", left: "74%", size: 2, delay: 1.1, dur: 4.6, color: "bg-white", glow: "rgba(255, 255, 255, 0.7)" },
    { top: "82%", left: "32%", size: 2, delay: 0.4, dur: 5.4, color: "bg-zinc-300", glow: "rgba(255, 255, 255, 0.6)" },
    { top: "80%", left: "68%", size: 2.5, delay: 2.3, dur: 4.9, color: "bg-white", glow: "rgba(255, 255, 255, 0.8)" },
  ];

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-transparent text-slate-900 dark:text-white pt-36 pb-20 md:pt-44 md:pb-28 select-none">
      
      {/* 1. Perspective Wireframe Coordinate Grid */}
      <div 
        className="absolute inset-0 bg-perspective-grid pointer-events-none opacity-40 md:opacity-60"
        aria-hidden="true" 
      />

      {/* 2. Dual Radiant Celestial Light Beams (with smooth fade-out mask to prevent seams) */}
      {/* Right Celestial Beam */}
      <div 
        className="absolute -right-20 top-1/4 w-[450px] md:w-[700px] h-[700px] pointer-events-none celestial-beam transform -rotate-[32deg] opacity-40 md:opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        aria-hidden="true" 
      />
      {/* Left Subtle Ambient Light Ray */}
      <div 
        className="absolute -left-28 top-1/3 w-[400px] md:w-[600px] h-[600px] pointer-events-none transform rotate-[25deg] bg-gradient-to-tr from-transparent via-black/[0.03] dark:via-white/[0.04] to-transparent blur-[60px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        aria-hidden="true" 
      />

      {/* 3. Radiant Ambient Glow Behind Headline */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[450px] rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.03] blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center flex flex-col items-center">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-white/[0.05] backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.06)] mb-8"
        >
          <span className="size-2 rounded-full bg-black dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_#ffffff] animate-ping" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-800 dark:text-zinc-200">
            Next-Gen Multi-Agent Ecosystem
          </span>
          <Sparkles size={13} className="text-slate-500 dark:text-zinc-300 animate-pulse" />
        </motion.div>

        {/* Main Headline with Metallic / Dark Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight leading-[1.08] text-metallic"
        >
          Autonomous AI, <br />
          <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
            Owned by You.
          </span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mt-7 max-w-2xl text-slate-600 dark:text-zinc-400 text-sm sm:text-base md:text-lg font-normal leading-relaxed text-balance"
        >
          A state-of-the-art Multi-Agent platform where intelligence is transparent,
          autonomous, and user-owned — not locked inside centralized prompt boxes.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4 z-20"
        >
          {/* Primary CTA */}
          <button
            onClick={onCtaClick}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-sm font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl dark:shadow-[0_0_25px_rgba(255,255,255,0.25)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] cursor-pointer border border-black/10 dark:border-white"
          >
            <span className="flex items-center gap-2">
              Launch App
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-black/15 dark:border-white/20 bg-black/[0.04] hover:bg-black/[0.08] text-slate-800 dark:bg-white/[0.05] dark:hover:bg-white/[0.12] dark:text-zinc-200 dark:hover:text-white text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-300 cursor-pointer hover:border-black/30 dark:hover:border-white/40 shadow-sm"
          >
            <span>Explore Swarm</span>
            <ArrowUpRight size={16} className="text-slate-500 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white" />
          </button>
        </motion.div>
      </div>

      {/* 4. Floating Monochrome Stardust Micro-Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.color} pointer-events-none`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: `0 0 8px 1.5px ${p.glow}`,
            animation: `floatParticle ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

    </section>
  );
}
