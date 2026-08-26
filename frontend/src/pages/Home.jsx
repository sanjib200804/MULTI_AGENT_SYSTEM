"use client";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getLenis } from "../components/LenisScroll";
import { useAuthContext } from "../context/AuthContext";
import { FaqSection } from "../sections/FaqSection";
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
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-500/20">
      
      {/* Hero Section */}
      <section className="pt-44 pb-20 px-6 text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white"
        >
          Build &amp; Deploy Autonomous <br />
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            AI Agent Workforces
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-sm md:text-lg font-normal leading-relaxed"
        >
          Describe your goal and let Agentra.AI orchestrate specialized agents for PDF analysis, web component building, live web research, image generation, and full-stack coding.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <button
            className="px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold hover:scale-[1.03] transition cursor-pointer text-xs md:text-sm shadow-md"
            onClick={handleCtaClick}
          >
            {user ? 'Go to Dashboard' : 'Get Started'}
          </button>
        </motion.div>
      </section>

      {/* Agent Ecosystem & Architecture */}
      <AgentEcosystem onCtaClick={handleCtaClick} />
      <WhyAgentra />

      {/* FAQ Section */}
      <div id="faq" className="mt-8 scroll-mt-24">
        <FaqSection />
      </div>

      <CtaBanner onCtaClick={handleCtaClick} />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 py-8 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
        &copy; {new Date().getFullYear()} Agentra AI. All rights reserved.
      </footer>
    </div>
  );
}