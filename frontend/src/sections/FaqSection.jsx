import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqsData } from "../data/faqsData";

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24 px-6 max-w-4xl mx-auto relative z-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.05] text-slate-700 dark:text-zinc-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <HelpCircle size={13} className="text-slate-600 dark:text-zinc-300" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything You <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">Need to Know</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
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
                  ? "border-black/25 dark:border-white/30 shadow-md dark:shadow-[0_0_30px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  : "hover:border-black/15 dark:hover:border-white/20"
              }`}
            >
              {/* Corner spotlight for active item */}
              {isOpen && (
                <>
                  <div className="absolute -top-6 -left-6 size-36 rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.03] blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-8 -right-8 size-44 rounded-full bg-[#4288BC]/[0.04] dark:bg-white/[0.02] blur-2xl pointer-events-none" />
                </>
              )}

              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="relative z-10 flex w-full items-center justify-between p-5 md:p-6 text-left cursor-pointer"
              >
                <h3 className={`text-sm font-semibold tracking-tight transition-colors pr-4 ${
                  isOpen ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-zinc-200"
                }`}>
                  {faq.question}
                </h3>
                <div className="size-8 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-slate-900 dark:text-white" : "text-slate-500 dark:text-zinc-400"
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="relative z-10 px-6 pb-6 pt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-zinc-300 border-t border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.015] backdrop-blur-md font-normal">
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