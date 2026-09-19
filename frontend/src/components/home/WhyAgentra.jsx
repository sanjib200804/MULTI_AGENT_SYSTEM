import React from "react";
import { 
  Bot, 
  BrainCircuit, 
  Database, 
  ShieldCheck, 
  Layers, 
  Server, 
  Cpu, 
  Zap,
  HardDrive,
  ArrowRight
} from "lucide-react";

export default function WhyAgentra() {
  const archHighlights = [
    {
      icon: BrainCircuit,
      title: "LangGraph State Machine Engine",
      desc: "Dynamic conditional routing evaluates intent, payload types, and multi-turn state to orchestrate the ideal agent sequence without prompt drift.",
      tag: "Autonomous Orchestration",
    },
    {
      icon: Server,
      title: "Resilient Microservices Topology",
      desc: "Built with independent FastAPI services across Gateway (8000), Auth (8001), Chat (8002), and Agent (8003) for horizontal scaling.",
      tag: "Zero Single-Point-of-Failure",
    },
    {
      icon: Database,
      title: "Hybrid Persistent Data Layer",
      desc: "PostgreSQL 15 for relational history, Redis Alpine for sub-millisecond memory caching, Qdrant for vector search, and AWS S3 for binary files.",
      tag: "Enterprise Cloud Tier",
    },
    {
      icon: ShieldCheck,
      title: "Quota & Token Security Sandbox",
      desc: "Strict per-agent credit metering, JWT token rotation with Redis blacklisting, and isolated ephemeral runtime sandboxes.",
      tag: "Bank-Grade Protection",
    },
  ];

  return (
    <section id="architecture" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-24 relative z-20">
      
      {/* Top Section Intro */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.05] text-slate-700 dark:text-zinc-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Layers size={13} className="text-slate-600 dark:text-zinc-300" />
          <span>Under the Hood</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineered for <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">Enterprise Workloads</span>
        </h2>
        <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
          Agentra replaces slow, fragile monolithic AI scripts with an industrial-grade microservice architecture coordinated by stateful LangGraph pipelines.
        </p>
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-12 relative">
        
        {/* Left Side: Core Architectural Pillars with Monochrome Card Style (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {archHighlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div 
                key={i} 
                className="ref-card group p-5 sm:p-6 flex gap-4 transition-all duration-300 cursor-pointer"
              >
                {/* Subtle Corner Halos */}
                <div className="absolute -top-10 -left-10 size-36 rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.03] blur-2xl pointer-events-none group-hover:bg-[#4288BC]/[0.1] dark:group-hover:bg-white/[0.06] transition-all" />
                <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-[#4288BC]/[0.04] dark:bg-white/[0.02] blur-2xl pointer-events-none group-hover:bg-[#4288BC]/[0.08] dark:group-hover:bg-white/[0.05] transition-all" />

                <div className="relative z-10 flex size-11 shrink-0 items-center justify-center ref-beveled-icon text-slate-800 dark:text-zinc-200 group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>

                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">{item.title}</h3>
                    <span className="ref-connect-btn !py-0.5 !px-2.5 !text-[10px]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Visualizer Master Card in Monochrome Style (6 cols) */}
        <div className="lg:col-span-6 ref-card p-7 md:p-8">
          {/* Dual corner halos */}
          <div className="absolute -top-12 -left-12 size-52 rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.03] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-14 -right-14 size-64 rounded-full bg-[#4288BC]/[0.04] dark:bg-white/[0.02] blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header with Beveled Bot Icon */}
            <div className="flex items-center justify-between pb-5 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="ref-beveled-icon size-11 flex items-center justify-center text-slate-900 dark:text-white shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">LangGraph Runtime Dispatcher</h4>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-slate-900 dark:bg-white shadow-sm dark:shadow-[0_0_8px_#ffffff] animate-pulse" />
                    State Graph: GraphExecutionState.ACTIVE
                  </p>
                </div>
              </div>
              <span className="ref-connect-btn">
                Sync Nodes
              </span>
            </div>

            {/* Stepper Pipeline in Beveled Subcards */}
            <div className="mt-6 space-y-3">
              {[
                { step: "01", name: "Router Node", task: "Classifying query intent & vector payloads", status: "Complete", latency: "140ms" },
                { step: "02", name: "PDF RAG Agent", task: "Retrieving top-k dense embeddings from Qdrant", status: "Complete", latency: "210ms" },
                { step: "03", name: "Search Swarm", task: "Cross-referencing live sources via Tavily API", status: "Complete", latency: "320ms" },
                { step: "04", name: "Code Synthesizer", task: "Generating validated FastAPI backend endpoints", status: "Executing", latency: "Active" },
                { step: "05", name: "S3 Pipeline", task: "Streaming binary assets & generating signed URL", status: "Standby", latency: "Pending" },
              ].map((node, idx) => (
                <div 
                  key={idx} 
                  className={`ref-beveled-subcard flex items-center justify-between gap-3 p-3 text-xs transition-all ${
                    node.status === "Executing"
                      ? "border-black/30 dark:border-white/40 bg-black/[0.05] dark:bg-white/[0.06] shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      : "hover:border-black/15 dark:hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded-lg bg-black/[0.05] dark:bg-white/[0.06] font-mono text-[10px] font-bold text-slate-900 dark:text-white border border-black/10 dark:border-white/10 shadow-sm">
                      {node.step}
                    </div>
                    <div>
                      <span className="text-slate-900 dark:text-white font-semibold">{node.name}</span>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate max-w-[190px] sm:max-w-xs">{node.task}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline font-mono text-[10px] text-slate-500 dark:text-zinc-400">{node.latency}</span>
                    <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                      node.status === "Complete" ? "bg-black/[0.06] dark:bg-white/[0.08] text-slate-800 dark:text-white border border-black/10 dark:border-white/20 shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.1)]" :
                      node.status === "Executing" ? "bg-black dark:bg-white text-white dark:text-black font-bold border border-black dark:border-white shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse" :
                      "bg-black/[0.03] dark:bg-white/[0.02] text-slate-500 dark:text-zinc-400 border border-black/5 dark:border-white/5"
                    }`}>
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Infrastructure Specs Footer */}
            <div className="mt-6 pt-5 border-t border-black/[0.08] dark:border-white/[0.08] grid grid-cols-3 gap-2.5 text-center text-[10px] font-mono text-slate-700 dark:text-zinc-300">
              <div className="ref-beveled-subcard p-2.5">
                <span className="text-slate-500 dark:text-zinc-400 block font-semibold">DB</span>
                <strong className="text-slate-900 dark:text-white">PostgreSQL 15</strong>
              </div>
              <div className="ref-beveled-subcard p-2.5">
                <span className="text-slate-500 dark:text-zinc-400 block font-semibold">Cache</span>
                <strong className="text-slate-900 dark:text-white">Redis Alpine</strong>
              </div>
              <div className="ref-beveled-subcard p-2.5">
                <span className="text-slate-500 dark:text-zinc-400 block font-semibold">Vector</span>
                <strong className="text-slate-900 dark:text-white">Qdrant Cloud</strong>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="mt-5 pt-3">
              <button
                type="button"
                className="ref-primary-btn hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold flex items-center justify-center gap-2"
              >
                <span>Save Dispatcher Configurations</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
