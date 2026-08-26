import React, { useEffect, useRef } from "react";
import { X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { pricingData } from "../data/pricingData";
import { useNavigate } from "react-router-dom";

export default function PricingModal() {
    const { isPricingModalOpen, setIsPricingModalOpen, user, setIsAuthModalOpen } = useAuthContext();
    const modalRef = useRef(null);
    const navigate = useNavigate();

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsPricingModalOpen(false);
            }
        };

        if (isPricingModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isPricingModalOpen, setIsPricingModalOpen]);

    if (!isPricingModalOpen) return null;

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsPricingModalOpen(false);
        }
    };

    const handleCtaClick = () => {
        setIsPricingModalOpen(false);
        if (user) {
            navigate("/dashboard");
        } else {
            setIsAuthModalOpen(true);
        }
    };

    return (
        <AnimatePresence>
            {isPricingModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
                    onClick={handleBackdropClick}
                    role="dialog"
                    aria-modal="true"
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c0f] p-6 sm:p-8 shadow-2xl my-8 text-slate-900 dark:text-slate-100"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsPricingModalOpen(false)}
                            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
                            aria-label="Close pricing modal"
                        >
                            <X size={20} />
                        </button>

                        {/* Modal Header */}
                        <div className="text-center max-w-2xl mx-auto mb-8 pt-2">
                            <span className="text-[11px] font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded border border-purple-500/20 mb-2 inline-block">
                                PRICING PLANS
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                Flexible Plans for Every Workflow
                            </h2>
                            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
                                Choose the plan that best fits your development team or automated swarm workload.
                            </p>
                        </div>

                        {/* Pricing Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {pricingData.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 ${
                                        plan.mostPopular
                                            ? "bg-slate-900 text-white border-purple-500/50 shadow-lg dark:bg-[#121217]"
                                            : "bg-white dark:bg-[#121215] border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-100"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-sm font-bold ${plan.mostPopular ? "text-purple-400" : "text-slate-900 dark:text-white"}`}>
                                                {plan.title}
                                            </span>
                                            {plan.mostPopular && (
                                                <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                                    <Sparkles size={10} />
                                                    <span>Popular</span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-1 my-2">
                                            <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${plan.mostPopular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                                                ${plan.price}
                                            </span>
                                            <span className={`text-xs ${plan.mostPopular ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
                                                /month
                                            </span>
                                        </div>

                                        <hr className={`my-4 ${plan.mostPopular ? "border-white/10" : "border-slate-200 dark:border-white/[0.06]"}`} />

                                        <div className="space-y-2.5">
                                            {plan.features.map((feature, idx) => (
                                                <div key={idx} className={`flex items-center gap-2 text-xs font-medium ${plan.mostPopular ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}`}>
                                                    <feature.icon size={14} className="text-purple-500 shrink-0" />
                                                    <span>{feature.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCtaClick}
                                        className={`mt-6 w-full py-2.5 rounded-xl font-semibold text-xs transition cursor-pointer shadow-sm ${
                                            plan.mostPopular
                                                ? "bg-purple-600 hover:bg-purple-500 text-white"
                                                : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                                        }`}
                                    >
                                        {user ? "Go to Dashboard" : "Get Started"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
