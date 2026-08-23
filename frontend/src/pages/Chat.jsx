/* eslint-disable react-hooks/purity */
import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import MarkdownMessage from "../components/MarkdownMessage";
import api from "../utils/axiosIntences";
import {
    Send,
    Plus,
    LogOut,
    Bot,
    Copy,
    Check,
    Paperclip,
    Menu,
    X,
    ChevronRight,
    PenSquare,
    Trash2,
    SquarePen,
    Sparkles,
    Globe,
    Code2,
    FileText,
    Presentation,
    Zap
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
        { id: "auto",    name: "Auto",    icon: Sparkles  },
        { id: "pdfRag",  name: "PDF",     icon: FileText  },
        { id: "ppt",     name: "PPT",     icon: Presentation },
        { id: "coding",  name: "Code",    icon: Code2     },
        { id: "search",  name: "Search",  icon: Globe     },
        { id: "website", name: "Build",   icon: Zap       },
    ];

    const agentInfo = {
        auto:    "Agentra automatically routes your prompt to the best-suited agent.",
        pdfRag:  "Attach a PDF using the clip icon, then ask questions about it.",
        ppt:     "Describe your presentation topic — Agentra builds the deck for you.",
        coding:  "Write, debug, or explain code in any language.",
        search:  "Search the web for live, real-time information.",
        website: "Describe a page and Agentra generates a working website.",
    };

    const getPlaceholderText = () => {
        if (selectedFile) return `Instructions for "${selectedFile.name}"…`;
        switch (selectedAgent) {
            case "pdfRag":  return "Attach a PDF, then ask anything about it…";
            case "ppt":     return "E.g., Create a 5-slide deck on machine learning…";
            case "coding":  return "E.g., Write a Python function to parse CSV files…";
            case "search":  return "E.g., What are the latest SpaceX Starbase updates?";
            case "website": return "E.g., Build a dark-themed designer portfolio…";
            default:        return "Message Agentra…";
        }
    };

    const messagesEndRef = useRef(null);
    const fileInputRef   = useRef(null);
    const textareaRef    = useRef(null);

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
                <div className="flex flex-col items-center gap-3">
                    <div className="size-10 animate-spin rounded-full border-2 border-slate-300 dark:border-slate-700 border-t-slate-800 dark:border-t-white" />
                    <p className="text-sm text-slate-400">Loading…</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    // ── Handlers ────────────────────────────────────────────────────────────

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
                content: "Sorry, Agentra encountered an error. Please try again.",
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

    // ── Prompt suggestion cards ─────────────────────────────────────────────
    const promptSuggestions = [
        { label: "Write a Python odd/even checker", icon: Code2 },
        { label: "Summarize a PDF document",        icon: FileText },
        { label: "Search latest AI news",           icon: Globe },
        { label: "Build a portfolio website",       icon: Zap },
    ];

    // ── Render ──────────────────────────────────────────────────────────────
    return (
        <div className="flex h-screen w-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans overflow-hidden">

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ═══════════════════════════════════════════════════════════════
                SIDEBAR — ChatGPT style
            ══════════════════════════════════════════════════════════════════ */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 flex w-64 flex-col
                bg-slate-50 dark:bg-slate-900
                border-r border-slate-200 dark:border-slate-800
                transition-transform duration-300 md:static md:translate-x-0
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                {/* Top actions */}
                <div className="flex items-center justify-between p-2 pt-3">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition md:hidden cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                    <span className="text-sm font-semibold text-slate-700 dark:text-white ml-1">Agentra</span>
                    <button
                        onClick={handleNewChat}
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
                        title="New conversation"
                    >
                        <SquarePen size={17} />
                    </button>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto px-2 py-1">
                    <p className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Recent
                    </p>
                    <div className="space-y-0.5">
                        {conversations.length === 0 ? (
                            <p className="px-3 py-4 text-xs text-slate-400 dark:text-slate-600 italic">No conversations yet</p>
                        ) : (
                            conversations.map(conv => (
                                <div
                                    key={conv.id}
                                    className={`group relative flex items-center rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                                        conv.id === activeConversationId
                                            ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-white"
                                    }`}
                                    onClick={() => { setActiveConversationId(conv.id); setSidebarOpen(false); }}
                                >
                                    <span className="flex-1 truncate text-xs">{conv.title || "Untitled"}</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteConversation(conv.id); }}
                                        className="opacity-0 group-hover:opacity-100 ml-1 p-1 rounded hover:text-red-400 transition shrink-0 cursor-pointer"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* User profile footer */}
                <div className="border-t border-slate-200 dark:border-slate-800 p-2">
                    <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition">
                        {user.avatar || user.photoURL ? (
                            <img className="size-7 rounded-full" src={user.avatar || user.photoURL} alt="avatar" />
                        ) : (
                            <div className="flex size-7 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                                {userInitials}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-700 dark:text-white truncate">
                                {user.fullname || user.displayName || "User"}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                        </div>
                        <button onClick={logout} title="Sign out" className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer shrink-0">
                            <LogOut size={14} />
                        </button>
                    </div>
                    <div className="mt-1 px-2">
                        <span className="text-[10px] text-slate-400">
                            Credits: <span className="font-semibold text-purple-500">
                                {user.credit ?? user.credits ?? 100}
                            </span> / {user.totalCredits || 100}
                        </span>
                    </div>
                </div>
            </aside>

            {/* ═══════════════════════════════════════════════════════════════
                MAIN CONTENT AREA
            ══════════════════════════════════════════════════════════════════ */}
            <main className="relative flex flex-1 flex-col h-full overflow-hidden">

                {/* Topbar */}
                <header className="flex h-12 shrink-0 items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition md:hidden cursor-pointer"
                        >
                            <Menu size={18} />
                        </button>

                        {/* Model label */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-slate-700 dark:text-white">Agentra</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">v1.5</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={handleNewChat}
                            className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
                        >
                            <SquarePen size={13} />
                            New chat
                        </button>
                    </div>
                </header>

                {/* ── Message viewport ──────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (

                        /* ── Welcome / empty state ────────────────────── */
                        <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-4 text-center">
                            <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/10">
                                <Bot size={24} className="text-purple-500" />
                            </div>
                            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white mb-1">
                                How can I help you today?
                            </h1>
                            <p className="text-sm text-slate-400 mb-8">
                                Powered by Agentra's multi-agent AI — coding, search, PDF analysis and more.
                            </p>

                            {/* Suggestion cards */}
                            <div className="grid grid-cols-2 gap-2 w-full">
                                {promptSuggestions.map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleSendMessage(s.label)}
                                            className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-left text-xs text-slate-600 dark:text-slate-300 hover:border-purple-400/50 dark:hover:border-purple-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer group"
                                        >
                                            <Icon size={15} className="mt-0.5 shrink-0 text-purple-400 group-hover:text-purple-500 transition" />
                                            <span className="leading-relaxed">{s.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    ) : (

                        /* ── Message thread ───────────────────────────── */
                        <div className="max-w-3xl mx-auto w-full px-4 py-6 space-y-6 pb-40">
                            {messages.map(msg => {
                                const isUser = msg.role === "user" || msg.sender === "user";
                                const text   = msg.content || msg.text || "";
                                const timeString = msg.created_at
                                    ? new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                    : "Just now";

                                return (
                                    <div key={msg.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>

                                        {/* AI avatar */}
                                        {!isUser && (
                                            <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-800 text-white">
                                                <Bot size={14} />
                                            </div>
                                        )}

                                        <div className={`group flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%]`}>
                                            {/* Bubble / text */}
                                            {isUser ? (
                                                /* User — pill bubble */
                                                <div className="rounded-2xl rounded-tr-sm bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 whitespace-pre-wrap leading-relaxed">
                                                    {text}
                                                </div>
                                            ) : (
                                                /* AI — flat text with markdown */
                                                <div className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                                                    <MarkdownMessage content={text} isUser={false} />

                                                    {/* Render returned images */}
                                                    {msg.images && msg.images.length > 0 && (
                                                        <div className="mt-3 grid gap-2 grid-cols-2 max-w-lg">
                                                            {msg.images.map((img, idx) => (
                                                                <img key={idx} src={img} alt="Agent result" className="rounded-xl border border-slate-200 dark:border-white/10 max-h-48 w-full object-cover" />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Action bar */}
                                            <div className={`mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? "flex-row-reverse" : ""}`}>
                                                <span className="text-[10px] text-slate-400 px-1">{timeString}</span>
                                                {!isUser && (
                                                    <button
                                                        onClick={() => handleCopy(msg.id, text)}
                                                        className="flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
                                                    >
                                                        {copiedId === msg.id ? <><Check size={10} className="text-green-500" /> Copied</> : <><Copy size={10} /> Copy</>}
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* User avatar */}
                                        {isUser && (
                                            <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                                                {userInitials}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Thinking dots */}
                            {isThinking && (
                                <div className="flex gap-3 justify-start">
                                    <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-800 text-white">
                                        <Bot size={14} />
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3">
                                        <span className="size-2 rounded-full bg-purple-400 dark:bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="size-2 rounded-full bg-purple-400 dark:bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="size-2 rounded-full bg-purple-400 dark:bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* ── Floating input dock ───────────────────────────────── */}
                <div className="absolute bottom-0 left-0 right-0 pb-4 px-4 bg-gradient-to-t from-white dark:from-slate-950 via-white/95 dark:via-slate-950/95 to-transparent pt-8 pointer-events-none">
                    <div className="max-w-3xl mx-auto pointer-events-auto">

                        {/* File badge */}
                        {selectedFile && (
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-500/10 px-3 py-1.5 text-xs text-purple-600 dark:text-purple-400">
                                <Paperclip size={12} className="shrink-0" />
                                <span className="truncate max-w-[200px] font-medium">{selectedFile.name}</span>
                                <button onClick={() => setSelectedFile(null)} className="ml-1 text-slate-400 hover:text-red-400 transition cursor-pointer">
                                    <X size={12} />
                                </button>
                            </div>
                        )}

                        {/* Agent pills */}
                        <div className="mb-2 flex flex-wrap gap-1.5">
                            {agentsList.map(agt => {
                                const Icon   = agt.icon;
                                const active = selectedAgent === agt.id;
                                return (
                                    <button
                                        key={agt.id}
                                        onClick={() => setSelectedAgent(agt.id)}
                                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition cursor-pointer border ${
                                            active
                                                ? "bg-purple-600 text-white border-purple-600 dark:bg-purple-600 dark:border-purple-600"
                                                : "bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-700 dark:hover:text-white"
                                        }`}
                                    >
                                        <Icon size={11} />
                                        {agt.name}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Textarea container */}
                        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg focus-within:border-slate-400 dark:focus-within:border-purple-500/50 transition overflow-hidden">

                            {/* Agent hint text */}
                            <div className="px-4 pt-3 pb-1 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <span className="font-medium text-purple-500 dark:text-purple-400">{agentsList.find(a => a.id === selectedAgent)?.name}</span>
                                <span>· {agentInfo[selectedAgent]}</span>
                            </div>

                            <div className="flex items-end gap-2 px-4 pb-3">
                                {/* Hidden file input */}
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

                                {/* Attach */}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mb-0.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer shrink-0"
                                    title="Attach file"
                                >
                                    <Paperclip size={18} />
                                </button>

                                {/* Auto-growing textarea */}
                                <textarea
                                    ref={textareaRef}
                                    rows={1}
                                    value={inputMessage}
                                    onChange={e => setInputMessage(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder={getPlaceholderText()}
                                    className="flex-1 resize-none bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none py-1.5 leading-relaxed max-h-[200px] overflow-y-auto"
                                />

                                {/* Send */}
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputMessage.trim() && !selectedFile}
                                    className={`mb-0.5 flex size-8 items-center justify-center rounded-lg transition cursor-pointer shrink-0 ${
                                        inputMessage.trim() || selectedFile
                                            ? "bg-slate-800 dark:bg-purple-600 text-white hover:bg-slate-700 dark:hover:bg-purple-500 active:scale-95"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-500 cursor-not-allowed"
                                    }`}
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>

                        <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-600">
                            Agentra may make mistakes. Verify important information.
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}
