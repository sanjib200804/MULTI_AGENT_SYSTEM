import React, { useState } from "react";
import { 
  Globe, 
  FileSearch, 
  Code2, 
  Presentation, 
  Search, 
  Sparkles, 
  Terminal, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Cpu,
  Layers,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const demoScenarios = [
  {
    id: "web",
    title: "Web Builder Agent",
    icon: Globe,
    color: "text-cyan-400",
    bgBadge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    prompt: "Build an interactive cryptocurrency analytics dashboard with real-time price cards and dark glassmorphic styling.",
    route: ["Router Agent", "Website Builder", "Live Sandbox Preview"],
    stats: { time: "1.2s", credits: "5 credits", model: "Gemini 2.0 + HTML Engine" },
    preview: {
      type: "web",
      title: "CryptoPulse Live Terminal",
      url: "https://cryptopulse.agentra.internal",
      tokens: [
        { sym: "BTC", price: "$96,450.00", change: "+4.8%", up: true },
        { sym: "ETH", price: "$3,420.50", change: "+2.3%", up: true },
        { sym: "SOL", price: "$210.80", change: "-1.1%", up: false },
      ],
      codeSnippet: `<div class="grid grid-cols-3 gap-4">
  <div class="glass-card p-4 rounded-xl border border-cyan-500/30">
    <h3>Bitcoin (BTC)</h3>
    <span class="text-2xl font-bold">$96,450.00</span>
  </div>
</div>`
    }
  },
  {
    id: "rag",
    title: "PDF RAG Agent",
    icon: FileSearch,
    color: "text-indigo-400",
    bgBadge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    prompt: "Analyze the uploaded 10-K Financial PDF: What was the operating margin growth and R&D capital expenditure in Q4?",
    route: ["Router Agent", "Qdrant Vector DB", "PDF Grounded Citation"],
    stats: { time: "0.8s", credits: "4 credits", model: "Qdrant Dense Embeddings" },
    preview: {
      type: "rag",
      filename: "Alphabet_2025_10K_AnnualReport.pdf",
      pagesIndexed: 142,
      confidence: "98.4% Grounded",
      citation: {
        page: 24,
        section: "Item 7. Management Discussion of Financial Condition",
        text: "Operating margin expanded by 240 basis points year-over-year to 31.8%. Q4 R&D capital expenditures were $11.4 billion, primarily driven by enterprise AI infrastructure and TPU cluster provisioning."
      }
    }
  },
  {
    id: "code",
    title: "Coding Master",
    icon: Code2,
    color: "text-amber-400",
    bgBadge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    prompt: "Create an async FastAPI microservice with Redis token bucket rate limiting and JWT middleware.",
    route: ["Router Agent", "Coding Master", "Syntax Reviewer"],
    stats: { time: "1.5s", credits: "3 credits", model: "Groq / Llama-3.3 70B" },
    preview: {
      type: "code",
      language: "python",
      code: `@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host
    key = f"ratelimit:{client_ip}"
    allowed = await redis_client.eval(TOKEN_BUCKET_LUA, 1, key, 100, 60)
    if not allowed:
        return JSONResponse({"error": "Quota Exceeded"}, status_code=429)
    return await call_next(request)`
    }
  },
  {
    id: "ppt",
    title: "PPT Deck Agent",
    icon: Presentation,
    color: "text-violet-400",
    bgBadge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    prompt: "Generate a high-stakes 6-slide investor deck on 'Autonomous AI Multi-Agent Workforces in Enterprise'.",
    route: ["Router Agent", "PPT Deck Generator", "AWS S3 Signed Link"],
    stats: { time: "2.1s", credits: "6 credits", model: "python-pptx + S3" },
    preview: {
      type: "ppt",
      deckTitle: "Autonomous AI Workforces 2026.pptx",
      slides: [
        { num: "01", name: "Executive Problem Statement & Legacy Chat Bottlenecks" },
        { num: "02", name: "LangGraph State Machine Multi-Agent Orchestration" },
        { num: "03", name: "Microservices Architecture & Real-Time Tool Integration" },
        { num: "04", name: "Market Opportunity: Autonomous Enterprise Automation" },
      ]
    }
  },
  {
    id: "search",
    title: "Search Swarm",
    icon: Search,
    color: "text-emerald-400",
    bgBadge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    prompt: "Synthesize latest real-time developments in AI Agent benchmarks from today's live web.",
    route: ["Router Agent", "Tavily Web Search", "Citation Synthesizer"],
    stats: { time: "1.1s", credits: "3 credits", model: "Tavily Search API" },
    preview: {
      type: "search",
      query: "ai agent benchmarks langgraph 2026",
      results: [
        { domain: "arxiv.org", title: "SWE-bench Verified: Multi-Agent Coordinated Coding Architectures", time: "2 hours ago" },
        { domain: "techcrunch.com", title: "Autonomous Agent Orchestration Replaces Monolithic LLM Wrappers", time: "5 hours ago" },
      ]
    }
  }
];

const tabGlowStyles = {
  web: "bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.55)]",
  rag: "bg-indigo-500/20 text-indigo-200 border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.55)]",
  code: "bg-amber-500/20 text-amber-200 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.55)]",
  ppt: "bg-violet-500/20 text-violet-200 border-violet-400 shadow-[0_0_25px_rgba(168,85,247,0.55)]",
  search: "bg-emerald-500/20 text-emerald-200 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.55)]",
};

export default function AgentPlayground({ onCtaClick }) {
  const [activeTab, setActiveTab] = useState(demoScenarios[0]);

  return (
    <section id="platform" className="relative z-20 py-24 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Cpu size={13} className="text-cyan-400" />
          <span>Interactive Execution Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Watch the Agent Swarm in <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">Real Time</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm md:text-base leading-relaxed">
          Select a task below to observe how Agentra’s LangGraph router decomposes goals, delegates to domain specialists, and synthesizes tangible outputs.
        </p>
      </div>

      {/* Interactive Tabs with Custom Radiant Neon Shadows */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {demoScenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isSelected = activeTab.id === scenario.id;
          const glowClass = tabGlowStyles[scenario.id] || "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] border-blue-400";
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? glowClass
                  : "bg-[#070b19]/80 text-slate-300 hover:text-white hover:bg-white/[0.08] border-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
              }`}
            >
              <Icon size={14} className={isSelected ? "text-current" : scenario.color} />
              <span>{scenario.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Terminal Window in Reference Card Style */}
      <div className="ref-card rounded-[32px] p-0 shadow-2xl">
        {/* Dual Corner Halos matching Reference Image */}
        <div className="absolute -top-16 -left-16 size-72 rounded-full bg-gradient-to-br from-rose-500/35 via-pink-500/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 size-80 rounded-full bg-gradient-to-tl from-purple-600/45 via-violet-600/30 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Terminal Top Window Bar */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
              <span className="size-3 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
              <span className="size-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="ml-3 font-mono text-xs text-slate-300 flex items-center gap-1.5">
                <Terminal size={12} className="text-pink-400" />
                agentra-swarm // {activeTab.id}_node.py
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="hidden sm:inline text-slate-400">Time: <strong className="text-pink-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]">{activeTab.stats.time}</strong></span>
              <span className="hidden sm:inline text-slate-400">Cost: <strong className="text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">{activeTab.stats.credits}</strong></span>
              <span className="ref-connect-btn !py-0.5 !px-2.5 !text-[10px]">
                ● Active Node
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Prompt & Orchestration Flow (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* User Input Prompt in Beveled Subcard */}
              <div className="ref-beveled-subcard p-5">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1.5 font-semibold">
                  Input Prompt
                </span>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">
                  "{activeTab.prompt}"
                </p>
              </div>

              {/* Orchestration Route Stepper */}
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                  LangGraph State Pipeline
                </span>
                <div className="space-y-2">
                  {activeTab.route.map((step, idx) => (
                    <div 
                      key={idx} 
                      className="ref-beveled-subcard flex items-center gap-3 p-3 text-xs font-medium hover:border-white/15 transition-colors"
                    >
                      <div className="flex size-6 items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-cyan-300 text-[10px] font-mono font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        0{idx + 1}
                      </div>
                      <span className="text-slate-200">{step}</span>
                      <CheckCircle2 size={14} className="ml-auto text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.7)]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch CTA */}
              <button
                onClick={onCtaClick}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs font-semibold shadow-[0_0_25px_rgba(37,99,235,0.6),0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(37,99,235,0.8),0_0_60px_rgba(6,182,212,0.5)] transition duration-300 cursor-pointer hover:scale-[1.01]"
              >
                <span>Test This in Live Dashboard</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Right Column: Live Output Artifact Sandbox (7 cols) */}
            <div className="lg:col-span-7 ref-beveled-subcard p-6 min-h-[340px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                {/* 1. Web App Sandbox Preview */}
                {activeTab.preview.type === "web" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 text-xs">
                      <span className="font-semibold text-cyan-300 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                        <Globe size={14} className="text-cyan-400" /> {activeTab.preview.title}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-200 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        {activeTab.preview.url}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeTab.preview.tokens.map((tok, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-cyan-500/[0.06] border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.18)] transition-all hover:scale-[1.02]">
                          <span className="text-[10px] font-mono text-cyan-300 font-semibold">{tok.sym}</span>
                          <p className="text-base font-extrabold text-white mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{tok.price}</p>
                          <span className={`text-[10px] font-bold ${tok.up ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" : "text-rose-400"}`}>
                            {tok.change}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl bg-black/70 p-3.5 border border-cyan-500/25 font-mono text-[11px] text-cyan-100/90 overflow-x-auto shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                      <pre><code>{activeTab.preview.codeSnippet}</code></pre>
                    </div>
                  </div>
                )}

                {/* 2. PDF RAG Preview */}
                {activeTab.preview.type === "rag" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20 text-xs">
                      <span className="font-semibold text-indigo-300 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                        <FileText size={14} className="text-indigo-400" /> {activeTab.preview.filename}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.3)] font-bold">
                        {activeTab.preview.confidence}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-500/[0.08] border border-indigo-400/40 shadow-[0_0_25px_rgba(99,102,241,0.2)]">
                      <div className="flex items-center justify-between text-[11px] text-indigo-300 font-mono mb-2">
                        <span className="font-bold">Page {activeTab.preview.citation.page} Citation</span>
                        <span className="text-indigo-400/90">{activeTab.preview.citation.section}</span>
                      </div>
                      <p className="text-xs text-slate-100 leading-relaxed font-normal italic">
                        "{activeTab.preview.citation.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-slate-300 font-mono pt-2">
                      <span className="text-indigo-300">Indexed: 142 pages</span>
                      <span className="text-cyan-400">Vector DB: Qdrant Cloud (384-dim)</span>
                    </div>
                  </div>
                )}

                {/* 3. Code Preview */}
                {activeTab.preview.type === "code" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-amber-500/20 text-xs">
                      <span className="font-mono text-amber-300 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                        <Code2 size={14} className="text-amber-400" /> api_gateway_middleware.py
                      </span>
                      <span className="text-[10px] font-mono text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        FastAPI + Redis
                      </span>
                    </div>
                    <div className="rounded-xl bg-black/75 p-4 border border-amber-500/30 font-mono text-xs text-amber-100/90 overflow-x-auto leading-relaxed shadow-[0_0_25px_rgba(245,158,11,0.15)]">
                      <pre><code>{activeTab.preview.code}</code></pre>
                    </div>
                  </div>
                )}

                {/* 4. PPT Deck Preview */}
                {activeTab.preview.type === "ppt" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-violet-500/20 text-xs">
                      <span className="font-semibold text-violet-300 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                        <Presentation size={14} className="text-violet-400" /> {activeTab.preview.deckTitle}
                      </span>
                      <span className="text-[10px] font-mono text-violet-200 bg-violet-500/25 px-2.5 py-0.5 rounded-full border border-violet-400/40 shadow-[0_0_12px_rgba(168,85,247,0.3)] font-semibold">
                        Generated .pptx
                      </span>
                    </div>
                    <div className="space-y-2">
                      {activeTab.preview.slides.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-violet-500/[0.06] border border-violet-500/25 text-xs text-slate-100 shadow-[0_0_12px_rgba(168,85,247,0.12)]">
                          <span className="font-mono text-violet-400 font-bold drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">{s.num}</span>
                          <span>{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Search Preview */}
                {activeTab.preview.type === "search" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20 text-xs">
                      <span className="font-semibold text-emerald-300 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                        <Search size={14} className="text-emerald-400" /> Tavily Web Swarm
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                        Live Web Index
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {activeTab.preview.results.map((res, i) => (
                        <div key={i} className="p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                          <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                            <span className="font-semibold">{res.domain}</span>
                            <span className="text-slate-400">{res.time}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white mt-1">{res.title}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-mono flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Agent Execution Status: 200 OK
              </span>
              <span className="text-slate-500 font-mono">Microservices: Gateway &rarr; Agent (Port 8003)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
