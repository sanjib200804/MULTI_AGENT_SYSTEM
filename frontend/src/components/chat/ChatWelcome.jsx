import React from "react";
import { motion } from "framer-motion";
import { Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import { promptSuggestions } from "../../data/agentsData";

export default function ChatWelcome({ setSelectedAgent, handleSendMessage }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full max-w-3xl mx-auto px-4 py-12 text-center bg-grid-mesh">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-gradient-to-tr from-purple-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Cpu Icon Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-6 flex size-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 text-white shadow-2xl shadow-purple-500/30 ring-1 ring-white/20"
      >
        <Cpu size={32} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 dark:from-white dark:via-purple-200 dark:to-slate-300 bg-clip-text text-transparent mb-3"
      >
        What will you build today?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-9 leading-relaxed font-normal"
      >
        Powered by Agentra multi-agent intelligence — select an agent mode or pick a prompt suggestion below.
      </motion.p>

      {/* Prompt Suggestion Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full"
      >
        {promptSuggestions.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedAgent(s.agentId);
                handleSendMessage(s.label);
              }}
              className="group flex items-start justify-between rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 text-left shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {s.label}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
