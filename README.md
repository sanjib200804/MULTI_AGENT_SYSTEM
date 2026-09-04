# 🤖 Agentra — Multi-Agent AI System

<div align="center">

![Agentra Banner](https://img.shields.io/badge/Agentra-Multi--Agent%20AI%20Platform-6366f1?style=for-the-badge&logo=openai&logoColor=white)

**An enterprise-grade, microservices-driven Multi-Agent AI ecosystem powered by LangGraph, FastAPI, React 19, PostgreSQL, Redis, Qdrant, and AWS S3.**

[![React](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite%20%7C%20TailwindCSS%20v4-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.11+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/Orchestration-LangGraph%20%7C%20LangChain-FF9900?style=flat-square&logo=langchain&logoColor=white)](https://www.langchain.com/langgraph)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2015-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Cache-Redis%20Alpine-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Qdrant](https://img.shields.io/badge/Vector%20DB-Qdrant-DC2626?style=flat-square&logo=qdrant&logoColor=white)](https://qdrant.tech/)
[![Docker](https://img.shields.io/badge/Containerization-Docker%20Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Specialized AI Agents](#-specialized-ai-agents)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Repository Structure](#-repository-structure)
- [Prerequisites](#-prerequisites)
- [Environment Configuration](#-environment-configuration)
- [Quick Start Guide](#-quick-start-guide)
  - [Method 1: Docker Compose (Recommended for Production/Testing)](#method-1-docker-compose-recommended)
  - [Method 2: One-Click Dev Launcher (`start_all.bat` on Windows)](#method-2-one-click-dev-launcher-start_allbat)
  - [Method 3: Manual Step-by-Step Setup](#method-3-manual-step-by-step-setup)
- [API Gateway Routes](#-api-gateway-routes)
- [Credit & Token Management](#-credit--token-management)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🌟 Overview

**Agentra** is a state-of-the-art Multi-Agent AI platform designed to automate complex workflows through coordinated, specialized autonomous agents. Utilizing **LangGraph** state machines, Agentra dynamically routes user queries to the optimal agent or coordinates multiple agent nodes to generate production-ready code, live web applications, presentations, formatted PDF reports, vector-searched document insights (RAG), photorealistic visuals, and real-time web intelligence.

Built on an asynchronous **microservices architecture**, Agentra separates authentication, chat state management, agent orchestration, and API gateway routing into resilient, independently scalable services.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Client Layer"]
        UI["React 19 + Vite Frontend<br/>(TailwindCSS v4, Framer Motion, Lenis)"]
    end

    subgraph Gateway ["Gateway Layer"]
        GW["API Gateway (Port 8000)<br/>• Reverse Proxy (httpx)<br/>• JWT Validation<br/>• CORS & Security"]
    end

    subgraph Services ["Microservices Layer"]
        AUTH["Auth Service (Port 8001)<br/>• Firebase Auth<br/>• JWT Tokens<br/>• User Credits"]
        CHAT["Chat Service (Port 8002)<br/>• Conversation Lifecycle<br/>• Message History<br/>• Artifacts"]
        AGENT["Agent Service (Port 8003)<br/>• LangGraph StateGraph<br/>• Multi-Agent Pipeline<br/>• Memory & Limits"]
    end

    subgraph Orchestration ["LangGraph Agent Orchestration"]
        ROUTER{"Intelligent Router Agent"}
        CHAT_A["Chat Agent"]
        SEARCH_A["Search Agent (Tavily)"]
        CODE_A["Coding Agent"]
        WEB_A["Website Builder"]
        PDF_A["PDF Generator"]
        RAG_A["PDF RAG Agent"]
        PPT_A["PPT Generator"]
        VIS_A["Vision Agent"]
        IMG_A["Image Analyzer"]
    end

    subgraph Storage ["Data & Storage Layer"]
        PG[(PostgreSQL 15<br/>Users, Chats, Artifacts)]
        RD[(Redis<br/>Sessions, Blacklist, Memory)]
        QD[(Qdrant Cloud<br/>Vector Store / Embeddings)]
        S3[(AWS S3<br/>PDFs, PPTs, Images)]
    end

    UI -->|HTTP / REST| GW
    GW -->|/api/auth/*| AUTH
    GW -->|/api/chat/*| CHAT
    GW -->|/api/agent/*| AGENT

    AUTH --> PG
    AUTH --> RD
    CHAT --> PG
    CHAT --> RD

    AGENT --> ROUTER
    ROUTER --> CHAT_A
    ROUTER --> SEARCH_A
    ROUTER --> CODE_A
    ROUTER --> WEB_A
    ROUTER --> PDF_A
    ROUTER --> RAG_A
    ROUTER --> PPT_A
    ROUTER --> VIS_A
    ROUTER --> IMG_A

    RAG_A --> QD
    PDF_A --> S3
    PPT_A --> S3
    VIS_A --> S3
    AGENT --> CHAT
```

---

## 🤖 Specialized AI Agents

Agentra features 9 specialized agent nodes coordinated via a LangGraph state machine:

| Agent | File | Primary Responsibility | Integrations / Tools | Output Artifacts |
| :--- | :--- | :--- | :--- | :--- |
| **Router Agent** | `router_agent.py` | Classifies query intent and dynamically routes execution | Gemini / Mistral / Groq | Graph Execution State |
| **Chat Agent** | `chat_agent.py` | Context-aware general intelligence & multi-turn dialog | Redis Memory Buffer | Markdown Responses |
| **Search Agent** | `search_agent.py` | Real-time web retrieval & news synthesis | Tavily Search API | Search Results & Links |
| **Coding Agent** | `coding_agent.py` | Code generation, architectural review, and root-cause debugging | Intent Classifier + LLM | Syntax-highlighted Code |
| **Website Builder** | `website_builder_agent.py` | Generates full responsive multi-file web apps (HTML/CSS/JS) | JSON schema parser | Live Interactive Sandbox |
| **PDF Generator** | `pdf_agent.py` | Creates structured, styled business & academic PDF documents | ReportLab + AWS S3 | Downloadable `.pdf` URL |
| **PDF RAG Agent** | `pdf_rag_agent.py` | Ingests PDFs, chunks embeddings, and performs vector semantic search | PyPDF, Qdrant Vector Store | Accurate Grounded Answers |
| **PPT Generator** | `ppt_agent.py` | Generates structured PowerPoint presentation slide decks | `python-pptx` + AWS S3 | Downloadable `.pptx` URL |
| **Vision Agent** | `vision_agent.py` | Transforms text prompts into high-detail photorealistic images | Pollinations AI + AWS S3 | AI Image URL & S3 Link |
| **Image Analyzer** | `image_analyzer_agent.py` | Multimodal visual inspection, OCR text extraction, and chart reasoning | Multimodal Gemini Vision | Visual Breakdown & OCR |

---

## ✨ Key Features

- **⚡ Microservices Architecture**: Decoupled FastAPI services for Gateway, Auth, Chat, and Agent logic.
- **🔄 Intelligent LangGraph Routing**: Seamless conditional branching based on prompt context, file attachments, or explicit user agent selection.
- **🖥️ Live Interactive Artifacts**: Real-time frontend sandbox rendering HTML/CSS/JS web pages, image previews, and direct download links for generated PDFs and PowerPoint decks.
- **🔒 Enterprise Authentication**: Firebase Authentication combined with custom JWT access/refresh token rotation, secure cookies, and Redis token blacklisting.
- **💳 Credit & Rate Limiting System**: Real-time user credit deduction per agent execution with tiered balance tracking.
- **📚 Retrieval-Augmented Generation (RAG)**: In-memory and vector-persisted document search using Qdrant and LangChain text splitters.
- **☁️ Cloud Asset Pipeline**: Automatic buffer streaming to AWS S3 with time-limited signed download URLs.
- **🎨 Modern Responsive UI**: React 19 interface with TailwindCSS v4, Framer Motion animations, Lenis smooth scrolling, and Dark/Light theme toggle.

---

## 💻 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animations & Smooth Scroll**: [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/), [React Fast Marquee](https://www.react-fast-marquee.com/)
- **Icons & Markdown**: [Lucide React](https://lucide.dev/), [React Markdown](https://github.com/remarkjs/react-markdown), [Rehype Highlight](https://github.com/rehypejs/rehype-highlight), [Remark GFM](https://github.com/remarkjs/remark-gfm)
- **Auth**: [Firebase JS SDK](https://firebase.google.com/)

### Backend Microservices
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/), [Uvicorn](https://www.uvicorn.org/)
- **HTTP Client**: [HTTPX](https://www.python-httpx.org/) (Async reverse proxy and inter-service communication)
- **Data Validation & Settings**: [Pydantic v2](https://docs.pydantic.dev/), [Pydantic Settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)
- **Database ORM**: [SQLAlchemy](https://www.sqlalchemy.org/), [Psycopg2](https://www.psycopg.org/)

### AI & Agent Orchestration
- **Frameworks**: [LangGraph](https://www.langchain.com/langgraph), [LangChain Core & Community](https://python.langchain.com/)
- **LLM Providers**: [Google Gemini](https://ai.google.dev/), [Groq](https://groq.com/), [Mistral AI](https://mistral.ai/)
- **Search Provider**: [Tavily Search API](https://tavily.com/)
- **Vector Database**: [Qdrant](https://qdrant.tech/) (`qdrant-client`, `langchain-qdrant`)
- **Document & Media Generation**: [ReportLab](https://www.reportlab.com/), [python-pptx](https://python-pptx.readthedocs.io/), [pypdf](https://pypdf.readthedocs.io/)

### Infrastructure & Cloud
- **Database**: PostgreSQL 15
- **Cache / Store**: Redis (Alpine)
- **Storage**: AWS S3 (`boto3`)
- **Containerization**: Docker, Docker Compose

---

## 📁 Repository Structure

```text
MULTI AGENT AI SYSTEM/
├── docker-compose.yml              # Multi-container orchestration (All services + DBs)
├── start_all.bat                   # Native Windows dev launcher script
├── requirements.txt                # Root shared Python dependencies
│
├── backend/
│   ├── docker-compose.yml          # Backend services compose
│   ├── shared/                     # Shared backend utilities & Redis connection
│   │   ├── .env.example
│   │   └── redis/
│   │       └── redis.py
│   │
│   ├── getaway/                    # API Gateway (Port 8000)
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── .env.example
│   │   └── app/
│   │       ├── main.py
│   │       ├── core/               # Gateway config & security middleware
│   │       └── routes/             # Reverse proxy routes (auth, chat, agent)
│   │
│   └── services/
│       ├── auth/                   # Authentication Microservice (Port 8001)
│       │   ├── Dockerfile
│       │   ├── requirements.txt
│       │   ├── .env.example
│       │   └── app/
│       │       ├── main.py
│       │       ├── models/         # User & Credits database models
│       │       ├── routes/         # Registration, Login, Token refresh, Google OAuth
│       │       └── services/       # Firebase & JWT auth logic
│       │
│       ├── chat/                   # Chat & History Microservice (Port 8002)
│       │   ├── Dockerfile
│       │   ├── requirements.txt
│       │   ├── .env.example
│       │   └── app/
│       │       ├── main.py
│       │       ├── models/         # Conversation & Message schemas
│       │       └── routes/         # Conversation CRUD, Message storage
│       │
│       └── agent/                  # Agent Orchestration Microservice (Port 8003)
│           ├── Dockerfile
│           ├── requirements.txt
│           ├── .env.example
│           └── app/
│               ├── main.py
│               ├── agents/         # 9 Specialized AI Agent nodes
│               ├── config/         # LLM models, Qdrant, Tavily configs
│               ├── core/           # LangGraph AgentState definition
│               ├── services/       # Execution pipeline & memory sync
│               ├── utils/          # S3 upload, PDF/PPT generator, credit deduction
│               └── workflows/      # LangGraph StateGraph & Router Agent
│
└── frontend/                       # React 19 Frontend (Port 5173 / Port 80)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/             # UI Components (NavBar, Sidebar, Modals, Markdown)
        │   └── chat/               # ArtifactRenderer, ChatInputDock, MessageList
        ├── context/                # AuthContext, ThemeContext
        └── pages/                  # Landing Page (Home.jsx) & Dashboard (Chat.jsx)
```

---

## ⚙️ Prerequisites

Before getting started, make sure you have the following installed:

- [Python 3.11+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/) & `npm`
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Redis, PostgreSQL, or full container stack)
- [PostgreSQL 15+](https://www.postgresql.org/) (if running natively without Docker)
- API Keys:
  - [Google Gemini API Key](https://aistudio.google.com/)
  - [Groq API Key](https://console.groq.com/) *(optional / fallback)*
  - [Mistral API Key](https://console.mistral.ai/) *(optional / fallback)*
  - [Tavily API Key](https://tavily.com/) *(for search agent)*
  - [Qdrant Cloud URL & API Key](https://qdrant.tech/) *(for PDF RAG agent)*
  - [AWS S3 Bucket & Credentials](https://aws.amazon.com/s3/) *(for PDF, PPT, and image storage)*
  - [Firebase Project & Service Account](https://firebase.google.com/) *(for Auth)*

---

## 🔐 Environment Configuration

Each microservice contains its own `.env.example` template. Configure your `.env` files accordingly:

### 1. Agent Service (`backend/services/agent/.env`)
```env
PORT=8003
GOOGLE_API_KEY="your-google-gemini-api-key"
GROQ_API_KEY="your-groq-api-key"
MISTRAL_API_KEY="your-mistral-api-key"
TAVILY_API_KEY="your-tavily-api-key"
QDRANT_API_KEY="your-qdrant-api-key"
QDRANT_URL="https://your-cluster.qdrant.tech:6333"
AWS_REGION="your-aws-region"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_KEY="your-aws-secret-key"
AWS_BUCKET_NAME="your-s3-bucket-name"
CHAT_SERVICE="http://localhost:8002"
AUTH_SERVICE="http://localhost:8001"
REDIS_URL="redis://localhost:6379"
```

### 2. Auth Service (`backend/services/auth/.env`)
```env
PORT=8001
DATABASE_URL="postgresql+psycopg2://postgres:yourpassword@localhost:5432/Agentra_db"
REDIS_URL="redis://localhost:6379"
JWT_SECRET_KEY="your-super-secret-jwt-key"
JWT_ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
COOKIE_SECURE=False
COOKIE_SAMESITE="lax"
```

### 3. Chat Service (`backend/services/chat/.env`)
```env
PORT=8002
DATABASE_URL="postgresql+psycopg2://postgres:yourpassword@localhost:5432/Agentra_db"
REDIS_URL="redis://localhost:6379"
```

### 4. API Gateway (`backend/getaway/.env`)
```env
PORT=8000
AUTH_SERVICE_URL="http://127.0.0.1:8001"
CHAT_SERVICE_URL="http://127.0.0.1:8002"
AGENT_SERVICE_URL="http://127.0.0.1:8003"
JWT_SECRET_KEY="your-super-secret-jwt-key"
JWT_ALGORITHM="HS256"
CORS_ORIGINS="http://localhost:5173,http://localhost:5174,http://localhost:80"
```

### 5. Shared Backend (`backend/shared/.env`)
```env
REDIS_URL="redis://localhost:6379"
```

---

## 🚀 Quick Start Guide

### Method 1: Docker Compose (Recommended)

Run the entire platform (Frontend, Gateway, Auth, Chat, Agent, PostgreSQL, Redis) with a single command:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/multi-agent-system.git
cd multi-agent-system

# 2. Populate environment variables in respective directories or root .env

# 3. Build and launch all containers
docker compose up --build
```

- **Frontend**: http://localhost:80
- **API Gateway**: http://localhost:8000
- **Auth Service**: http://localhost:8001
- **Chat Service**: http://localhost:8002
- **Agent Service**: http://localhost:8003

---

### Method 2: One-Click Dev Launcher (`start_all.bat`)

On Windows, use the automated launcher script which validates Docker, starts Redis, checks PostgreSQL, and opens each service in separate terminal windows:

```cmd
# Double click start_all.bat or run from command prompt:
start_all.bat
```

The script automatically:
1. Verifies Docker & starts the Redis container (`agentra_redis`).
2. Validates PostgreSQL connectivity on port `5432`.
3. Verifies frontend dependencies (`npm install`).
4. Detects and activates Python virtual environment.
5. Launches all 4 backend services + Vite frontend server simultaneously.

---

### Method 3: Manual Step-by-Step Setup

#### Step 1: Start Redis & PostgreSQL
```bash
# Start Redis container
docker run -d --name agentra_redis -p 6379:6379 redis:alpine

# Ensure PostgreSQL is running on port 5432 and database 'Agentra_db' exists
```

#### Step 2: Setup Python Virtual Environment
```bash
# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

# Install requirements
pip install -r backend/services/agent/requirements.txt
pip install -r backend/services/auth/requirements.txt
pip install -r backend/services/chat/requirements.txt
pip install -r backend/getaway/requirements.txt
```

#### Step 3: Run Backend Services (in separate terminals)
```bash
# Terminal 1: Auth Service (Port 8001)
cd backend/services/auth
uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload

# Terminal 2: Chat Service (Port 8002)
cd backend/services/chat
uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload

# Terminal 3: Agent Service (Port 8003)
cd backend/services/agent
uvicorn app.main:app --host 127.0.0.1 --port 8003 --reload

# Terminal 4: API Gateway (Port 8000)
cd backend/getaway
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### Step 4: Run Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## 📡 API Gateway Routes

The API Gateway listens on port `8000` and proxies authenticated requests to downstream services:

| Route Prefix | Target Service | Purpose |
| :--- | :--- | :--- |
| `/api/auth/register` | Auth Service (`:8001`) | User registration & initial credit allocation |
| `/api/auth/login` | Auth Service (`:8001`) | Credentials authentication & JWT issue |
| `/api/auth/google` | Auth Service (`:8001`) | Firebase Google OAuth token exchange |
| `/api/auth/me` | Auth Service (`:8001`) | Current user profile & credit balance |
| `/api/auth/refresh` | Auth Service (`:8001`) | Refresh token rotation |
| `/api/chat/conversations` | Chat Service (`:8002`) | Conversation list & creation |
| `/api/chat/messages/:id` | Chat Service (`:8002`) | Message history & artifacts retrieval |
| `/api/agent/agent` | Agent Service (`:8003`) | Multi-agent execution endpoint with file upload |

---

## 💰 Credit & Token Management

Every registered user receives **100 complimentary credits**. Each agent operation consumes credits according to computational complexity:

| Agent | Default Credit Cost | Action Description |
| :--- | :---: | :--- |
| **Chat Agent** | Free / Minimal | Standard conversational turns |
| **Search Agent** | 1 credit | Web search query & synthesis |
| **Coding Agent** | 2 credits | Code generation, review, or debugging |
| **Website Builder** | 3 credits | Full HTML/CSS/JS web project generation |
| **PDF Document** | 2 credits | PDF generation & cloud upload |
| **PDF RAG** | 2 credits | Vector search & document Q&A |
| **PPT Deck** | 3 credits | Presentation generation & upload |
| **Vision / Image** | 3 credits | Image prompt engineering & generation |
| **Image Analyzer** | 2 credits | Multimodal vision & OCR processing |

---

## 🛠️ Troubleshooting

<details>
<summary><b>1. Redis connection refused (Error 10061 / 111)</b></summary>

Ensure Docker Desktop is running and start the container:
```bash
docker start agentra_redis || docker run -d --name agentra_redis -p 6379:6379 redis:alpine
```
</details>

<details>
<summary><b>2. Gateway returns 502 Bad Gateway for Agent Service</b></summary>

- Verify that the Agent service is running on port `8003`.
- Check if your LLM API keys (`GOOGLE_API_KEY`, `TAVILY_API_KEY`, etc.) are valid and populated in `backend/services/agent/.env`.
</details>

<details>
<summary><b>3. PDF or PPT generation fails</b></summary>

- Verify your AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_KEY`, `AWS_BUCKET_NAME`, `AWS_REGION`).
- Ensure the S3 bucket has permissions allowing `PutObject` and `GetObject`.
</details>

<details>
<summary><b>4. CORS errors when calling the API Gateway</b></summary>

Make sure `CORS_ORIGINS` in `backend/getaway/.env` contains your frontend URL:
```env
CORS_ORIGINS="http://localhost:5173,http://localhost:5174,http://localhost:80"
```
</details>

---

## 📄 License

This project is licensed under the **MIT License** — see the LICENSE file for details.

---

<div align="center">
  <sub>Built with ❤️ using LangGraph, FastAPI, and React.</sub>
</div>
