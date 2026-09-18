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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
          <Layers size={13} className="text-cyan-400" />
          <span>Under the Hood</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Engineered for <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">Enterprise Workloads</span>
        </h2>
        <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
          Agentra replaces slow, fragile monolithic AI scripts with an industrial-grade microservice architecture coordinated by stateful LangGraph pipelines.
        </p>
      </div>

      {/* Ambient Cosmic Lights passing directly behind transparent cards */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-blue-600/15 blur-[160px]" />
        <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[150px]" />
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-12 relative">
        
        {/* Left Side: Core Architectural Pillars with Reference Card Style (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {archHighlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div 
                key={i} 
                className="ref-card group p-5 sm:p-6 flex gap-4 transition-all duration-300 cursor-pointer"
              >
                {/* Dual Corner Halos (Hot Pink top-left, Electric Violet bottom-right) */}
                <div className="absolute -top-10 -left-10 size-36 rounded-full bg-gradient-to-br from-rose-500/30 via-pink-500/15 to-transparent blur-2xl pointer-events-none group-hover:from-rose-500/50 transition-all" />
                <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-gradient-to-tl from-purple-600/35 via-violet-600/20 to-transparent blur-2xl pointer-events-none group-hover:from-purple-500/55 transition-all" />

                <div className="relative z-10 flex size-11 shrink-0 items-center justify-center ref-beveled-icon text-pink-300 group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>

                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-white group-hover:text-pink-100 transition-colors">{item.title}</h3>
                    <span className="ref-connect-btn !py-0.5 !px-2.5 !text-[10px]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300/80 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Visualizer Master Card in Reference Style (6 cols) */}
        <div className="lg:col-span-6 ref-card p-7 md:p-8">
          {/* Dual corner halos matching reference card */}
          <div className="absolute -top-12 -left-12 size-52 rounded-full bg-gradient-to-br from-rose-500/35 via-pink-500/20 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-14 -right-14 size-64 rounded-full bg-gradient-to-tl from-purple-600/45 via-violet-600/25 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header with Beveled Bot Icon */}
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="ref-beveled-icon size-11 flex items-center justify-center text-pink-300 shadow-[0_0_15px_rgba(244,63,94,0.35)]">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white tracking-tight">LangGraph Runtime Dispatcher</h4>
                  <p className="text-[10px] text-pink-300 font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_#f43f5e] animate-pulse" />
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
                      ? "border-pink-500/50 bg-pink-500/[0.08] shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                      : "hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded-lg bg-white/[0.04] font-mono text-[10px] font-bold text-pink-300 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                      {node.step}
                    </div>
                    <div>
                      <span className="text-white font-semibold">{node.name}</span>
                      <p className="text-[11px] text-slate-400 truncate max-w-[190px] sm:max-w-xs">{node.task}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline font-mono text-[10px] text-slate-400">{node.latency}</span>
                    <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                      node.status === "Complete" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]" :
                      node.status === "Executing" ? "bg-pink-500/20 text-pink-200 border border-pink-400/60 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse" :
                      "bg-white/[0.02] text-slate-400 border border-white/5"
                    }`}>
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Infrastructure Specs Footer */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-3 gap-2.5 text-center text-[10px] font-mono text-slate-300">
              <div className="ref-beveled-subcard p-2.5">
                <span className="text-pink-400 block font-semibold">DB</span>
                <strong className="text-white">PostgreSQL 15</strong>
              </div>
              <div className="ref-beveled-subcard p-2.5">
                <span className="text-purple-400 block font-semibold">Cache</span>
                <strong className="text-white">Redis Alpine</strong>
              </div>
              <div className="ref-beveled-subcard p-2.5">
                <span className="text-violet-400 block font-semibold">Vector</span>
                <strong className="text-white">Qdrant Cloud</strong>
              </div>
            </div>

            {/* Reference Design Primary Button */}
            <div className="mt-5 pt-3">
              <button
                type="button"
                className="ref-primary-btn flex items-center justify-center gap-2"
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
