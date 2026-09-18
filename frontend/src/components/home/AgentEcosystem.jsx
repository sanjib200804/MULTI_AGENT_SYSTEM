import React from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { agentraAgents } from "../../data/agentraAgents";

const agentGlowMap = {
  router: {
    borderHover: "hover:border-blue-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]",
    glowBg: "bg-blue-500/15 group-hover:bg-blue-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]",
    tagGlow: "border-blue-500/30 text-blue-300 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
    linkText: "text-blue-400 group-hover:text-blue-300",
  },
  coding: {
    borderHover: "hover:border-amber-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]",
    glowBg: "bg-amber-500/15 group-hover:bg-amber-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]",
    tagGlow: "border-amber-500/30 text-amber-300 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
    linkText: "text-amber-400 group-hover:text-amber-300",
  },
  web_builder: {
    borderHover: "hover:border-cyan-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(6,182,212,0.35)]",
    glowBg: "bg-cyan-500/15 group-hover:bg-cyan-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]",
    tagGlow: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]",
    linkText: "text-cyan-400 group-hover:text-cyan-300",
  },
  pdf_rag: {
    borderHover: "hover:border-indigo-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(99,102,241,0.35)]",
    glowBg: "bg-indigo-500/15 group-hover:bg-indigo-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(99,102,241,0.7)]",
    tagGlow: "border-indigo-500/30 text-indigo-300 bg-indigo-500/10 shadow-[0_0_10px_rgba(99,102,241,0.2)]",
    linkText: "text-indigo-400 group-hover:text-indigo-300",
  },
  pdf_gen: {
    borderHover: "hover:border-rose-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(244,63,94,0.35)]",
    glowBg: "bg-rose-500/15 group-hover:bg-rose-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]",
    tagGlow: "border-rose-500/30 text-rose-300 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.2)]",
    linkText: "text-rose-400 group-hover:text-rose-300",
  },
  ppt_gen: {
    borderHover: "hover:border-violet-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]",
    glowBg: "bg-violet-500/15 group-hover:bg-violet-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]",
    tagGlow: "border-violet-500/30 text-violet-300 bg-violet-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    linkText: "text-violet-400 group-hover:text-violet-300",
  },
  search: {
    borderHover: "hover:border-emerald-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]",
    glowBg: "bg-emerald-500/15 group-hover:bg-emerald-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]",
    tagGlow: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
    linkText: "text-emerald-400 group-hover:text-emerald-300",
  },
  vision: {
    borderHover: "hover:border-sky-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]",
    glowBg: "bg-sky-500/15 group-hover:bg-sky-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]",
    tagGlow: "border-sky-500/30 text-sky-300 bg-sky-500/10 shadow-[0_0_10px_rgba(56,189,248,0.2)]",
    linkText: "text-sky-400 group-hover:text-sky-300",
  },
  image_analyzer: {
    borderHover: "hover:border-teal-400/70",
    shadowHover: "hover:shadow-[0_0_35px_rgba(20,184,166,0.35)]",
    glowBg: "bg-teal-500/15 group-hover:bg-teal-500/30",
    iconGlow: "drop-shadow-[0_0_12px_rgba(20,184,166,0.7)]",
    tagGlow: "border-teal-500/30 text-teal-300 bg-teal-500/10 shadow-[0_0_10px_rgba(20,184,166,0.2)]",
    linkText: "text-teal-400 group-hover:text-teal-300",
  },
};

export default function AgentEcosystem({ onCtaClick }) {
  return (
    <section id="agents" className="scroll-mt-24 py-24 px-6 max-w-7xl mx-auto relative z-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(59,130,246,0.35)]">
          <Sparkles size={13} className="text-cyan-400" />
          <span>Specialized Swarm Nodes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          9 Autonomous AI Agents. <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
            One Unified Intelligence.
          </span>
        </h2>
        <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
          Stop struggling with generic one-size-fits-all prompts. Agentra delegates every task to a dedicated specialist trained for specific tools, data models, and artifacts.
        </p>
      </div>

      {/* Ambient Cosmic Lights passing directly behind transparent cards */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-24 w-[550px] h-[550px] rounded-full bg-cyan-500/15 blur-[150px]" />
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[160px]" />
        <div className="absolute bottom-10 -right-20 w-[550px] h-[550px] rounded-full bg-purple-600/15 blur-[150px]" />
      </div>

      {/* Grid of 9 Agents with Reference Design Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {agentraAgents.map((agent) => {
          const Icon = agent.icon;
          const glow = agentGlowMap[agent.id] || agentGlowMap.router;
          return (
            <div
              key={agent.id}
              onClick={onCtaClick}
              className="ref-card group p-7 md:p-8 flex flex-col justify-between cursor-pointer"
            >
              {/* Dual Ambient Corner Halos (Hot Pink / Rose top-left, Electric Violet / Purple bottom-right) */}
              <div className="absolute -top-12 -left-12 size-48 rounded-full bg-gradient-to-br from-rose-500/35 via-pink-500/20 to-transparent blur-3xl pointer-events-none group-hover:from-rose-500/55 transition-all duration-500" />
              <div className="absolute -bottom-14 -right-14 size-56 rounded-full bg-gradient-to-tl from-purple-600/45 via-violet-600/30 to-transparent blur-3xl pointer-events-none group-hover:from-purple-500/65 transition-all duration-500" />

              <div className="relative z-10">
                {/* Top Header: Squircle Icon Box, Agent Title & Connect Pill Button */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3.5">
                    {/* Squircle Icon Box matching reference image */}
                    <div className="ref-beveled-icon size-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                      <Icon className={agent.color} size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight group-hover:text-pink-100 transition-colors">
                        {agent.title}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        agentra //{agent.id}
                      </span>
                    </div>
                  </div>

                  {/* Connect Action Pill Button (Exact match from reference image) */}
                  <span className="ref-connect-btn">
                    Connect
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-slate-300/80 font-normal mb-5">
                  {agent.description}
                </p>

                {/* Capabilities (Sleek rows matching reference design list) */}
                <div className="space-y-2">
                  {agent.capabilities.map((cap, i) => (
                    <div 
                      key={i} 
                      className="ref-beveled-subcard px-3.5 py-2 text-xs text-slate-300 font-medium flex items-center justify-between gap-2.5 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 size={13} className="text-pink-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.7)] shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.04] text-purple-300 border border-white/[0.06] shrink-0">
                        v2.4
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Button (White pill button from reference image) & Sub-action */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  className="ref-primary-btn group-hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <span>Deploy {agent.title.split(" ")[0]}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="text-center mt-2.5 text-[11px] text-slate-400 group-hover:text-purple-300/80 transition-colors font-mono">
                  Autonomous Swarm Ready
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
