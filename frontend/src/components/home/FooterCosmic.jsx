import React from "react";
import { Link } from "react-router-dom";
import { Shield, Cpu } from "lucide-react";

export default function FooterCosmic() {
  return (
    <footer className="relative z-20 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black text-slate-600 dark:text-zinc-400 text-xs pt-16 pb-12 transition-colors duration-200">
      {/* Radiant Glowing Top Border Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-slate-400/40 dark:via-white/30 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-black/[0.08] dark:border-white/[0.08]">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center size-8">
                <svg 
                  className="w-7 h-7 text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-transform duration-300 group-hover:scale-105" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="8" width="4.5" height="4.5" rx="2" fill="currentColor" />
                  <rect x="7.5" y="4" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.9" />
                  <rect x="7.5" y="12" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.9" />
                  <rect x="13" y="8" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.8" />
                  <rect x="13" y="16" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.8" />
                  <rect x="18.5" y="12" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                Agentra<span className="text-slate-500 dark:text-zinc-400 font-normal">.AI</span>
              </span>
            </Link>

            <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed max-w-sm">
              Enterprise-grade Multi-Agent AI Platform powered by LangGraph state machines, FastAPI microservices, and Qdrant vector retrieval.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-zinc-300 shadow-sm dark:shadow-[0_0_12px_rgba(255,255,255,0.05)]">
              <span className="size-2 rounded-full bg-slate-900 dark:bg-white shadow-sm dark:shadow-[0_0_8px_#ffffff] animate-pulse" />
              <span>All 9 Agent Nodes Operational</span>
            </div>
          </div>

          {/* Quick Links (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-3">
                Platform
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#platform" className="hover:text-slate-900 dark:hover:text-white transition-colors">Execution Engine</a></li>
                <li><a href="#agents" className="hover:text-slate-900 dark:hover:text-white transition-colors">Specialized Agents</a></li>
                <li><a href="#architecture" className="hover:text-slate-900 dark:hover:text-white transition-colors">LangGraph Topology</a></li>
                <li><a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Credit Quotas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-3">
                Agent Stack
              </h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-slate-500">Website Builder Sandbox</span></li>
                <li><span className="text-slate-500">Qdrant PDF RAG</span></li>
                <li><span className="text-slate-500">Tavily Search Swarm</span></li>
                <li><span className="text-slate-500">ReportLab & python-pptx</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-3">
                Microservices
              </h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-slate-500">API Gateway (8000)</span></li>
                <li><span className="text-slate-500">Auth Service (8001)</span></li>
                <li><span className="text-slate-500">Chat Service (8002)</span></li>
                <li><span className="text-slate-500">Agent Service (8003)</span></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Agentra AI. Autonomous Multi-Agent Infrastructure.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400">PostgreSQL 15</span>
            <span>•</span>
            <span className="hover:text-slate-400">Redis Alpine</span>
            <span>•</span>
            <span className="hover:text-slate-400">Qdrant Cloud</span>
            <span>•</span>
            <span className="hover:text-slate-400">AWS S3</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
