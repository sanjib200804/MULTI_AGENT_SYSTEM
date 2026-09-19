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
    color: "text-zinc-300",
    bgBadge: "bg-white/[0.06] text-zinc-200 border-white/10",
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
  <div class="glass-card p-4 rounded-xl border border-white/20">
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
    color: "text-zinc-300",
    bgBadge: "bg-white/[0.06] text-zinc-200 border-white/10",
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
    color: "text-zinc-300",
    bgBadge: "bg-white/[0.06] text-zinc-200 border-white/10",
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
    color: "text-zinc-300",
    bgBadge: "bg-white/[0.06] text-zinc-200 border-white/10",
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
    color: "text-zinc-300",
    bgBadge: "bg-white/[0.06] text-zinc-200 border-white/10",
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
  web: "bg-black dark:bg-white text-white dark:text-black shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] border-black dark:border-white font-bold",
  rag: "bg-black dark:bg-white text-white dark:text-black shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] border-black dark:border-white font-bold",
  code: "bg-black dark:bg-white text-white dark:text-black shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] border-black dark:border-white font-bold",
  ppt: "bg-black dark:bg-white text-white dark:text-black shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] border-black dark:border-white font-bold",
  search: "bg-black dark:bg-white text-white dark:text-black shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] border-black dark:border-white font-bold",
};

export default function AgentPlayground({ onCtaClick }) {
  const [activeTab, setActiveTab] = useState(demoScenarios[0]);

  return (
    <section id="platform" className="relative z-20 py-24 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-white/[0.05] text-slate-800 dark:text-zinc-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Cpu size={13} className="text-slate-700 dark:text-zinc-300" />
          <span>Interactive Execution Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Watch the Agent Swarm in <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">Real Time</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
          Select a task below to observe how Agentra’s LangGraph router decomposes goals, delegates to domain specialists, and synthesizes tangible outputs.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {demoScenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isSelected = activeTab.id === scenario.id;
          const glowClass = tabGlowStyles[scenario.id] || "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white";
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? glowClass
                  : "bg-white/80 dark:bg-zinc-900/80 text-slate-700 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 shadow-sm"
              }`}
            >
              <Icon size={14} className={isSelected ? "text-white dark:text-black" : "text-slate-500 dark:text-zinc-400"} />
              <span>{scenario.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Terminal Window in Reference Card Style */}
      <div className="ref-card rounded-[32px] p-0 shadow-2xl">
        {/* Subtle Ambient Corner Glows */}
        <div className="absolute -top-16 -left-16 size-72 rounded-full bg-[#4288BC]/[0.05] dark:bg-white/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 size-80 rounded-full bg-[#4288BC]/[0.04] dark:bg-white/[0.02] blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Terminal Top Window Bar */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-slate-400 dark:bg-zinc-700" />
              <span className="size-3 rounded-full bg-slate-500 dark:bg-zinc-500" />
              <span className="size-3 rounded-full bg-slate-600 dark:bg-zinc-300" />
              <span className="ml-3 font-mono text-xs text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 font-medium">
                <Terminal size={12} className="text-slate-500 dark:text-zinc-400" />
                agentra-swarm // {activeTab.id}_node.py
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="hidden sm:inline text-slate-500 dark:text-zinc-400">Time: <strong className="text-slate-900 dark:text-white">{activeTab.stats.time}</strong></span>
              <span className="hidden sm:inline text-slate-500 dark:text-zinc-400">Cost: <strong className="text-slate-900 dark:text-white">{activeTab.stats.credits}</strong></span>
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
              <div className="ref-beveled-subcard p-5 border border-black/10 dark:border-white/10">
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">
                  Input Prompt
                </span>
                <p className="text-sm text-slate-900 dark:text-zinc-200 font-semibold leading-relaxed">
                  "{activeTab.prompt}"
                </p>
              </div>

              {/* Orchestration Route Stepper */}
              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-2.5 font-bold">
                  LangGraph State Pipeline
                </span>
                <div className="space-y-2">
                  {activeTab.route.map((step, idx) => (
                    <div 
                      key={idx} 
                      className="ref-beveled-subcard flex items-center gap-3 p-3 text-xs font-medium border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors"
                    >
                      <div className="flex size-6 items-center justify-center rounded-lg bg-black/[0.05] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-[10px] font-mono font-bold shadow-sm">
                        0{idx + 1}
                      </div>
                      <span className="text-slate-800 dark:text-zinc-200 font-semibold">{step}</span>
                      <CheckCircle2 size={14} className="ml-auto text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch CTA */}
              <button
                onClick={onCtaClick}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-bold shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition duration-300 cursor-pointer hover:scale-[1.01]"
              >
                <span>Test This in Live Dashboard</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Right Column: Live Output Artifact Sandbox (7 cols) */}
            <div className="lg:col-span-7 ref-beveled-subcard p-6 min-h-[340px] flex flex-col justify-between border border-black/10 dark:border-white/10">
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
                    <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Globe size={14} className="text-slate-600 dark:text-zinc-300" /> {activeTab.preview.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-black/10 dark:border-white/10">
                        {activeTab.preview.url}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeTab.preview.tokens.map((tok, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 transition-all hover:scale-[1.02]">
                          <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 font-semibold">{tok.sym}</span>
                          <p className="text-base font-extrabold text-slate-900 dark:text-white mt-1">{tok.price}</p>
                          <span className="text-[10px] font-bold text-slate-700 dark:text-zinc-300">
                            {tok.change}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl bg-black/90 p-3.5 border border-slate-700 font-mono text-[11px] text-zinc-200 overflow-x-auto">
                      <pre><code>{activeTab.preview.codeSnippet}</code></pre>
                    </div>
                  </div>
                )}

                {/* 2. PDF RAG Preview */}
                {activeTab.preview.type === "rag" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FileText size={14} className="text-slate-600 dark:text-zinc-300" /> {activeTab.preview.filename}
                      </span>
                      <span className="text-[10px] font-mono text-slate-800 dark:text-zinc-200 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-black/10 dark:border-white/10 font-bold">
                        {activeTab.preview.confidence}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 font-mono mb-2">
                        <span className="font-bold text-slate-700 dark:text-zinc-200">Page {activeTab.preview.citation.page} Citation</span>
                        <span className="text-slate-600 dark:text-zinc-300">{activeTab.preview.citation.section}</span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-normal italic">
                        "{activeTab.preview.citation.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-zinc-400 font-mono pt-2">
                      <span className="text-slate-700 dark:text-zinc-300 font-semibold">Indexed: 142 pages</span>
                      <span className="text-slate-500 dark:text-zinc-400">Vector DB: Qdrant Cloud (384-dim)</span>
                    </div>
                  </div>
                )}

                {/* 3. Code Preview */}
                {activeTab.preview.type === "code" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 text-xs">
                      <span className="font-mono text-slate-900 dark:text-white font-bold flex items-center gap-2">
                        <Code2 size={14} className="text-slate-600 dark:text-zinc-300" /> api_gateway_middleware.py
                      </span>
                      <span className="text-[10px] font-mono text-slate-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded border border-black/10 dark:border-white/10">
                        FastAPI + Redis
                      </span>
                    </div>
                    <div className="rounded-xl bg-black/90 p-4 border border-slate-700 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed">
                      <pre><code>{activeTab.preview.code}</code></pre>
                    </div>
                  </div>
                )}

                {/* 4. PPT Deck Preview */}
                {activeTab.preview.type === "ppt" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Presentation size={14} className="text-slate-600 dark:text-zinc-300" /> {activeTab.preview.deckTitle}
                      </span>
                      <span className="text-[10px] font-mono text-slate-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-black/10 dark:border-white/10 font-semibold">
                        Generated .pptx
                      </span>
                    </div>
                    <div className="space-y-2">
                      {activeTab.preview.slides.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-xs text-slate-800 dark:text-zinc-200">
                          <span className="font-mono text-slate-900 dark:text-white font-bold">{s.num}</span>
                          <span className="font-medium">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Search Preview */}
                {activeTab.preview.type === "search" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Search size={14} className="text-slate-600 dark:text-zinc-300" /> Tavily Web Swarm
                      </span>
                      <span className="text-[10px] font-mono text-slate-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-black/10 dark:border-white/10">
                        Live Web Index
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {activeTab.preview.results.map((res, i) => (
                        <div key={i} className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">{res.domain}</span>
                            <span className="text-slate-500">{res.time}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">{res.title}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-[11px] text-slate-600 dark:text-zinc-400">
              <span className="font-mono flex items-center gap-1.5 font-medium">
                <span className="size-2 rounded-full bg-emerald-500 dark:bg-white animate-pulse" />
                Live Agent Execution Status: 200 OK
              </span>
              <span className="text-slate-500 dark:text-zinc-500 font-mono">Microservices: Gateway &rarr; Agent (Port 8003)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
