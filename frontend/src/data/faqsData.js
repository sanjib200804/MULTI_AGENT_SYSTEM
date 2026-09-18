export const faqsData = [
  {
    question: "What is Agentra and how does the multi-agent system work?",
    answer: "Agentra is an enterprise-grade multi-agent AI ecosystem built on LangGraph state machines and FastAPI microservices. Instead of relying on a single generic prompt, incoming requests are analyzed by an intelligent Router Agent that dynamically delegates tasks to specialized nodes—including Coding, Web Building, PDF RAG with Qdrant, PPT Deck Generation, Tavily Web Search, and Multimodal Vision."
  },
  {
    question: "How does the PDF RAG Agent ground its responses?",
    answer: "When you upload a PDF, Agentra chunks the text, computes dense embeddings, and indexes them directly into our Qdrant vector database. User queries perform vector similarity search to retrieve exact page-level text segments, eliminating hallucinations and providing grounded citations for every answer."
  },
  {
    question: "What happens when I ask the Website Builder to create an app?",
    answer: "The Website Builder Agent generates complete, responsive HTML, CSS, and modern interactive JavaScript. The output is streamed into a live in-browser sandbox iframe where you can immediately preview, interact with, test responsiveness, and export the clean source code."
  },
  {
    question: "How do credits and rate limits function?",
    answer: "Every new account receives 100 free credits upon sign-up. Each agent execution consumes a calibrated amount of credits based on LLM token complexity and tool utilization (e.g., standard chat is 1-2 credits, while full-stack web builds or multi-page RAG ingestions consume 5-10 credits). You can monitor your live balance at all times in the navigation header."
  },
  {
    question: "Are my documents, chats, and generated assets private?",
    answer: "Yes. All conversations and metadata are isolated within dedicated PostgreSQL schemas, sessions are guarded by Redis token blacklists, and generated binary artifacts (PDFs, PPTXs, images) are encrypted and stored in private AWS S3 buckets with time-limited presigned access URLs."
  },
  {
    question: "Can I run Agentra locally or self-host the microservices?",
    answer: "Absolutely. Agentra is containerized with Docker Compose and includes a one-click native Windows launcher (`start_all.bat`). You can spin up the Gateway, Auth, Chat, Agent microservices, alongside PostgreSQL and Redis, in under two minutes."
  }
];