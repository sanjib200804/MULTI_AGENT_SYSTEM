import React from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroCosmic({ onCtaClick, onExploreClick }) {
  // Pre-calculated star/particle positions with radiant neon colors matching reference design
  const particles = [
    { top: "58%", left: "22%", size: 2.5, delay: 0.2, dur: 4, color: "bg-pink-300", glow: "rgba(244, 114, 182, 0.9)" },
    { top: "62%", left: "48%", size: 3, delay: 0.8, dur: 4.5, color: "bg-rose-300", glow: "rgba(244, 63, 94, 0.9)" },
    { top: "66%", left: "54%", size: 3.5, delay: 1.1, dur: 5.5, color: "bg-purple-400", glow: "rgba(168, 85, 247, 0.9)" },
    { top: "72%", left: "61%", size: 2, delay: 2.3, dur: 3.8, color: "bg-fuchsia-400", glow: "rgba(217, 70, 239, 0.9)" },
    { top: "65%", left: "68%", size: 3.5, delay: 0.8, dur: 4.8, color: "bg-pink-400", glow: "rgba(236, 72, 153, 0.9)" },
    { top: "70%", left: "74%", size: 2.5, delay: 1.7, dur: 5.2, color: "bg-purple-300", glow: "rgba(168, 85, 247, 0.9)" },
    { top: "75%", left: "80%", size: 3, delay: 2.9, dur: 6, color: "bg-violet-300", glow: "rgba(139, 92, 246, 0.9)" },
    { top: "68%", left: "42%", size: 2, delay: 0.5, dur: 4.2, color: "bg-rose-400", glow: "rgba(244, 63, 94, 0.9)" },
    { top: "73%", left: "37%", size: 2.5, delay: 1.9, dur: 5, color: "bg-pink-400", glow: "rgba(244, 114, 182, 0.9)" },
    { top: "60%", left: "59%", size: 2, delay: 2.1, dur: 3.5, color: "bg-fuchsia-300", glow: "rgba(217, 70, 239, 0.9)" },
    { top: "78%", left: "86%", size: 2.5, delay: 0.4, dur: 4.6, color: "bg-rose-300", glow: "rgba(251, 113, 133, 0.9)" },
    { top: "54%", left: "78%", size: 2, delay: 1.4, dur: 4.1, color: "bg-purple-400", glow: "rgba(192, 132, 252, 0.9)" },
  ];

  return (
    <section className="relative min-h-[92vh] md:min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#030208] text-white pt-36 md:pt-48 pb-20 select-none">
      
      {/* 1. Perspective Wireframe Coordinate Grid */}
      <div 
        className="absolute inset-0 bg-perspective-grid pointer-events-none opacity-50 md:opacity-70"
        aria-hidden="true" 
      />

      {/* 2. Dual Radiant Celestial Light Beams */}
      {/* Right Celestial Beam */}
      <div 
        className="absolute -right-20 top-1/4 w-[450px] md:w-[700px] h-[750px] pointer-events-none celestial-beam transform -rotate-[32deg] opacity-80 md:opacity-95"
        aria-hidden="true"
      />
      {/* Left Subtle Ambient Light Ray */}
      <div 
        className="absolute -left-28 top-1/3 w-[400px] md:w-[600px] h-[600px] pointer-events-none transform rotate-[25deg] bg-gradient-to-tr from-transparent via-pink-500/12 to-transparent blur-[60px] opacity-70"
        aria-hidden="true"
      />

      {/* 3. Radiant Multi-Stop Ambient Glow Behind Headline */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/25 via-pink-500/30 to-rose-600/25 blur-[140px] pointer-events-none" 
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center flex flex-col items-center">
        
        {/* Luminous Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-pink-400/40 bg-gradient-to-r from-rose-500/15 via-pink-500/15 to-purple-500/15 backdrop-blur-md shadow-[0_0_25px_rgba(244,63,94,0.35)] mb-8"
        >
          <span className="size-2 rounded-full bg-pink-400 shadow-[0_0_10px_#f43f5e] animate-ping" />
          <span className="text-[11px] font-semibold tracking-wider uppercase bg-gradient-to-r from-pink-300 via-white to-purple-300 bg-clip-text text-transparent">
            Next-Gen Multi-Agent Ecosystem
          </span>
          <Sparkles size={13} className="text-pink-400 animate-pulse" />
        </motion.div>

        {/* Main Headline with Metallic & Radiant Neon Glow */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight leading-[1.08] text-metallic"
        >
          Autonomous AI, <br />
          <span className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(244,63,94,0.65)]">
            Owned by You.
          </span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mt-7 max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed text-balance"
        >
          A state-of-the-art Multi-Agent platform where intelligence is transparent,
          autonomous, and user-owned — not locked inside centralized prompt boxes.
        </motion.p>

        {/* Action Buttons (Intense Glowing Gradient + Luminous Glass) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4 z-20"
        >
          {/* Primary CTA - Launch App with Intense Radiant Rose/Purple Glow */}
          <button
            onClick={onCtaClick}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e11d48] via-[#ec4899] to-[#a855f7] text-white text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_35px_rgba(225,29,72,0.7),0_0_65px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(244,63,94,0.9),0_0_80px_rgba(168,85,247,0.7)] hover:scale-[1.03] cursor-pointer border border-pink-300/50"
          >
            <span className="flex items-center gap-2">
              Launch App
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </button>

          {/* Secondary CTA - Explore Agents with Glowing Glass */}
          <button
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-pink-500/30 bg-white/[0.05] hover:bg-pink-500/10 text-slate-200 hover:text-white text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-300 cursor-pointer hover:border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:shadow-[0_0_30px_rgba(236,72,153,0.35)]"
          >
            <span>Explore Swarm</span>
            <ArrowUpRight size={16} className="text-pink-400 group-hover:text-white" />
          </button>
        </motion.div>
      </div>

      {/* 4. Floating Multi-Color Stardust Micro-Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.color} pointer-events-none`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: `0 0 10px 2px ${p.glow}`,
            animation: `floatParticle ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 5. Curved Earth / Planet Horizon Arc with Multi-Color Radiant Aurora */}
      <div className="absolute -bottom-[280px] sm:-bottom-[350px] md:-bottom-[480px] lg:-bottom-[540px] left-1/2 -translate-x-1/2 w-[150vw] md:w-[130vw] h-[550px] md:h-[750px] pointer-events-none">
        
        {/* Atmospheric Multi-Hue Glow Rim */}
        <div 
          className="w-full h-full rounded-[100%_100%_0_0] border-t-[3px] border-rose-400/90 planet-horizon-glow bg-gradient-to-b from-[#2a0e38] via-[#14061e] to-[#030208]"
        />

        {/* Intense Central Light Corona with Rose, Magenta & Violet Spectrum */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-28 bg-gradient-to-r from-transparent via-rose-400 via-fuchsia-500 to-transparent blur-2xl opacity-90"
        />

        {/* Secondary Warm Cosmic Aurora Backlight */}
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-3xl opacity-75"
        />
      </div>

    </section>
  );
}
