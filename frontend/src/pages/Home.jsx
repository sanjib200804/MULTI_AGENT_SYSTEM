"use client";

import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Code2,
  Database,
  FileText,
  Layout,
  Presentation,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  Eye,
  Zap,
  CheckCircle2,
  Play
} from "lucide-react";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getLenis } from "../components/LenisScroll";
import Marquee from "react-fast-marquee";
import { companiesLogo } from "../data/companiesLogo";
import SectionTitle from "../components/SectionTitle";
import { useThemeContext } from "../context/ThemeContext";
import { useAuthContext } from "../context/AuthContext";
import { FaqSection } from "../sections/FaqSection";
import Pricing from "../sections/Pricing";

export default function Page() {
  const { theme } = useThemeContext();
  const { user, setIsAuthModalOpen } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Agentra Agents Specification
  const agentraAgents = [
    {
      title: "PDF RAG Agent",
      description: "Chat with complex PDFs, extract tables, and summarize multi-page reports with instant citation memory.",
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10 border-blue-500/20",
      tag: "Document Intelligence"
    },
    {
      title: "Vision & Artwork Agent",
      description: "Generate photorealistic imagery, digital concepts, and artistic renders from natural language prompts.",
      icon: Eye,
      color: "text-pink-500",
      bg: "bg-pink-500/10 border-pink-500/20",
      tag: "Visual AI"
    },
    {
      title: "Web Builder Agent",
      description: "Generate responsive landing pages, UI layouts, and frontend components in working HTML & CSS.",
      icon: Zap,
      color: "text-purple-500",
      bg: "bg-purple-500/10 border-purple-500/20",
      tag: "Code & Web Generation"
    },
    {
      title: "Search Agent",
      description: "Real-time web research swarm that browses the live internet, verifies facts, and synthesizes answers.",
      icon: Search,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      tag: "Live Web Research"
    },
    {
      title: "Coding Master Agent",
      description: "Architect, write, review, and debug code across 20+ languages with automated syntax inspection.",
      icon: Code2,
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/20",
      tag: "Full-Stack Dev"
    },
    {
      title: "PPT Deck Agent",
      description: "Convert ideas into complete presentation decks with automated topic breakdown and structured slides.",
      icon: Presentation,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      tag: "Presentation Deck"
    },
  ];

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
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-500/30">

      {/* =========================================================
                HERO SECTION ($10k Polish)
      ========================================================= */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center pt-24 md:pt-32"
      >
        {/* Radial Neon Blur Highlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/15 to-transparent blur-[140px] rounded-full pointer-events-none" />

        {/* Hero Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-300/60 dark:border-purple-500/30 bg-white/80 dark:bg-slate-900/80 px-4 py-1.5 shadow-sm backdrop-blur-xl mb-6"
        >
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-purple-500" />
          </span>
          <span className="text-xs font-semibold bg-gradient-to-r from-purple-700 to-indigo-600 dark:from-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
            Agentra v1.5 Suite Released
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl text-4xl font-extrabold tracking-tight md:text-7xl leading-[1.1] text-slate-900 dark:text-white"
        >
          Deploy your autonomous{" "}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            AI Agent Workforce
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg"
        >
          Agentra routes your prompts across specialized agents for PDF analysis, web building, search research, image creation, and full-stack coding.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCtaClick}
            className="flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-sm font-semibold text-white shadow-xl shadow-purple-500/25 transition cursor-pointer hover:shadow-purple-500/40"
          >
            Start Free Trial
            <ArrowRight size={17} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCtaClick}
            className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 px-6 text-sm font-semibold text-slate-700 dark:text-slate-200 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
          >
            <Play size={15} className="text-purple-500 fill-purple-500" />
            Watch Workflow Demo
          </motion.button>
        </motion.div>

        {/* Live Swarm Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-16 w-full max-w-5xl"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-purple-500/15 blur-3xl rounded-full pointer-events-none" />

          <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-3 shadow-2xl backdrop-blur-2xl">
            <div className="rounded-2xl border border-slate-200/60 dark:border-white/5 bg-slate-50/90 dark:bg-slate-950/90 p-6 text-left">

              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
                    <Workflow size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Agent Swarm Execution</h3>
                    <p className="text-xs text-slate-400">Autonomous Task Dispatch & Integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    6 Agents Online
                  </span>
                </div>
              </div>

              {/* Grid of Agent Execution Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {agentraAgents.slice(0, 3).map((agent, i) => {
                  const Icon = agent.icon;
                  return (
                    <div key={i} className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900 p-4 transition shadow-sm hover:border-purple-500/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${agent.bg}`}>
                          <Icon className={agent.color} size={18} />
                        </div>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      </div>
                      <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-100">{agent.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{agent.description}</p>
                      <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 w-[85%]" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
                MARQUEE SECTION
      ========================================================= */}
      <section className="px-6 py-16 mt-10">
        <p className="text-center text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-8">
          Integrates seamlessly with modern tech stacks
        </p>
        <Marquee gradient={true} speed={30} gradientColor={theme === "dark" ? "#020617" : "#f8fafc"}>
          <div className="flex items-center">
            {[...companiesLogo, ...companiesLogo].map((company, index) => (
              <img
                key={index}
                className="mx-10 opacity-50 grayscale transition hover:opacity-100 hover:grayscale-0 h-7"
                src={company.logo}
                alt={company.name}
              />
            ))}
          </div>
        </Marquee>
      </section>

      {/* =========================================================
                AGENT ECOSYSTEM (Feature Cards)
      ========================================================= */}
      <section id="features" className="scroll-mt-24 py-20 px-6 md:px-16 lg:px-24">
        <SectionTitle
          text1="AGENTRA ECOSYSTEM"
          text2="6 Specialized AI Agents Built For Action"
          text3="Stop struggling with generic prompt windows. Agentra routes every query to a dedicated domain expert."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {agentraAgents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/40 transition-all cursor-pointer"
                onClick={handleCtaClick}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex size-12 items-center justify-center rounded-2xl ${agent.bg} border transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className={agent.color} size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-white/5">
                      {agent.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {agent.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {agent.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                  <span>Launch Agent</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
                WHY AGENTRA (Split Feature Section)
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 md:px-16 py-20">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3 block">
              Enterprise Agent Architecture
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Turn complex tasks into an{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                automated output.
              </span>
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-slate-500 dark:text-slate-400">
              Agentra handles routing, memory retention, document parsing, and file generation automatically in the background.
            </p>

            <div className="mt-8 space-y-5">
              {[
                { icon: BrainCircuit, title: "Autonomous Intent Routing", desc: "Auto mode detects whether your prompt needs coding, RAG, research, or web generation." },
                { icon: Database, title: "Multi-Modal Attachments", desc: "Upload PDFs and images seamlessly directly inside your conversation thread." },
                { icon: ShieldCheck, title: "Enterprise Credit Tracking", desc: "Real-time user quota management with zero session friction." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logic Visualizer Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 backdrop-blur-2xl shadow-2xl">
              <div className="rounded-2xl border border-slate-200/60 dark:border-white/5 bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
                      <Bot size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Agentra Swarm Engine</h4>
                      <p className="text-[10px] text-emerald-400 font-semibold">Active Execution Pipeline</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "PDF Agent: Extracting structured tables",
                    "Search Agent: Verifying live sources",
                    "Coding Agent: Synthesizing API routes",
                    "Web Builder: Rendering UI elements",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-xs font-medium border border-white/5 hover:border-purple-500/40 transition">
                      <div className="flex size-5 items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold text-white">
                        {idx + 1}
                      </div>
                      <span className="text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing and FAQ */}
      <div id="pricing" className="mt-12 scroll-mt-24">
        <Pricing />
      </div>
      <FaqSection />

      {/* =========================================================
                FINAL CTA BANNER
      ========================================================= */}
      <section id="contact" className="mx-6 mt-24 mb-16 overflow-hidden rounded-3xl bg-slate-950 px-6 py-20 text-center text-white md:mx-16 lg:mx-24 relative border border-white/10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,63,239,0.2),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 mb-6 border border-purple-500/30">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-extrabold md:text-5xl tracking-tight leading-tight">
            Ready to deploy your <span className="text-purple-400">AI Agent Swarm?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm md:text-base text-slate-400 leading-relaxed">
            Get started immediately with 100 free credits and access to all 6 specialized agents.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCtaClick}
              className="flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-sm font-bold text-white shadow-xl shadow-purple-500/30 transition cursor-pointer"
            >
              Get Started for Free
              <ArrowRight size={17} />
            </motion.button>
          </div>
        </div>
      </section>

      <div className="h-12" />
    </div>
  );
}