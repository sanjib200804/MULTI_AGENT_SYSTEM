"use client";

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLenis } from "../components/LenisScroll";
import { useAuthContext } from "../context/AuthContext";
import HeroCosmic from "../components/home/HeroCosmic";
import AgentPlayground from "../components/home/AgentPlayground";
import AgentEcosystem from "../components/home/AgentEcosystem";
import WhyAgentra from "../components/home/WhyAgentra";
import Pricing from "../sections/Pricing";
import { FaqSection } from "../sections/FaqSection";
import CtaBanner from "../components/home/CtaBanner";
import FooterCosmic from "../components/home/FooterCosmic";

export default function Home() {
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

  const handleExploreClick = () => {
    const el = document.getElementById("platform");
    const lenis = getLenis();
    if (el) {
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;
    const lenis = getLenis();

    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          if (lenis) lenis.scrollTo(element, { offset: -80 });
          else element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else if (path === "/") {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const id = path.replace("/", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          if (lenis) lenis.scrollTo(element, { offset: -80 });
          else element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black bg-diamond-mesh text-slate-900 dark:text-zinc-100 font-sans selection:bg-[#4288BC]/30 selection:text-white overflow-x-hidden transition-colors duration-200">
      
      {/* Ambient Depth Halos for Light and Dark Modes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Top Ambient Light */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[#4288BC]/[0.08] dark:bg-white/[0.035] blur-[150px] animate-pulse-aura" />
        
        {/* Mid Subtle Glow */}
        <div className="absolute top-[40%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#4288BC]/[0.04] dark:bg-white/[0.02] blur-[160px]" />

        {/* Bottom Ambient Glow */}
        <div className="absolute bottom-10 right-[-10%] w-[900px] h-[700px] rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.025] blur-[160px]" />
      </div>

      {/* 1. Cosmic Hero Section (Clean High-Contrast Monochrome Masterpiece) */}
      <HeroCosmic 
        onCtaClick={handleCtaClick} 
        onExploreClick={handleExploreClick} 
      />

      {/* 2. Interactive Execution Engine Playground */}
      <AgentPlayground onCtaClick={handleCtaClick} />

      {/* 3. 9 Specialized Agent Ecosystem */}
      <AgentEcosystem onCtaClick={handleCtaClick} />

      {/* 4. Architecture & Why Agentra (LangGraph + Microservices) */}
      <WhyAgentra />

      {/* 5. Pricing Plans */}
      <Pricing />

      {/* 6. Frequently Asked Questions */}
      <FaqSection />

      {/* 7. Call To Action Banner */}
      <CtaBanner onCtaClick={handleCtaClick} />

      {/* 8. Cosmic Dark Footer */}
      <FooterCosmic />
    </div>
  );
}