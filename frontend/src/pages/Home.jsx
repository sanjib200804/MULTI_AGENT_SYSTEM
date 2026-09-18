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
    <div className="relative min-h-screen bg-[#030208] bg-diamond-mesh text-slate-100 font-sans selection:bg-pink-500/30 selection:text-pink-200 overflow-x-hidden">
      
      {/* Radiant Glowing Ambient Light Auroras across the entire page (Matching Reference Design V2) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Top-Left Rose/Pink Neon Halo */}
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-rose-500/15 blur-[160px] animate-pulse-aura" />
        
        {/* Top-Right Electric Violet/Purple Glow */}
        <div className="absolute -top-20 right-[-15%] w-[800px] h-[800px] rounded-full bg-purple-600/18 blur-[170px] animate-pulse-aura" style={{ animationDelay: "3s" }} />

        {/* Mid-Page Magenta / Fuchsia Glow */}
        <div className="absolute top-[28%] left-[-10%] w-[750px] h-[650px] rounded-full bg-pink-600/15 blur-[170px] animate-pulse-aura" style={{ animationDelay: "1.5s" }} />

        {/* Ecosystem Neon Violet Glow */}
        <div className="absolute top-[48%] right-[-10%] w-[850px] h-[700px] rounded-full bg-violet-600/16 blur-[180px] animate-pulse-aura" style={{ animationDelay: "4.5s" }} />

        {/* Architecture Rose/Pink Glow */}
        <div className="absolute top-[68%] left-[10%] w-[900px] h-[650px] rounded-full bg-rose-600/14 blur-[170px] animate-pulse-aura" style={{ animationDelay: "2s" }} />

        {/* Bottom CTA / Footer Radiant Glow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full bg-gradient-to-r from-rose-600/18 via-pink-500/22 to-purple-600/18 blur-[160px] pointer-events-none" />
      </div>

      {/* 1. Cosmic Hero Section (Reference Design Masterpiece) */}
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