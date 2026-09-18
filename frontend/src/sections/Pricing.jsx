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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          <Zap size={13} className="text-amber-400" />
          <span>Flexible Token Quotas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Transparent, <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.35)]">Credit-Based Plans</span>
        </h2>
        <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
          Start for free with 100 bonus credits on sign-up. Scale compute capacity seamlessly as your autonomous agent requirements expand.
        </p>
      </div>

      {/* Ambient Cosmic Lights passing directly behind transparent pricing cards */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[150px]" />
        <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] rounded-full bg-blue-600/15 blur-[160px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className={`ref-card flex flex-col justify-between p-8 cursor-pointer ${
              plan.mostPopular
                ? "border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.35)] scale-[1.02] z-10"
                : ""
            }`}
          >
            {/* Dual Ambient Corner Halos matching Reference Image */}
            <div className="absolute -top-12 -left-12 size-48 rounded-full bg-gradient-to-br from-rose-500/35 via-pink-500/20 to-transparent blur-3xl pointer-events-none" />
            <div className={`absolute -bottom-14 -right-14 size-56 rounded-full blur-3xl pointer-events-none ${
              plan.mostPopular ? "bg-gradient-to-tl from-purple-600/55 via-violet-600/35 to-transparent" : "bg-gradient-to-tl from-purple-600/40 via-violet-600/25 to-transparent"
            }`} />

            <div className="relative z-10">
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className={`text-base font-extrabold tracking-tight ${plan.mostPopular ? "text-pink-200 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "text-white"}`}>
                  {plan.title}
                </span>
                {plan.mostPopular ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/50 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                    <Sparkles size={11} className="text-pink-300 animate-pulse" />
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
                <span className="text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]">
                  ${plan.price}
                </span>
                <span className="text-xs text-slate-400 font-mono">/ month</span>
              </div>

              {/* Credits Pill */}
              <div className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 bg-white/[0.04] border border-white/[0.09] text-pink-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                {plan.credits}
              </div>

              <p className="text-xs text-slate-300/80 leading-relaxed min-h-[36px]">
                {plan.description}
              </p>

              {/* Feature List */}
              <div className="space-y-2.5 mt-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="ref-beveled-subcard p-2.5 flex items-center justify-between gap-3 text-xs text-slate-300 font-medium">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex size-4 items-center justify-center rounded-full bg-pink-500/20 text-pink-300 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                        <CheckIcon size={11} />
                      </div>
                      <span className="truncate">{feature.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-purple-300/70">Included</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button: High contrast white button for Most Popular, sleek connect button for others */}
            <div className="relative z-10 mt-8 pt-4 border-t border-white/[0.06]">
              {plan.mostPopular ? (
                <button
                  onClick={() => handleCtaClick(plan)}
                  className="ref-primary-btn"
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