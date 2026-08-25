import {
  FileText,
  Image as ImageIcon,
  Zap,
  Search,
  Code2,
  Presentation,
} from "lucide-react";

export const agentraAgents = [
  {
    title: "PDF RAG Agent",
    description:
      "Chat with complex PDFs, extract tables, and summarize multi-page reports with instant citation memory.",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
    tag: "Document Intelligence",
  },
  {
    title: "Image Agent",
    description:
      "Generate photorealistic imagery, digital concepts, and analyze visual details or extract text from images.",
    icon: ImageIcon,
    color: "text-pink-500",
    bg: "bg-pink-500/10 border-pink-500/20",
    tag: "Visual AI & Analysis",
  },
  {
    title: "Web Builder Agent",
    description:
      "Generate responsive landing pages, UI layouts, and frontend components in working HTML & CSS.",
    icon: Zap,
    color: "text-purple-500",
    bg: "bg-purple-500/10 border-purple-500/20",
    tag: "Code & Web Generation",
  },
  {
    title: "Search Agent",
    description:
      "Real-time web research swarm that browses the live internet, verifies facts, and synthesizes answers.",
    icon: Search,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    tag: "Live Web Research",
  },
  {
    title: "Coding Master Agent",
    description:
      "Architect, write, review, and debug code across 20+ languages with automated syntax inspection.",
    icon: Code2,
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
    tag: "Full-Stack Dev",
  },
  {
    title: "PPT Deck Agent",
    description:
      "Convert ideas into complete presentation decks with automated topic breakdown and structured slides.",
    icon: Presentation,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    tag: "Presentation Deck",
  },
];
