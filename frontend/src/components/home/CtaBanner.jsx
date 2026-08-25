import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function CtaBanner({ onCtaClick }) {
  return (
    <section id="contact" className="mx-6 md:mx-16 lg:mx-24 mt-20 mb-16 overflow-hidden rounded-3xl bg-slate-950 px-6 py-20 text-center text-white relative border border-white/[0.1] shadow-2xl">
      {/* Background Radial Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.25),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 mb-6 border border-purple-500/30 shadow-lg shadow-purple-500/20">
          <Sparkles size={26} />
        </div>

        <h2 className="text-3xl font-extrabold md:text-5xl tracking-tight leading-tight text-white">
          Ready to deploy your <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">AI Agent Swarm?</span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm md:text-base text-slate-400 leading-relaxed font-normal">
          Get started immediately with 100 free credits and access to all 6 specialized agents. Zero configuration needed.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onCtaClick}
            className="flex h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-8 text-sm font-bold text-white shadow-xl shadow-purple-500/30 transition cursor-pointer hover:shadow-purple-500/50"
          >
            <span>Get Started for Free</span>
            <ArrowRight size={17} />
          </motion.button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
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
