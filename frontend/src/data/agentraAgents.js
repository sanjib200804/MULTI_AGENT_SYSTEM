import {
  Network,
  Code2,
  Globe,
  FileSearch,
  FileText,
  Presentation,
  Search,
  Sparkles,
  Eye,
} from "lucide-react";

export const agentraAgents = [
  {
    id: "router",
    title: "Router & Orchestrator",
    description:
      "Evaluates prompt semantics, user intent, and file payloads to dynamically route requests to the best agent node in LangGraph.",
    icon: Network,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    tag: "LangGraph State Engine",
    capabilities: ["Autonomous Intent Classifier", "Conditional Multi-Turn Dispatch", "Session Memory Graph"],
  },
  {
    id: "coding",
    title: "Coding Master Agent",
    description:
      "Architects, writes, reviews, and debugs production code across 20+ languages with automated syntax inspection and explanations.",
    icon: Code2,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    tag: "Full-Stack Engineering",
    capabilities: ["Full-Stack App Architecture", "Root-Cause Debugging", "Syntax-Highlighted Outputs"],
  },
  {
    id: "web_builder",
    title: "Website Builder Agent",
    description:
      "Builds complete interactive web apps and responsive landing pages with live in-browser preview sandboxes.",
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    tag: "Live Interactive Sandbox",
    capabilities: ["Multi-File HTML/CSS/JS", "Instant Live Code Sandbox", "Modern Tailwind/Glass UI"],
  },
  {
    id: "pdf_rag",
    title: "PDF RAG Agent",
    description:
      "Deep semantic vector search and question answering over multi-page PDF documents backed by Qdrant vector database.",
    icon: FileSearch,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    tag: "Qdrant Vector RAG",
    capabilities: ["Vector Similarity Chunker", "Exact Page-Grounded Citations", "Complex Financial & Doc QA"],
  },
  {
    id: "pdf_gen",
    title: "PDF Document Generator",
    description:
      "Creates publication-grade formatted PDF documents, executive summaries, invoices, and research papers delivered to AWS S3.",
    icon: FileText,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    tag: "Automated ReportLab + S3",
    capabilities: ["ReportLab Typography", "Custom Tables & Charts", "Direct S3 Signed Download"],
  },
  {
    id: "ppt_gen",
    title: "PPT Deck Agent",
    description:
      "Converts topics and project briefs into professional multi-slide PowerPoint presentations with structured layouts.",
    icon: Presentation,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    tag: "python-pptx Engine",
    capabilities: ["Structured Slide Outlines", "Executive Visual Themes", "Instant .pptx Download"],
  },
  {
    id: "search",
    title: "Search & Research Swarm",
    description:
      "Real-time web retrieval swarm that browses the live internet via Tavily, cross-references sources, and compiles verified summaries.",
    icon: Search,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    tag: "Tavily Real-Time Web",
    capabilities: ["Live Web Indexing", "Source Link Verifications", "Anti-Hallucination Grounding"],
  },
  {
    id: "vision",
    title: "Vision AI Generator",
    description:
      "Transforms descriptive natural-language prompts into high-resolution, photorealistic visuals and digital asset illustrations.",
    icon: Sparkles,
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
    tag: "Pollinations AI + S3",
    capabilities: ["Photorealistic Image Engine", "Custom Aspect Ratios", "Persistent S3 Cloud Storage"],
  },
  {
    id: "image_analyzer",
    title: "Multimodal Image Analyzer",
    description:
      "Performs deep optical character recognition (OCR), visual diagram reasoning, flowchart breakdown, and chart data extraction.",
    icon: Eye,
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
    tag: "Gemini Multimodal Vision",
    capabilities: ["Accurate OCR Text Extraction", "Architecture Diagram Analysis", "Visual Chart Breakdown"],
  },
];
