import React from "react";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function CtaBanner({ onCtaClick }) {
  return (
    <section id="contact" className="mx-6 max-w-6xl lg:mx-auto my-24 relative z-20">
      <div className="ref-card p-10 md:p-16 text-center">
        
        {/* Dual Corner Ambient Halos */}
        <div className="absolute -top-16 -left-16 size-80 rounded-full bg-[#4288BC]/[0.06] dark:bg-white/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 size-96 rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.02] blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-2xl">
          {/* Status Pill with Connectors */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/20 text-slate-700 dark:text-zinc-300 text-[11px] font-mono tracking-wider uppercase mb-5 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <Sparkles size={12} className="text-slate-600 dark:text-zinc-300 animate-pulse" />
            <span>Instant Cloud Deployment</span>
          </div>

          <h2 className="text-3xl font-extrabold md:text-5xl tracking-tight leading-tight text-slate-900 dark:text-white">
            Ready to Unleash Your <br />
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]">
              Autonomous AI Swarm?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-xs md:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
            Sign up now and claim your 100 bonus credits immediately. Experience coordinated LangGraph multi-agent intelligence across code, PDFs, research, and design.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center">
            <button
              onClick={onCtaClick}
              className="ref-primary-btn hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold max-w-sm flex items-center justify-center gap-2.5"
            >
              <span>Get Started with 100 Credits</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={onCtaClick}
              className="mt-3.5 text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium cursor-pointer"
            >
              Cancel / Continue Browsing
            </button>
          </div>

          {/* Feature List in Beveled Subcards */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 dark:text-zinc-300">
            <div className="ref-beveled-subcard px-3.5 py-1.5 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-slate-900 dark:text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
              <span>Free 100 Credits Included</span>
            </div>
            <div className="ref-beveled-subcard px-3.5 py-1.5 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-slate-900 dark:text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
              <span>No Credit Card Required</span>
            </div>
            <div className="ref-beveled-subcard px-3.5 py-1.5 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-slate-900 dark:text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
              <span>Instant LangGraph Orchestration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
