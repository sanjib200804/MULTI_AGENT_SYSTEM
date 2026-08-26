import { Sparkles } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { pricingData } from "../data/pricingData";

export default function Pricing() {
    const { user, setIsAuthModalOpen } = useAuthContext();
    const navigate = useNavigate();

    const handleCtaClick = () => {
        if (user) {
            navigate("/dashboard");
        } else {
            setIsAuthModalOpen(true);
        }
    };

    return (
        <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
            <SectionTitle
                text1="PRICING"
                text2="Transparent Pricing Plans"
                text3="Flexible options designed for developers and teams scaling autonomous agent workflows."
            />

            <div className="flex flex-wrap items-stretch justify-center gap-6 mt-14">
                {pricingData.map((plan, index) => (
                    <div
                        key={index}
                        className={`flex flex-col justify-between p-6 rounded-2xl w-full max-w-sm border transition-all duration-200 ${
                            plan.mostPopular
                                ? "bg-slate-900 text-white border-purple-500/50 shadow-xl shadow-purple-500/10 dark:bg-[#121217]"
                                : "bg-white dark:bg-[#121215] border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-100"
                        }`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-sm font-bold ${plan.mostPopular ? "text-purple-400" : "text-slate-900 dark:text-white"}`}>
                                    {plan.title}
                                </span>
                                {plan.mostPopular && (
                                    <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                        <Sparkles size={11} />
                                        <span>Popular</span>
                                    </span>
                                )}
                            </div>

                            <div className="flex items-baseline gap-1 my-3">
                                <span className="text-3xl font-extrabold tracking-tight">${plan.price}</span>
                                <span className="text-xs text-slate-400">/month</span>
                            </div>

                            <hr className={`my-5 ${plan.mostPopular ? "border-white/10" : "border-slate-100 dark:border-white/[0.06]"}`} />

                            <div className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                                        <feature.icon size={15} className="text-purple-500 shrink-0" />
                                        <span>{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleCtaClick}
                            className={`mt-8 w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                plan.mostPopular
                                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/25"
                                    : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                            }`}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}