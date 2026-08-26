import React from "react";
import { ArrowUpRight } from "lucide-react";
import { promptSuggestions } from "../../data/agentsData";

export default function ChatWelcome({ setSelectedAgent, handleSendMessage }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1.5">
        What will you build today?
      </h1>

      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-7 leading-relaxed font-normal">
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
              className="group flex items-center justify-between rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121215] p-3 text-left shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon size={15} className="text-slate-500 dark:text-slate-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                    {s.label}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
              <ArrowUpRight size={13} className="text-slate-400 group-hover:text-purple-500 transition-colors shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
