import React from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { agentraAgents } from "../../data/agentraAgents";

export default function AgentEcosystem({ onCtaClick }) {
  return (
    <section id="agents" className="scroll-mt-24 py-24 px-6 max-w-7xl mx-auto relative z-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.05] text-slate-700 dark:text-zinc-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Sparkles size={13} className="text-slate-600 dark:text-zinc-300" />
          <span>Specialized Swarm Nodes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          9 Autonomous AI Agents. <br />
          <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
            One Unified Intelligence.
          </span>
        </h2>
        <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
          Stop struggling with generic one-size-fits-all prompts. Agentra delegates every task to a dedicated specialist trained for specific tools, data models, and artifacts.
        </p>
      </div>

      {/* Grid of 9 Agents with Monochrome Glass Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {agentraAgents.map((agent) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.id}
              onClick={onCtaClick}
              className="ref-card group p-7 md:p-8 flex flex-col justify-between cursor-pointer"
            >
              {/* Subtle Corner Halos */}
              <div className="absolute -top-12 -left-12 size-48 rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.03] blur-3xl pointer-events-none group-hover:bg-[#4288BC]/[0.1] dark:group-hover:bg-white/[0.06] transition-all duration-500" />
              <div className="absolute -bottom-14 -right-14 size-56 rounded-full bg-[#4288BC]/[0.04] dark:bg-white/[0.02] blur-3xl pointer-events-none group-hover:bg-[#4288BC]/[0.08] dark:group-hover:bg-white/[0.05] transition-all duration-500" />

              <div className="relative z-10">
                {/* Top Header: Squircle Icon Box, Agent Title & Connect Pill Button */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3.5">
                    {/* Squircle Icon Box */}
                    <div className="ref-beveled-icon size-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 text-slate-800 dark:text-zinc-200">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">
                        {agent.title}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block">
                        agentra //{agent.id}
                      </span>
                    </div>
                  </div>

                  {/* Connect Action Pill Button */}
                  <span className="ref-connect-btn">
                    Connect
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-300 font-normal mb-5">
                  {agent.description}
                </p>

                {/* Capabilities */}
                <div className="space-y-2">
                  {agent.capabilities.map((cap, i) => (
                    <div 
                      key={i} 
                      className="ref-beveled-subcard px-3.5 py-2 text-xs text-slate-700 dark:text-zinc-300 font-medium flex items-center justify-between gap-2.5 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 size={13} className="text-slate-900 dark:text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.05] text-slate-700 dark:text-zinc-300 border border-black/10 dark:border-white/10 shrink-0">
                        v2.4
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="relative z-10 mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                <button
                  type="button"
                  className="ref-primary-btn group-hover:bg-slate-800 dark:group-hover:bg-zinc-200 flex items-center justify-center gap-2"
                >
                  <span>Deploy {agent.title.split(" ")[0]}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="text-center mt-2.5 text-[11px] text-slate-500 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-zinc-200 transition-colors font-mono">
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
