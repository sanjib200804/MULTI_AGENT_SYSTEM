import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CtaBanner({ onCtaClick }) {
  return (
    <section id="contact" className="mx-6 max-w-5xl lg:mx-auto my-16 rounded-2xl bg-slate-900 dark:bg-[#121215] px-6 py-16 text-center text-white border border-slate-800 dark:border-white/[0.08] shadow-lg">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold md:text-4xl tracking-tight leading-tight text-white">
          Ready to deploy your <span className="text-purple-400">AI Agent Swarm?</span>
        </h2>

        <p className="mx-auto mt-3 max-w-md text-xs md:text-sm text-slate-400 leading-relaxed font-normal">
          Get started immediately with 100 free credits and access to all 6 specialized agents.
        </p>

        <div className="mt-7 flex items-center justify-center">
          <button
            onClick={onCtaClick}
            className="flex h-11 items-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-500 px-6 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
          >
            <span>Get Started for Free</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-purple-400" /> Free 100 Credits</span>
          <span>•</span>
          <span>No Credit Card Required</span>
          <span>•</span>
          <span>Instant Setup</span>
        </div>
      </div>
    </section>
  );
}
