import { ArrowRight, Play } from "lucide-react";

export default function Hero({ onCtaClick }) {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 text-center pt-32 pb-24 md:pt-40 md:pb-28 bg-grid-mesh"
    >
      {/* Hero Headline */}
      <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl leading-[1.1] text-slate-900 dark:text-white">
        Deploy your autonomous{" "}
        <span className="text-purple-600 dark:text-purple-400">
          AI Agent Workforce
        </span>
      </h1>

      <p className="mt-5 max-w-xl text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
        Multi-agent routing engine for PDF RAG, web component creation, live web research swarms, vision, and full-stack code synthesis.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onCtaClick}
          className="flex h-11 items-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-500 px-6 text-xs font-semibold text-white shadow-sm transition cursor-pointer"
        >
          <span>Start Free Trial</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={onCtaClick}
          className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#121215] px-5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer"
        >
          <Play size={12} className="text-purple-500 fill-purple-500" />
          <span>Watch Swarm Demo</span>
        </button>
      </div>
    </section>
  );
}
