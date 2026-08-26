import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionTitle from "../SectionTitle";
import { agentraAgents } from "../../data/agentraAgents";

export default function AgentEcosystem({ onCtaClick }) {
  const agentCapabilities = {
    "PDF RAG Agent": ["Multi-page RAG Search", "Table & Graph Extraction", "Instant Citation Memory"],
    "Image Agent": ["Photorealistic Renders", "Visual Detail Extraction", "OCR & Image Prompting"],
    "Web Builder Agent": ["Clean HTML & Tailwind Code", "Live Interactive UI Layouts", "Responsive Components"],
    "Search Agent": ["Real-time Web Browsing", "Fact Verification Swarm", "Synthesized Source Links"],
    "Coding Master Agent": ["Full-Stack Code Generation", "20+ Programming Languages", "Automated Syntax Inspection"],
    "PPT Deck Agent": ["Structured Topic Decks", "Slide Deck Outline", "Visual Theme Layouts"],
  };

  return (
    <section id="features" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle
        text1="ECOSYSTEM"
        text2="Specialized AI Agents Built For Action"
        text3="Stop struggling with generic prompt windows. Agentra routes every query to a dedicated domain expert."
      />

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agentraAgents.map((agent, index) => {
          const Icon = agent.icon;
          const caps = agentCapabilities[agent.title] || [];
          return (
            <div
              key={index}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121215] p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition cursor-pointer"
              onClick={onCtaClick}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${agent.bg} border`}>
                    <Icon className={agent.color} size={20} />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2.5 py-0.5 rounded border border-slate-200/60 dark:border-white/[0.05]">
                    {agent.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {agent.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
                  {agent.description}
                </p>

                {/* Capabilities List */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/[0.05]">
                  {caps.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                      <CheckCircle2 size={13} className="text-purple-500 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                <span>Launch Agent</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
