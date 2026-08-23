import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import SectionTitle from "../components/SectionTitle";
import { faqsData } from "../data/faqsData";

export const FaqSection = () => {
    const { theme } = useThemeContext();
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="relative py-24 overflow-hidden">
            {/* Background Decorative Splash */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl opacity-50 pointer-events-none -z-10">
                <img 
                    src={theme === "dark" ? "/assets/color-splash.svg" : "/assets/color-splash-light.svg"} 
                    alt="" 
                    className="w-full h-auto blur-3xl"
                />
            </div>

            <div className="max-w-4xl mx-auto px-6">
                <SectionTitle 
                    text1="HAVE QUESTIONS?" 
                    text2="Frequently Asked Questions" 
                    text3="Everything you need to know about deploying and managing your Agentra AI workforce." 
                />

                <div className="mt-12 space-y-4">
                    {faqsData.map((faq, index) => {
                        const isOpen = openIndex === index;
                        
                        return (
                            <div 
                                key={index}
                                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                                    isOpen 
                                    ? "bg-white/50 dark:bg-slate-900/80 border-purple-500/50 shadow-lg shadow-purple-500/5" 
                                    : "bg-white/30 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                } backdrop-blur-md`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`hidden sm:flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                            isOpen 
                                            ? "bg-purple-600 border-purple-500 text-white" 
                                            : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 group-hover:text-purple-500"
                                        }`}>
                                            <HelpCircle size={16} />
                                        </div>
                                        <h3 className={`text-base font-semibold transition-colors ${
                                            isOpen ? "text-purple-600 dark:text-purple-400" : "text-slate-700 dark:text-slate-200"
                                        }`}>
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <ChevronDown 
                                        size={20} 
                                        className={`shrink-0 transition-transform duration-300 ${
                                            isOpen ? "rotate-180 text-purple-500" : "text-slate-400"
                                        }`} 
                                    />
                                </button>

                                {/* Animation Wrapper */}
                                <div 
                                    className={`transition-all duration-300 ease-in-out ${
                                        isOpen 
                                        ? "max-h-[500px] opacity-100 pb-6 px-6 sm:pl-[72px]" 
                                        : "max-h-0 opacity-0 pointer-events-none"
                                    }`}
                                >
                                    <div className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-2xl border-t border-slate-100 dark:border-slate-800 pt-4">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Support Link */}
                <p className="mt-12 text-center text-sm text-slate-500">
                    Can't find what you're looking for?{" "}
                    <a href="#" className="font-bold text-purple-600 hover:underline">
                        Contact our support team
                    </a>
                </p>
            </div>
        </section>
    );
};