import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import SectionTitle from "../SectionTitle";
import { agentraAgents } from "../../data/agentraAgents";

export default function AgentEcosystem({ onCtaClick }) {
  // Feature highlights per agent
  const agentCapabilities = {
    "PDF RAG Agent": ["Multi-page RAG Search", "Table & Graph Extraction", "Instant Citation Memory"],
    "Image Agent": ["Photorealistic 4K Renders", "Visual Detail Extraction", "OCR & Image Prompting"],
    "Web Builder Agent": ["Clean HTML & Tailwind Code", "Live Interactive UI Layouts", "Responsive Components"],
    "Search Agent": ["Real-time Web Browsing", "Fact Verification Swarm", "Synthesized Source Links"],
    "Coding Master Agent": ["Full-Stack Code Generation", "20+ Programming Languages", "Automated Syntax Inspection"],
    "PPT Deck Agent": ["Structured Topic Decks", "Slide Deck Outline", "Visual Theme Layouts"],
  };

  return (
    <section id="features" className="scroll-mt-24 py-24 px-6 md:px-12 lg:px-16 relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-10 size-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          text1="AGENTRA ECOSYSTEM"
          text2="6 Specialized AI Agents Built For Action"
          text3="Stop struggling with generic prompt windows. Agentra routes every query to a dedicated domain expert."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentraAgents.map((agent, index) => {
            const Icon = agent.icon;
            const caps = agentCapabilities[agent.title] || [];
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-slate-900/60 p-7 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/40 transition-all cursor-pointer overflow-hidden"
                onClick={onCtaClick}
              >
                {/* Top Subtle Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/50 transition-all duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex size-12 items-center justify-center rounded-2xl ${agent.bg} border transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={agent.color} size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.05] px-3 py-1 rounded-full border border-slate-200/60 dark:border-white/[0.05]">
                      {agent.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {agent.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-normal">
                    {agent.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 dark:border-white/[0.05]">
                    {caps.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                        <CheckCircle2 size={13} className="text-purple-500 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 pt-4 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>Launch Agent</span>
                  </span>
                  <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
