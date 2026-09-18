import React from "react";
import { ArrowUpRight } from "lucide-react";
import { agentsList, promptSuggestions } from "../../data/agentsData";

export default function ChatWelcome({ setSelectedAgent, handleSendMessage }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full max-w-2xl mx-auto px-4 py-12 text-center">
      
      {/* Floating Glowing 3D Glass Orb */}
      <div className="relative mb-5 flex items-center justify-center">
        {/* Atmospheric purple radial glow aura */}
        <div className="absolute size-28 rounded-full bg-purple-600/30 blur-2xl animate-pulse pointer-events-none" />
        <div className="absolute size-20 rounded-full bg-fuchsia-500/25 blur-xl pointer-events-none" />
        
        {/* 3D Cosmic Orb */}
        <div
          className="relative size-14 sm:size-16 rounded-full cursor-pointer transition-transform duration-500 hover:scale-105 animate-float-orb"
          style={{
            background: "radial-gradient(circle at 38% 32%, #ffffff 0%, #f0abfc 18%, #a855f7 52%, #581c87 82%, #1e0938 100%)",
            boxShadow: "0 0 35px 8px rgba(168, 85, 247, 0.55), 0 0 70px 18px rgba(217, 70, 239, 0.3), inset -5px -5px 12px rgba(0, 0, 0, 0.8), inset 3px 3px 8px rgba(255, 255, 255, 0.7)",
          }}
        />
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-2 text-center drop-shadow-[0_2px_15px_rgba(168,85,247,0.25)]">
        Ready to Create Something New?
      </h1>

      <p className="text-xs text-purple-200/70 max-w-sm mb-7 leading-relaxed font-normal text-center">
        Select an agent mode or pick a prompt suggestion to begin.
      </p>


      {/* Prompt Suggestion Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
        {promptSuggestions.map((s, i) => {
          const Icon = s.icon;
          return (
            <button
              key={i}
              onClick={() => {
                setSelectedAgent(s.agentId);
                handleSendMessage(s.label);
              }}
              className="group flex items-center justify-between rounded-xl border border-purple-500/20 bg-[#161228]/80 hover:bg-[#201936] p-3 text-left shadow-[0_0_15px_-4px_rgba(168,85,247,0.2)] hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-sm transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon size={15} className="text-purple-400 group-hover:text-purple-300 shrink-0 transition-colors" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-100 group-hover:text-purple-200 transition-colors truncate">
                    {s.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
              <ArrowUpRight size={13} className="text-slate-400 group-hover:text-purple-300 transition-colors shrink-0" />
            </button>
          );
        })}
      </div>


    </div>
  );
}
