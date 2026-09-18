import React from "react";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function CtaBanner({ onCtaClick }) {
  return (
    <section id="contact" className="mx-6 max-w-6xl lg:mx-auto my-24 relative z-20">
      <div className="ref-card p-10 md:p-16 text-center">
        
        {/* Dual Corner Ambient Halos (Matching Reference Image) */}
        {/* Top-Left Warm Rose/Pink Neon Halo */}
        <div className="absolute -top-16 -left-16 size-80 rounded-full bg-gradient-to-br from-rose-500/40 via-pink-500/25 to-transparent blur-3xl pointer-events-none" />
        
        {/* Bottom-Right Electric Violet/Purple Neon Halo */}
        <div className="absolute -bottom-16 -right-16 size-96 rounded-full bg-gradient-to-tl from-purple-600/50 via-violet-600/35 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-2xl">
          {/* Status Pill with Connectors */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-pink-200 text-[11px] font-mono tracking-wider uppercase mb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <Sparkles size={12} className="text-pink-300 animate-pulse" />
            <span>Instant Cloud Deployment</span>
          </div>

          <h2 className="text-3xl font-extrabold md:text-5xl tracking-tight leading-tight text-white">
            Ready to Unleash Your <br />
            <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(244,63,94,0.4)]">
              Autonomous AI Swarm?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-xs md:text-sm text-slate-300/80 leading-relaxed font-normal">
            Sign up now and claim your 100 bonus credits immediately. Experience coordinated LangGraph multi-agent intelligence across code, PDFs, research, and design.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center">
            <button
              onClick={onCtaClick}
              className="ref-primary-btn max-w-sm flex items-center justify-center gap-2.5"
            >
              <span>Get Started with 100 Credits</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={onCtaClick}
              className="mt-3.5 text-xs text-slate-400 hover:text-white transition-colors font-medium cursor-pointer"
            >
              Cancel / Continue Browsing
            </button>
          </div>

          {/* Feature List in Beveled Subcards */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <div className="ref-beveled-subcard px-3.5 py-1.5 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-pink-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.7)]" />
              <span>Free 100 Credits Included</span>
            </div>
            <div className="ref-beveled-subcard px-3.5 py-1.5 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-pink-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.7)]" />
              <span>No Credit Card Required</span>
            </div>
            <div className="ref-beveled-subcard px-3.5 py-1.5 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]" />
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
