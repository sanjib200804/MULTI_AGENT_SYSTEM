import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { faqsData } from "../data/faqsData";

export const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
            <SectionTitle 
                text1="FAQ" 
                text2="Frequently Asked Questions" 
                text3="Everything you need to know about deploying and managing your Agentra AI workforce." 
            />

            <div className="mt-12 space-y-3">
                {faqsData.map((faq, index) => {
                    const isOpen = openIndex === index;
                    
                    return (
                        <div 
                            key={index}
                            className={`rounded-xl border transition-all duration-200 ${
                                isOpen 
                                ? "bg-white dark:bg-[#121215] border-purple-500/40 shadow-sm" 
                                : "bg-white/60 dark:bg-[#121215]/50 border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-slate-700"
                            }`}
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
                            >
                                <h3 className={`text-sm font-semibold transition-colors ${
                                    isOpen ? "text-purple-600 dark:text-purple-400" : "text-slate-900 dark:text-slate-100"
                                }`}>
                                    {faq.question}
                                </h3>
                                <ChevronDown 
                                    size={16} 
                                    className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                                        isOpen ? "rotate-180 text-purple-500" : ""
                                    }`} 
                                />
                            </button>

                            {isOpen && (
                                <div className="px-4 pb-4 pt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-white/[0.05] mt-1 font-normal">
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