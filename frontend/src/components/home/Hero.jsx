import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Workflow,
  CheckCircle2,
  Play,
  Terminal,
  Cpu,
  Sparkles,
  Zap,
  Activity,
  Code2,
  Search,
  FileText,
  Eye,
} from "lucide-react";
import { agentraAgents } from "../../data/agentraAgents";

export default function Hero({ onCtaClick }) {
  const [activeTab, setActiveTab] = useState(0);

  const activeAgent = agentraAgents[activeTab] || agentraAgents[0];

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center pt-28 md:pt-36 pb-20 bg-grid-mesh"
    >
      {/* Radial Background Glow Mask */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-purple-600/15 via-indigo-600/10 to-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 backdrop-blur-xl mb-6 shadow-sm"
      >
        <span className="relative flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex rounded-full size-2 bg-purple-500" />
        </span>
        <span className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
          Agentra v1.5 • Autonomous Swarm Architecture
        </span>
      </motion.div>

      {/* Hero Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-5xl text-4xl font-extrabold tracking-tight md:text-7xl leading-[1.08] text-slate-900 dark:text-white"
      >
        Deploy your autonomous{" "}
        <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
          AI Agent Workforce
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg font-normal"
      >
        Enterprise multi-agent routing engine for deep PDF RAG, web component creation, live web research swarms, computer vision, and code synthesis.
      </motion.p>

      {/* Primary Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onCtaClick}
          className="flex h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-7 text-sm font-semibold text-white shadow-xl shadow-purple-500/25 transition cursor-pointer hover:shadow-purple-500/40"
        >
          <span>Start Free Trial</span>
          <ArrowRight size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onCtaClick}
          className="flex h-12 items-center gap-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.1] bg-white/80 dark:bg-slate-900/80 px-6 text-sm font-semibold text-slate-700 dark:text-slate-200 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
        >
          <Play size={14} className="text-purple-500 fill-purple-500" />
          <span>Watch Swarm Demo</span>
        </motion.button>
      </motion.div>

      {/* Interactive Swarm Execution Console */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative mt-14 w-full max-w-5xl text-left"
      >
        {/* Glow Halo */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-emerald-500/30 blur-2xl opacity-60 pointer-events-none" />

        <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/[0.1] bg-white/90 dark:bg-[#090d16]/90 p-4 shadow-2xl backdrop-blur-2xl">
          
          {/* Header Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/[0.08] px-4 pb-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/25">
                <Workflow size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Agentra Swarm Control Console
                  </h3>
                  <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-mono text-purple-600 dark:text-purple-300 border border-purple-500/20">
                    v1.5-LIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select an agent below to preview active execution telemetry
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <Activity size={12} className="animate-pulse" />
                <span>6 Agents Active</span>
              </div>
            </div>
          </div>

          {/* Agent Selection Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto px-2 py-3 border-b border-slate-200/60 dark:border-white/[0.05] no-scrollbar">
            {agentraAgents.map((agent, idx) => {
              const Icon = agent.icon;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                      : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon size={14} />
                  <span>{agent.title}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Agent Live Execution Console View */}
          <div className="p-4 grid md:grid-cols-12 gap-4">
            
            {/* Left Info Panel */}
            <div className="md:col-span-5 rounded-2xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/80 dark:bg-slate-950/80 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                    {activeAgent.tag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Latency: 24ms</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {activeAgent.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {activeAgent.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Execution Status</span>
                  <span className="font-semibold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Ready for dispatch
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Memory Context</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">128k Tokens</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Code / Output Terminal Mockup */}
            <div className="md:col-span-7 rounded-2xl border border-slate-900/10 dark:border-white/[0.08] bg-slate-950 p-4 font-mono text-xs text-slate-300 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-purple-400" />
                  <span>Agent Execution Pipeline</span>
                </div>
                <span className="text-[10px] text-slate-500">JSON-RPC / SSE</span>
              </div>

              <div className="space-y-2.5 text-[11px] leading-relaxed">
                <div className="text-slate-500">&gt; agentra.dispatchTask("{activeAgent.title.toLowerCase().replace(/ /g, "_")}")</div>
                <div className="text-purple-400">[INFO] Routing prompt to optimized model kernel...</div>
                <div className="text-emerald-400">[SUCCESS] Verified context memory &amp; live source parameters.</div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-200 mt-2">
                  <span className="text-purple-400 font-bold">Response: </span>
                  "Target prompt analyzed. Swarm dispatch complete. 100% precision achieved."
                </div>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}
