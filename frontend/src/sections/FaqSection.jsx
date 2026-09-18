import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqsData } from "../data/faqsData";

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24 px-6 max-w-4xl mx-auto relative z-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
          <HelpCircle size={13} className="text-cyan-400" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything You <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">Need to Know</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          Detailed answers on our LangGraph orchestration, vector RAG pipelines, quota security, and deployment models.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {faqsData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`ref-card transition-all duration-300 ${
                isOpen
                  ? "border-cyan-400/50 shadow-[0_0_35px_rgba(6,182,212,0.2),inset_0_1px_1px_rgba(255,255,255,0.18)]"
                  : "hover:border-white/20"
              }`}
            >
              {/* Corner spotlight for active item */}
              {isOpen && (
                <>
                  <div className="absolute -top-6 -left-6 size-36 rounded-full bg-gradient-to-br from-rose-500/35 via-pink-500/20 to-transparent blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-8 -right-8 size-44 rounded-full bg-gradient-to-tl from-purple-600/45 via-violet-600/25 to-transparent blur-2xl pointer-events-none" />
                </>
              )}

              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="relative z-10 flex w-full items-center justify-between p-5 md:p-6 text-left cursor-pointer"
              >
                <h3 className={`text-sm font-semibold tracking-tight transition-colors pr-4 ${
                  isOpen ? "text-pink-200 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "text-white"
                }`}>
                  {faq.question}
                </h3>
                <div className="size-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-pink-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" : "text-slate-400"
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="relative z-10 px-6 pb-6 pt-3 text-xs sm:text-sm leading-relaxed text-slate-300 border-t border-white/[0.06] bg-white/[0.015] backdrop-blur-md font-normal">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};