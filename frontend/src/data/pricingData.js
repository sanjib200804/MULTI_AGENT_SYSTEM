import { CheckIcon } from "lucide-react";

export const pricingData = [
  {
    title: "Starter Swarm",
    price: 0,
    credits: "100 Free Credits",
    description: "Perfect for testing and experiencing all 9 autonomous agents.",
    features: [
      { name: "100 Instant Sign-up Credits", icon: CheckIcon },
      { name: "Access to All 9 Specialized Agents", icon: CheckIcon },
      { name: "Live HTML/CSS/JS Sandbox", icon: CheckIcon },
      { name: "PDF RAG with Qdrant Vector Search", icon: CheckIcon },
      { name: "Real-time Tavily Web Search", icon: CheckIcon },
    ],
    buttonText: "Start for Free",
  },
  {
    title: "Pro Engineer",
    price: 29,
    credits: "2,500 Credits/mo",
    mostPopular: true,
    description: "For engineers, creators, and teams automating mission-critical workflows.",
    features: [
      { name: "2,500 Monthly Agent Credits", icon: CheckIcon },
      { name: "Priority LangGraph Execution Queue", icon: CheckIcon },
      { name: "Full-Stack Code & Web Sandbox Export", icon: CheckIcon },
      { name: "Unlimited PDF & Document Ingestion", icon: CheckIcon },
      { name: "High-Resolution Vision & PPT Decks", icon: CheckIcon },
      { name: "Direct S3 Signed Cloud Storage", icon: CheckIcon },
    ],
    buttonText: "Upgrade to Pro",
  },
  {
    title: "Enterprise Swarm",
    price: 99,
    credits: "10,000+ Credits/mo",
    description: "Dedicated microservice throughput, zero rate limits, and custom agent nodes.",
    features: [
      { name: "10,000+ Monthly Agent Credits", icon: CheckIcon },
      { name: "Dedicated Microservice Worker Pool", icon: CheckIcon },
      { name: "Custom Tooling & Agent Node Plugins", icon: CheckIcon },
      { name: "Isolated PostgreSQL & Redis Tenants", icon: CheckIcon },
      { name: "99.9% Uptime SLA & Private VPC Deploy", icon: CheckIcon },
      { name: "24/7 Priority Architecture Support", icon: CheckIcon },
    ],
    buttonText: "Contact Enterprise",
  },
];