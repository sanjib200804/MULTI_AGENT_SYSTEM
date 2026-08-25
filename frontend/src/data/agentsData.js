import {
  Sparkles,
  Image as ImageIcon,
  FileSearch,
  Presentation,
  Code2,
  Globe,
  Zap,
} from "lucide-react";

export const agentsList = [
  { id: "auto", name: "Auto", icon: Sparkles },
  { id: "image", name: "Image", icon: ImageIcon },
  { id: "pdfRag", name: "PDF RAG", icon: FileSearch },
  { id: "ppt", name: "PPT Deck", icon: Presentation },
  { id: "coding", name: "Code Master", icon: Code2 },
  { id: "search", name: "Web Search", icon: Globe },
  { id: "website", name: "Web Builder", icon: Zap },
];

export const agentInfo = {
  auto: "Agentra automatically routes your prompt to the best-suited AI agent.",
  image: "Generate photorealistic artwork or analyze attached images and visual details.",
  pdfRag: "Attach a PDF document to query and extract deep insights using RAG.",
  ppt: "Describe a topic — Agentra creates complete presentation slide decks.",
  coding: "Write, review, or debug code across any language or technology stack.",
  search: "Perform live web searches for up-to-date events, news, and research.",
  website: "Describe a web component or page layout to generate working HTML code.",
};

export const promptSuggestions = [
  {
    label: "Generate a futuristic cyberpunk city artwork",
    agentId: "image",
    icon: ImageIcon,
    desc: "Image Generation & Vision",
  },
  {
    label: "Deep query a PDF document with RAG",
    agentId: "pdfRag",
    icon: FileSearch,
    desc: "PDF Knowledge Base",
  },
  {
    label: "Build a responsive dark-mode portfolio site",
    agentId: "website",
    icon: Zap,
    desc: "Web App Generator",
  },
  {
    label: "Write a Python function to parse CSV files",
    agentId: "coding",
    icon: Code2,
    desc: "Code Master",
  },
];
