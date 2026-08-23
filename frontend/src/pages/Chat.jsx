/* eslint-disable react-hooks/purity */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import MarkdownMessage from "../components/MarkdownMessage";
import Sidebar from "../components/Sidebar";
import api from "../utils/axiosIntences";
import {
    Send,
    Bot,
    Copy,
    Check,
    Paperclip,
    Menu,
    X,
    SquarePen,
    Sparkles,
    Globe,
    Code2,
    FileText,
    Presentation,
    Zap,
    Eye,
    Image as ImageIcon,
    FileSearch,
    Cpu,
    ArrowUpRight
} from "lucide-react";

export default function Chat() {
    const { user, loading, logout, setIsAuthModalOpen, refetchUser } = useAuthContext();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    // Dynamic Backend State
    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState("auto");
    const [selectedFile, setSelectedFile] = useState(null);

    const agentsList = [
        { id: "auto",          name: "Auto",           icon: Sparkles   },
        { id: "vision",        name: "Vision",         icon: Eye        },
        { id: "imageAnalyzer", name: "Image Analysis", icon: ImageIcon  },
        { id: "pdfRag",        name: "PDF RAG",        icon: FileSearch },
        { id: "ppt",           name: "PPT Deck",       icon: Presentation },
        { id: "coding",        name: "Code Master",    icon: Code2      },
        { id: "search",        name: "Web Search",     icon: Globe      },
        { id: "website",       name: "Web Builder",    icon: Zap        },
    ];

    const agentInfo = {
        auto:          "Agentra automatically routes your prompt to the best-suited AI agent.",
        vision:        "Generate ultra-realistic visual artwork, graphics, and concepts.",
        imageAnalyzer: "Attach an image to extract text, describe elements, or analyze details.",
        pdfRag:        "Attach a PDF document to query and extract deep insights using RAG.",
        ppt:           "Describe a topic — Agentra creates complete presentation slide decks.",
        coding:        "Write, review, or debug code across any language or technology stack.",
        search:        "Perform live web searches for up-to-date events, news, and research.",
        website:       "Describe a web component or page layout to generate working HTML code.",
    };

    const getPlaceholderText = () => {
        if (selectedFile) return `Instructions for "${selectedFile.name}"…`;
        switch (selectedAgent) {
            case "vision":        return "E.g., A futuristic cyberpunk city illuminated by neon lights at sunset…";
            case "imageAnalyzer": return "Attach an image, then ask to explain or extract information…";
            case "pdfRag":        return "Attach a PDF file, then ask questions about its content…";
            case "ppt":           return "E.g., Create a 5-slide presentation on quantum computing…";
            case "coding":        return "E.g., Write a Python function to parse CSV files with error handling…";
            case "search":        return "E.g., What are the latest SpaceX Starbase updates?";
            case "website":       return "E.g., Build a sleek dark-themed designer portfolio website…";
            default:              return "Message Agentra multi-agent suite…";
        }
    };

    const messagesEndRef = useRef(null);
    const fileInputRef   = useRef(null);
    const textareaRef    = useRef(null);
    const agentDockRef   = useRef(null);

    // Mouse wheel horizontal scroll for Agent Pills bar
    useEffect(() => {
        const el = agentDockRef.current;
        if (!el) return;
        const handleWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };
        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, []);

    // Auto-grow textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 200) + "px";
    }, [inputMessage]);

    // Scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isThinking]);

    // Protected Route Verification
    useEffect(() => {
        if (!loading && !user) {
            navigate("/");
            setIsAuthModalOpen(true);
        }
    }, [user, loading, navigate, setIsAuthModalOpen]);

    // Fetch conversations
    useEffect(() => {
        if (!user) return;
        const fetchConversations = async () => {
            try {
                const response = await api.get("/api/chat/conversations");
                setConversations(response.data);
                if (response.data.length > 0) {
                    setActiveConversationId(response.data[0].id);
                }
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };
        fetchConversations();
    }, [user]);

    // Fetch messages when conversation changes
    useEffect(() => {
        if (!activeConversationId) return;
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/api/chat/conversations/${activeConversationId}/messages`);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [activeConversationId]);

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-slate-950 text-slate-800 dark:text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/25">
                        <Sparkles size={28} className="animate-spin text-white" />
                    </div>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase animate-pulse">
                        Initializing Agentra AI…
                    </p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    // Handlers
    const handleNewChat = async () => {
        try {
            const response = await api.post("/api/chat/conversations", { title: "New Conversation" });
            const newConv = response.data;
            setConversations(prev => [newConv, ...prev]);
            setActiveConversationId(newConv.id);
            setMessages([]);
            setSidebarOpen(false);
        } catch (error) {
            console.error("Error creating conversation:", error);
        }
    };

    const handleDeleteConversation = async (id) => {
        try {
            await api.delete(`/api/chat/conversations/${id}`);
            setConversations(prev => prev.filter(c => c.id !== id));
            if (activeConversationId === id) {
                const remaining = conversations.filter(c => c.id !== id);
                if (remaining.length > 0) {
                    setActiveConversationId(remaining[0].id);
                } else {
                    setActiveConversationId(null);
                    setMessages([]);
                }
            }
        } catch (error) {
            console.error("Error deleting conversation:", error);
        }
    };

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSendMessage = async (textToSend = inputMessage) => {
        const trimmed = textToSend.trim();
        if (!trimmed && !selectedFile) return;

        setInputMessage("");
        setIsThinking(true);

        let currentConvId = activeConversationId;

        if (!currentConvId) {
            try {
                const titleText = trimmed.length > 30 ? `${trimmed.slice(0, 27)}…` : (trimmed || "New Conversation");
                const response = await api.post("/api/chat/conversations", { title: titleText });
                const newConv = response.data;
                setConversations(prev => [newConv, ...prev]);
                setActiveConversationId(newConv.id);
                currentConvId = newConv.id;
            } catch (error) {
                console.error("Error auto-creating conversation:", error);
                setIsThinking(false);
                return;
            }
        } else {
            const activeConv = conversations.find(c => c.id === currentConvId);
            if (activeConv && ["New Conversation", "Document Chat", "Untitled Conversation"].includes(activeConv.title)) {
                const newTitle = trimmed.length > 30 ? `${trimmed.slice(0, 27)}…` : trimmed;
                api.patch(`/api/chat/conversations/${currentConvId}`, { title: newTitle })
                    .then(() => setConversations(prev => prev.map(c => c.id === currentConvId ? { ...c, title: newTitle } : c)))
                    .catch(err => console.error("Error renaming conversation:", err));
            }
        }

        const tempMsgId = Date.now().toString();
        setMessages(prev => [...prev, {
            id: tempMsgId, role: "user", content: trimmed, created_at: new Date().toISOString()
        }]);

        const fileToSend = selectedFile;
        setSelectedFile(null);

        try {
            const formData = new FormData();
            formData.append("prompt", trimmed || `Analyze uploaded file: ${fileToSend?.name}`);
            formData.append("conversation_id", currentConvId);
            formData.append("agent_name", selectedAgent);
            if (fileToSend) formData.append("file", fileToSend);

            const response = await api.post("/api/agent/", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.data.answer || response.data.content || "",
                images: response.data.images || [],
                artifacts: response.data.artifacts || [],
                created_at: new Date().toISOString()
            }]);
            refetchUser();
        } catch (error) {
            console.error("Agent error:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, Agentra encountered an error processing your request. Please try again.",
                created_at: new Date().toISOString()
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const userInitials = (user.fullname || user.displayName || "U").slice(0, 1).toUpperCase();

    // Prompt suggestion cards
    const promptSuggestions = [
        { label: "Generate a futuristic cyberpunk city artwork", agentId: "vision",        icon: Eye,        desc: "Image Generation" },
        { label: "Analyze an image or extract visual text",     agentId: "imageAnalyzer", icon: ImageIcon,  desc: "Image OCR & Vision" },
        { label: "Deep query a PDF document with RAG",         agentId: "pdfRag",        icon: FileSearch, desc: "PDF Knowledge Base" },
        { label: "Build a responsive dark-mode portfolio site",  agentId: "website",       icon: Zap,        desc: "Web App Generator" },
    ];

    return (
        <div className="flex h-screen w-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans overflow-hidden pt-16 selection:bg-purple-500/30">

            {/* Sidebar component */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                conversations={conversations}
                activeConversationId={activeConversationId}
                setActiveConversationId={setActiveConversationId}
                handleNewChat={handleNewChat}
                handleDeleteConversation={handleDeleteConversation}
                user={user}
                logout={logout}
            />

            {/* MAIN CONTENT AREA */}
            <main className="relative flex flex-1 flex-col h-full overflow-hidden bg-slate-50/60 dark:bg-slate-950/60">

                {/* Mobile floating sidebar menu button */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-20 left-4 z-30 p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 shadow-md backdrop-blur-md md:hidden cursor-pointer"
                    title="Open Sidebar"
                >
                    <Menu size={18} />
                </button>

                {/* Message Viewport */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {messages.length === 0 ? (

                        /* Welcome / Empty State */
                        <div className="relative flex flex-col items-center justify-center min-h-full max-w-3xl mx-auto px-4 py-8 text-center">

                            {/* Background ambient radial glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-gradient-to-tr from-purple-600/10 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="mb-6 flex size-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white shadow-2xl shadow-purple-500/30"
                            >
                                <Cpu size={32} />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                                className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 dark:from-white dark:via-purple-200 dark:to-slate-300 bg-clip-text text-transparent mb-3"
                            >
                                What will you build today?
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                                className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed"
                            >
                                Powered by Agentra multi-agent intelligence — select an agent mode or start typing below.
                            </motion.p>

                            {/* Prompt Suggestion Cards Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
                            >
                                {promptSuggestions.map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <motion.button
                                            key={i}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setSelectedAgent(s.agentId);
                                                handleSendMessage(s.label);
                                            }}
                                            className="group flex items-start justify-between rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 text-left shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
                                                    <Icon size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                                                        {s.label}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                                                        {s.desc}
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        </div>

                    ) : (

                        /* Message Thread */
                        <div className="max-w-3xl mx-auto w-full px-4 py-6 space-y-6 pb-48">
                            <AnimatePresence initial={false}>
                                {messages.map(msg => {
                                    const isUser = msg.role === "user" || msg.sender === "user";
                                    const text   = msg.content || msg.text || "";
                                    const timeString = msg.created_at
                                        ? new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                        : "Just now";

                                    return (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                                        >
                                            {/* AI Avatar */}
                                            {!isUser && (
                                                <div className="flex size-8 shrink-0 mt-0.5 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
                                                    <Bot size={16} />
                                                </div>
                                            )}

                                            <div className={`group flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%]`}>
                                                {isUser ? (
                                                    /* User Message Pill */
                                                    <div className="rounded-2xl rounded-tr-sm bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 px-4 py-3 text-sm text-white shadow-md border border-white/10 whitespace-pre-wrap leading-relaxed">
                                                        {text}
                                                    </div>
                                                ) : (
                                                    /* Assistant Message Box */
                                                    <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 p-4 shadow-sm text-sm text-slate-800 dark:text-slate-100 leading-relaxed w-full">
                                                        <MarkdownMessage content={text} isUser={false} />

                                                        {/* Returned Images */}
                                                        {msg.images && msg.images.length > 0 && (
                                                            <div className="mt-4 grid gap-2 grid-cols-2">
                                                                {msg.images.map((img, idx) => (
                                                                    <img key={idx} src={img} alt="Result" className="rounded-xl border border-slate-200 dark:border-white/10 max-h-48 w-full object-cover shadow-md hover:scale-[1.02] transition-transform" />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Action Toolbar */}
                                                <div className={`mt-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? "flex-row-reverse" : ""}`}>
                                                    <span className="text-[10px] text-slate-400 px-1">{timeString}</span>
                                                    {!isUser && (
                                                        <button
                                                            onClick={() => handleCopy(msg.id, text)}
                                                            className="flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-medium text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
                                                        >
                                                            {copiedId === msg.id ? (
                                                                <>
                                                                    <Check size={10} className="text-emerald-500" />
                                                                    <span className="text-emerald-500">Copied</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy size={10} />
                                                                    <span>Copy</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* User Avatar */}
                                            {isUser && (
                                                <div className="flex size-8 shrink-0 mt-0.5 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-xs font-bold text-white shadow-md shadow-purple-500/20">
                                                    {userInitials}
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {/* Thinking Dots Animation */}
                            {isThinking && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3 justify-start"
                                >
                                    <div className="flex size-8 shrink-0 mt-0.5 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md">
                                        <Bot size={16} />
                                    </div>
                                    <div className="flex items-center gap-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 px-4 py-3 shadow-sm">
                                        <span className="size-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="size-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="size-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                                        <span className="text-xs font-medium text-slate-400 ml-1">Agentra thinking…</span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Floating Input Dock ($10,000 Premium Finish) */}
                <div className="absolute bottom-0 left-0 right-0 pb-4 px-4 bg-gradient-to-t from-slate-50 via-slate-50/95 dark:from-slate-950 dark:via-slate-950/95 to-transparent pt-10 pointer-events-none">
                    <div className="max-w-3xl mx-auto pointer-events-auto">

                        {/* File Attachment Badge */}
                        <AnimatePresence>
                            {selectedFile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="mb-2.5 inline-flex items-center gap-2 rounded-xl border border-purple-300 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 px-3 py-1.5 text-xs text-purple-700 dark:text-purple-300 shadow-sm"
                                >
                                    <Paperclip size={13} className="shrink-0 text-purple-500" />
                                    <span className="truncate max-w-[220px] font-semibold">{selectedFile.name}</span>
                                    <button onClick={() => setSelectedFile(null)} className="ml-1 p-0.5 rounded-full hover:bg-purple-200/50 dark:hover:bg-purple-500/20 text-slate-400 hover:text-red-500 transition cursor-pointer">
                                        <X size={12} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Agent Selector Pills Bar */}
                        <div ref={agentDockRef} className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                            {agentsList.map(agt => {
                                const Icon = agt.icon;
                                const active = selectedAgent === agt.id;
                                return (
                                    <button
                                        key={agt.id}
                                        onClick={() => setSelectedAgent(agt.id)}
                                        className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 border ${
                                            active
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-md shadow-purple-500/25"
                                                : "bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                    >
                                        <Icon size={13} className={active ? "text-white animate-pulse" : "text-purple-500"} />
                                        <span>{agt.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Input Container */}
                        <div className="relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-2xl focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all overflow-hidden">

                            {/* Agent Hint Bar */}
                            <div className="px-4 pt-3 pb-1 text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 border-b border-slate-100 dark:border-white/5">
                                <span className="font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                                    <Sparkles size={11} />
                                    {agentsList.find(a => a.id === selectedAgent)?.name}
                                </span>
                                <span>· {agentInfo[selectedAgent]}</span>
                            </div>

                            <div className="flex items-end gap-2 px-4 py-2.5">
                                {/* Hidden File Input */}
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

                                {/* File Attach Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mb-1 p-2 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-white/10 transition cursor-pointer shrink-0"
                                    title="Attach document or image"
                                >
                                    <Paperclip size={18} />
                                </motion.button>

                                {/* Textarea Input */}
                                <textarea
                                    ref={textareaRef}
                                    rows={1}
                                    value={inputMessage}
                                    onChange={e => setInputMessage(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder={getPlaceholderText()}
                                    className="flex-1 resize-none bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none py-1.5 leading-relaxed max-h-[200px] overflow-y-auto"
                                />

                                {/* Send Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputMessage.trim() && !selectedFile}
                                    className={`mb-0.5 flex size-9 items-center justify-center rounded-xl transition-all cursor-pointer shrink-0 ${
                                        inputMessage.trim() || selectedFile
                                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                                            : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
                                    }`}
                                >
                                    <Send size={15} />
                                </motion.button>
                            </div>
                        </div>

                        <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-600">
                            Agentra Multi-Agent AI • Verify important factual information.
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}