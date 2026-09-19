import React from "react";
import { Sparkles, CheckIcon, Zap } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { pricingData } from "../data/pricingData";

export default function Pricing() {
  const { user, setIsAuthModalOpen } = useAuthContext();
  const navigate = useNavigate();

  const handleCtaClick = (plan) => {
    if (user) {
      navigate("/dashboard");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <section id="pricing" className="scroll-mt-24 py-24 px-6 max-w-7xl mx-auto relative z-20">
      
        {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.05] text-slate-700 dark:text-zinc-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Zap size={13} className="text-slate-600 dark:text-zinc-300" />
          <span>Flexible Token Quotas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Transparent, <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">Credit-Based Plans</span>
        </h2>
        <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
          Start for free with 100 bonus credits on sign-up. Scale compute capacity seamlessly as your autonomous agent requirements expand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className={`ref-card flex flex-col justify-between p-8 cursor-pointer ${
              plan.mostPopular
                ? "border-black/30 dark:border-white/40 shadow-lg dark:shadow-[0_0_40px_rgba(255,255,255,0.1),inset_0_1.5px_2px_rgba(255,255,255,0.25)] scale-[1.02] z-10"
                : ""
            }`}
          >
            {/* Dual Ambient Corner Halos */}
            <div className="absolute -top-12 -left-12 size-48 rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.03] blur-3xl pointer-events-none" />
            <div className={`absolute -bottom-14 -right-14 size-56 rounded-full blur-3xl pointer-events-none ${
              plan.mostPopular ? "bg-[#4288BC]/[0.08] dark:bg-white/[0.04]" : "bg-[#4288BC]/[0.03] dark:bg-white/[0.02]"
            }`} />

            <div className="relative z-10">
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {plan.title}
                </span>
                {plan.mostPopular ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <Sparkles size={11} className="text-white dark:text-black animate-pulse" />
                    <span>Most Popular</span>
                  </span>
                ) : (
                  <span className="ref-connect-btn !py-0.5 !px-2.5 !text-[10px]">
                    Tier
                  </span>
                )}
              </div>

              {/* Pricing Number */}
              <div className="flex items-baseline gap-1.5 my-4">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]">
                  ${plan.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">/ month</span>
              </div>

              {/* Credits Pill */}
              <div className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-slate-700 dark:text-zinc-200">
                {plan.credits}
              </div>

              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed min-h-[36px]">
                {plan.description}
              </p>

              {/* Feature List */}
              <div className="space-y-2.5 mt-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="ref-beveled-subcard p-2.5 flex items-center justify-between gap-3 text-xs text-slate-700 dark:text-zinc-300 font-medium">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex size-4 items-center justify-center rounded-full bg-black/[0.08] dark:bg-white/[0.1] text-slate-900 dark:text-white shrink-0 shadow-sm dark:shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                        <CheckIcon size={11} />
                      </div>
                      <span className="truncate">{feature.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 dark:text-zinc-400">Included</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="relative z-10 mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              {plan.mostPopular ? (
                <button
                  onClick={() => handleCtaClick(plan)}
                  className="ref-primary-btn hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold"
                >
                  {plan.buttonText}
                </button>
              ) : (
                <button
                  onClick={() => handleCtaClick(plan)}
                  className="ref-connect-btn !w-full !py-3.5 !text-xs !font-bold"
                >
                  {plan.buttonText}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}