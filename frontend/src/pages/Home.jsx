"use client";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLenis } from "../components/LenisScroll";
import { useAuthContext } from "../context/AuthContext";
import { FaqSection } from "../sections/FaqSection";
import Pricing from "../sections/Pricing";
import Hero from "../components/home/Hero";
import MarqueeSection from "../components/home/MarqueeSection";
import AgentEcosystem from "../components/home/AgentEcosystem";
import WhyAgentra from "../components/home/WhyAgentra";
import CtaBanner from "../components/home/CtaBanner";

export default function Page() {
  const { user, setIsAuthModalOpen } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  useEffect(() => {
    const path = location.pathname;
    const lenis = getLenis();
    if (path === "/") {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const id = path.replace("/", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          if (lenis) lenis.scrollTo(element, { offset: -96 });
          else element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-500/30">
      <Hero onCtaClick={handleCtaClick} />
      <MarqueeSection />
      <AgentEcosystem onCtaClick={handleCtaClick} />
      <WhyAgentra />

      {/* Pricing and FAQ */}
      <div id="pricing" className="mt-12 scroll-mt-24">
        <Pricing />
      </div>
      <FaqSection />

      <CtaBanner onCtaClick={handleCtaClick} />

      <div className="h-12" />
    </div>
  );
}