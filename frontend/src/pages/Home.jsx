"use client";

import {
    ArrowRight,
    Bot,
    BrainCircuit,
    Check,
    Database,
    Play,
    ShieldCheck,
    Sparkles,
    Workflow,
    Zap,
} from "lucide-react";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLenis } from "../components/LenisScroll";
import Marquee from "react-fast-marquee";
import { companiesLogo } from "../data/companiesLogo";
import { featuresData } from "../data/featuresData";
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
            if (lenis) {
                lenis.scrollTo(0);
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else {
            const id = path.replace("/", "");
            const element = document.getElementById(id);
            if (element) {
                const timer = setTimeout(() => {
                    if (lenis) {
                        lenis.scrollTo(element, { offset: -96 });
                    } else {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [location]);

    return (
        <>
            {/* =========================================================
                HERO SECTION
            ========================================================= */}

            <section
                id="home"
                className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center bg-[url('/assets/light-hero-gradient.svg')] dark:bg-[url('/assets/dark-hero-gradient.svg')] bg-no-repeat bg-cover"
            >
                {/* Badge */}

                <div className="mt-32 flex flex-wrap items-center justify-center gap-3 rounded-full border border-purple-200 bg-white/70 p-1.5 pr-4 shadow-sm backdrop-blur dark:border-purple-900 dark:bg-slate-900/50 md:mt-40">

                    <div className="flex items-center gap-1 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
                        <Sparkles size={13} />
                        AI Platform
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                        Build smarter with Agentra AI
                    </p>
                </div>

                {/* Hero Heading */}

                <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-tight tracking-tight md:text-[68px] md:leading-[1.1]">

                    Build powerful{" "}

                    <span className="bg-gradient-to-r from-[#923FEF] to-[#C35DE8] bg-clip-text text-transparent dark:from-[#C99DFF] dark:to-[#E1C9FF]">
                        AI agents
                    </span>

                    {" "}that work for you.
                </h1>

                {/* Hero Description */}

                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
                    Agentra AI is a powerful platform for building, managing,
                    and deploying intelligent AI agents. Connect your knowledge,
                    automate workflows, and let AI handle complex tasks.
                </p>

                {/* CTA */}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

                    <button
                        onClick={handleCtaClick}
                        className="flex h-12 items-center gap-2 rounded-lg bg-purple-600 px-7 text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700"
                    >

                        Start free trial

                        <ArrowRight size={17} />

                    </button>

                    <button className="flex h-12 items-center gap-2 rounded-lg border border-slate-300 bg-white/60 px-7 text-slate-700 backdrop-blur transition hover:border-purple-400 hover:text-purple-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-white">

                        <Play size={17} />

                        Watch demo

                    </button>

                </div>

                {/* Hero Feature Points */}

                <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-slate-500 dark:text-slate-400">

                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-purple-500" />
                        Multi-Agent AI
                    </div>

                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-purple-500" />
                        RAG Knowledge
                    </div>

                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-purple-500" />
                        Workflow Automation
                    </div>

                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-purple-500" />
                        Secure & Scalable
                    </div>

                </div>

                {/* AI Agent Preview */}

                <div className="relative mt-20 w-full max-w-5xl">

                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-2 shadow-2xl shadow-purple-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">

                            <div className="mb-5 flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="flex size-10 items-center justify-center rounded-lg bg-purple-600 text-white">
                                        <Bot size={21} />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-sm font-semibold">
                                            Agentra AI Agent
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Online • Ready to work
                                        </p>
                                    </div>

                                </div>

                                <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                                    Active
                                </div>

                            </div>

                            <div className="grid gap-4 md:grid-cols-3">

                                <div className="rounded-xl border border-slate-200 bg-white p-5 text-left dark:border-slate-800 dark:bg-slate-900">

                                    <Bot className="mb-3 text-purple-500" />

                                    <h3 className="font-medium">
                                        AI Agents
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-slate-400">
                                        Create specialized agents that reason,
                                        plan and execute tasks.
                                    </p>

                                </div>

                                <div className="rounded-xl border border-slate-200 bg-white p-5 text-left dark:border-slate-800 dark:bg-slate-900">

                                    <Database className="mb-3 text-purple-500" />

                                    <h3 className="font-medium">
                                        Knowledge Base
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-slate-400">
                                        Give your agents access to your private
                                        documents and knowledge.
                                    </p>

                                </div>

                                <div className="rounded-xl border border-slate-200 bg-white p-5 text-left dark:border-slate-800 dark:bg-slate-900">

                                    <Workflow className="mb-3 text-purple-500" />

                                    <h3 className="font-medium">
                                        Workflows
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-slate-400">
                                        Automate complex processes with
                                        intelligent agent workflows.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* =========================================================
                TRUST / TECHNOLOGY SECTION
            ========================================================= */}

            <section className="px-6 py-20 md:px-16 lg:px-24">

                <p className="text-center text-sm font-medium text-slate-400">
                    POWERED BY MODERN AI TECHNOLOGY
                </p>

                <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-semibold md:text-3xl">
                    Everything you need to build intelligent AI systems.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Agentra brings agents, knowledge, automation and AI tools
                    together in one powerful platform.
                </p>

                <Marquee
                    className="mx-auto mt-12 max-w-5xl"
                    gradient={true}
                    speed={25}
                    gradientColor={theme === "dark" ? "#000" : "#fff"}
                >
                    <div className="flex items-center justify-center">
                        {[...companiesLogo, ...companiesLogo].map(
                            (company, index) => (
                                <img
                                    key={index}
                                    className="mx-11 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                                    src={company.logo}
                                    alt={company.name}
                                    width={100}
                                    height={100}
                                />
                            )
                        )}
                    </div>
                </Marquee>

            </section>


            {/* =========================================================
                FEATURES
            ========================================================= */}

            <section id="features" className="scroll-mt-24">
                <SectionTitle
                    text1="POWERFUL FEATURES"
                    text2="Everything your AI needs"
                    text3="Build, connect, automate and deploy intelligent agents from one platform."
                />

                <div className="mt-10 flex flex-wrap items-stretch justify-center gap-5 px-6 md:px-16 lg:px-24 xl:px-32">

                    {featuresData.map((feature, index) => (
                        <div
                            key={index}
                            className="group max-w-80 rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-purple-800"
                        >
                            <feature.icon
                                className="mt-2 size-9 text-purple-500 transition group-hover:scale-110"
                                strokeWidth={1.3}
                            />

                            <h3 className="mt-5 text-base font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                {feature.description}
                            </p>

                            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-purple-500">
                                Learn more
                                <ArrowRight size={13} />
                            </div>
                        </div>
                    ))}

                </div>
            </section>


            {/* =========================================================
                WHY AGENTRA
            ========================================================= */}

            <section className="mx-auto mt-32 max-w-6xl px-6 md:px-10">

                <div className="grid items-center gap-14 md:grid-cols-2">

                    <div>

                        <p className="text-sm font-semibold tracking-widest text-purple-500">
                            WHY AGENTRA AI
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                            Turn AI from a chatbot into a{" "}
                            <span className="text-purple-500">
                                digital workforce.
                            </span>
                        </h2>

                        <p className="mt-5 leading-7 text-slate-500 dark:text-slate-400">
                            Agentra AI helps you build intelligent systems that
                            can understand information, make decisions, use
                            tools and complete real-world tasks.
                        </p>

                        <div className="mt-8 space-y-5">

                            <div className="flex gap-4">

                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                                    <BrainCircuit
                                        size={19}
                                        className="text-purple-500"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-medium">
                                        Intelligent reasoning
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Agents can plan tasks, reason through
                                        problems and choose the right tools.
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-4">

                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                                    <Zap
                                        size={19}
                                        className="text-purple-500"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-medium">
                                        Powerful automation
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Automate repetitive and complex
                                        business workflows with AI.
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-4">

                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                                    <ShieldCheck
                                        size={19}
                                        className="text-purple-500"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-medium">
                                        Secure by design
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Keep your users, conversations and
                                        knowledge isolated and protected.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Right Side Feature Card */}

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-950">

                            <div className="flex items-center gap-3">

                                <div className="flex size-11 items-center justify-center rounded-xl bg-purple-600 text-white">
                                    <Bot size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Research Agent
                                    </h3>

                                    <p className="text-xs text-green-500">
                                        ● Running
                                    </p>
                                </div>

                            </div>

                            <div className="mt-6 space-y-3">

                                {[
                                    "Understand user request",
                                    "Search knowledge base",
                                    "Analyze information",
                                    "Generate final response",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 text-sm dark:border-slate-800"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-full bg-purple-500/10 text-xs text-purple-500">
                                            {index + 1}
                                        </div>

                                        {item}
                                    </div>
                                ))}

                            </div>

                            <div className="mt-5 rounded-xl bg-purple-600/10 p-4">

                                <p className="text-xs text-purple-500">
                                    Agentra AI
                                </p>

                                <p className="mt-1 text-sm">
                                    Task completed successfully.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                PRICING
            ========================================================= */}

            <div id="pricing" className="mt-32 scroll-mt-24">
                <Pricing />
            </div>


            {/* =========================================================
                FAQ
            ========================================================= */}

            <FaqSection />


            {/* =========================================================
                FINAL CTA
            ========================================================= */}

            <section id="contact" className="mx-6 mt-24 overflow-hidden rounded-3xl bg-purple-600 px-6 py-20 text-center text-white md:mx-16 lg:mx-24 scroll-mt-24">

                <div className="mx-auto max-w-3xl">

                    <Sparkles className="mx-auto mb-5" size={30} />

                    <h2 className="text-3xl font-semibold md:text-5xl">
                        Ready to build your AI workforce?
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-purple-100 md:text-base">
                        Create intelligent AI agents, connect your knowledge,
                        automate workflows and turn your ideas into powerful
                        AI applications with Agentra.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

                        <button
                            onClick={handleCtaClick}
                            className="flex h-12 items-center gap-2 rounded-lg bg-white px-7 font-medium text-purple-600 transition hover:bg-purple-50"
                        >

                            Start free trial

                            <ArrowRight size={17} />

                        </button>

                        <button className="flex h-12 items-center rounded-lg border border-purple-300 px-7 font-medium text-white transition hover:bg-purple-700">

                            Contact sales

                        </button>

                    </div>

                    <p className="mt-5 text-xs text-purple-200">
                        No credit card required • Get started in minutes
                    </p>

                </div>

            </section>


            {/* Bottom spacing */}

            <div className="h-20" />

        </>
    );
}