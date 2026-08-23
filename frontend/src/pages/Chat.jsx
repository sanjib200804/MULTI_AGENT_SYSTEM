/* eslint-disable react-hooks/purity */
import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosIntences";
import {
    Send,
    Plus,
    LogOut,
    Bot,
    Sparkles,
    History,
    Settings,
    Database,
    Copy,
    Check,
    Paperclip,
    Menu,
    X,
    ChevronRight,
    Terminal,
    ArrowLeft,
    Trash2
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
    
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Scroll to bottom of message panel
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    // Protected Route Verification
    useEffect(() => {
        if (!loading && !user) {
            navigate("/");
            setIsAuthModalOpen(true);
        }
    }, [user, loading, navigate, setIsAuthModalOpen]);

    // Fetch conversations list on mount/user load
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
                console.error("Error fetching workspaces:", error);
            }
        };
        fetchConversations();
    }, [user]);

    // Fetch messages when active conversation changes
    useEffect(() => {
        if (!activeConversationId) return;
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/api/chat/conversations/${activeConversationId}/messages`);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching workspace messages:", error);
            }
        };
        fetchMessages();
    }, [activeConversationId]);

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
                <div className="relative flex flex-col items-center">
                    <div className="size-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
                    <p className="mt-4 text-sm text-slate-400 font-medium tracking-wide animate-pulse">
                        Authenticating session...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    // Create a new conversation workspace
    const handleNewChat = async () => {
        try {
            const response = await api.post("/api/chat/conversations", {
                title: "New Conversation"
            });
            const newConv = response.data;
            setConversations(prev => [newConv, ...prev]);
            setActiveConversationId(newConv.id);
            setMessages([]);
            setSidebarOpen(false);
        } catch (error) {
            console.error("Error creating workspace:", error);
        }
    };

    // Delete a conversation workspace
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
            console.error("Error deleting workspace:", error);
        }
    };

    // Handle Copy Clip
    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Handle File Attachment Trigger
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Handle Send Message
    const handleSendMessage = async (textToSend = inputMessage) => {
        const trimmed = textToSend.trim();
        if (!trimmed && !selectedFile) return;

        setInputMessage("");
        setIsThinking(true);

        let currentConvId = activeConversationId;

        // Auto-create workspace if none exists
        if (!currentConvId) {
            try {
                const titleText = trimmed.length > 30 ? `${trimmed.slice(0, 27)}...` : (trimmed || "Document Chat");
                const response = await api.post("/api/chat/conversations", {
                    title: titleText
                });
                const newConv = response.data;
                setConversations(prev => [newConv, ...prev]);
                setActiveConversationId(newConv.id);
                currentConvId = newConv.id;
            } catch (error) {
                console.error("Error auto-creating workspace:", error);
                setIsThinking(false);
                return;
            }
        }

        // Add user message optimistically to local feed
        const tempMsgId = Date.now().toString();
        const userMsg = {
            id: tempMsgId,
            role: "user",
            content: trimmed,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMsg]);

        // Capture current file and clear state
        const fileToSend = selectedFile;
        setSelectedFile(null);

        try {
            // Prepare multipart form data payload
            const formData = new FormData();
            formData.append("prompt", trimmed || `Analyze uploaded file: ${fileToSend.name}`);
            formData.append("conversation_id", currentConvId);
            formData.append("agent_name", selectedAgent);
            if (fileToSend) {
                formData.append("file", fileToSend);
            }

            // POST to gateway proxy agent service
            const response = await api.post("/api/agent/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            // Add Assistant message response
            const agentMsg = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.data.answer || response.data.content || "",
                images: response.data.images || [],
                artifacts: response.data.artifacts || [],
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, agentMsg]);
            refetchUser();
        } catch (error) {
            console.error("Error from agent call:", error);
            const errorMsg = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, Agentra encountered an error processing your query. Please verify connection credentials and try again.",
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMsg]);
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

    const promptSuggestions = [
        "Setup Customer Support bot",
        "Index PDFs for RAG search",
        "Automate reports to Slack"
    ];

    return (
        <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
            {/* Sidebar Drawer Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ==========================================
                SIDEBAR (Desktop & Drawer Mobile)
            ========================================== */}
            <aside
                className={`fixed inset-y-0 left-0 z-45 flex w-72 flex-col border-r border-slate-900 bg-slate-950 transition-transform duration-300 md:static md:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header / Logo */}
                <div className="flex h-16 items-center justify-between px-6 border-b border-slate-900">
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
                            <Bot size={18} />
                        </div>
                        <span className="text-base font-bold tracking-tight text-white">Agentra AI</span>
                    </div>
                    
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1 rounded text-slate-400 hover:bg-slate-900 md:hidden cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Sidebar Action - Create New Conversation */}
                <div className="p-4">
                    <button 
                        onClick={handleNewChat}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-600/10 hover:bg-purple-700 active:scale-[0.98] transition cursor-pointer"
                    >
                        <Plus size={16} />
                        New Conversation
                    </button>
                </div>

                {/* Navigation List */}
                <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
                    {/* Active Conversations */}
                    <div>
                        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                            Recent Conversations
                        </p>
                        <div className="space-y-1">
                            {conversations.length === 0 ? (
                                <p className="px-3 py-2 text-xs text-slate-600 italic">No conversations</p>
                            ) : (
                                conversations.map(conv => (
                                    <div
                                        key={conv.id}
                                        className={`group flex items-center justify-between rounded-lg py-1 px-2 text-xs font-medium transition-colors ${
                                            conv.id === activeConversationId 
                                                ? "bg-purple-600/10 border border-purple-500/20 text-purple-400" 
                                                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                                        }`}
                                    >
                                        <button
                                            onClick={() => {
                                                setActiveConversationId(conv.id);
                                                setSidebarOpen(false);
                                            }}
                                            className="flex flex-1 items-center gap-2.5 py-1 px-1 text-left min-w-0 cursor-pointer"
                                        >
                                            <History size={13} className="shrink-0 text-slate-500" />
                                            <span className="truncate">{conv.title || "Untitled Conversation"}</span>
                                        </button>
                                        
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteConversation(conv.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 hover:bg-slate-800 rounded transition shrink-0 ml-1 cursor-pointer"
                                            title="Delete Conversation"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                            Platform
                        </p>
                        <div className="space-y-1">
                            <button className="flex w-full items-center gap-2.5 rounded-lg py-2 px-3 text-left text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition cursor-pointer">
                                <Sparkles size={14} />
                                Agents Registry
                            </button>
                            <button className="flex w-full items-center gap-2.5 rounded-lg py-2 px-3 text-left text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition cursor-pointer">
                                <Database size={14} />
                                RAG Knowledge Bases
                            </button>
                            <button className="flex w-full items-center gap-2.5 rounded-lg py-2 px-3 text-left text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition cursor-pointer">
                                <Terminal size={14} />
                                Developer APIs
                            </button>
                            <button className="flex w-full items-center gap-2.5 rounded-lg py-2 px-3 text-left text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition cursor-pointer">
                                <Settings size={14} />
                                Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom User Area */}
                <div className="border-t border-slate-900 p-4 bg-slate-950/60">
                    <div className="flex items-center gap-3 mb-4">
                        {user.avatar || user.photoURL ? (
                            <img
                                className="size-9 rounded-full border border-slate-800"
                                src={user.avatar || user.photoURL}
                                alt={user.fullname || user.displayName || "User"}
                            />
                        ) : (
                            <div className="flex size-9 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white uppercase">
                                {(user.fullname || user.displayName || "US").slice(0, 2)}
                            </div>
                        )}
                        <div className="truncate text-left flex-1">
                            <p className="text-xs font-semibold text-white truncate">
                                {user.fullname || user.displayName || "Agentra User"}
                            </p>
                            <div className="flex items-center justify-between mt-0.5">
                                <p className="text-[10px] text-slate-400 truncate flex-1 mr-2">
                                    {user.email}
                                </p>
                                <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/15 shrink-0">
                                    {user.credit !== undefined ? user.credit : (user.credits !== undefined ? user.credits : 100)} / {user.totalCredits || 100} CR
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-800 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition cursor-pointer"
                    >
                        <LogOut size={13} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* ==========================================
                MAIN CHAT SPACE
            ========================================== */}
            <main className="flex flex-1 flex-col h-full overflow-hidden bg-slate-950">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-slate-900 px-6 shrink-0 bg-slate-950/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-1 rounded text-slate-400 hover:bg-slate-900 md:hidden cursor-pointer"
                        >
                            <Menu size={20} />
                        </button>
                        
                        <button 
                            onClick={() => navigate("/")}
                            className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mr-2 cursor-pointer"
                        >
                            <ArrowLeft size={13} />
                            Exit to Home
                        </button>
                        
                        <div className="flex items-center gap-2 text-left">
                            <h2 className="text-sm font-semibold text-white">Agentra Core v1.5</h2>
                            <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium bg-green-500/10 py-0.5 px-2 rounded-full">
                                <span className="size-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                Online
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Agent Selector Dropdown */}
                        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
                            <span className="text-[10px] text-slate-500 uppercase font-semibold">Agent:</span>
                            <select
                                value={selectedAgent}
                                onChange={(e) => setSelectedAgent(e.target.value)}
                                className="bg-transparent text-xs font-semibold text-purple-400 outline-none cursor-pointer focus:ring-0 focus:border-transparent pr-1"
                            >
                                <option value="auto" className="bg-slate-950 text-white">Core Orchestrator</option>
                                <option value="coding_agent" className="bg-slate-950 text-white">Coding Agent</option>
                                <option value="pdf_rag_agent" className="bg-slate-950 text-white">PDF RAG Agent</option>
                                <option value="image_analyzer_agent" className="bg-slate-950 text-white">Image Analyzer</option>
                                <option value="website_builder_agent" className="bg-slate-950 text-white">Website Builder</option>
                                <option value="chat_agent" className="bg-slate-950 text-white">General Chat</option>
                            </select>
                        </div>
                        <span className="hidden sm:inline text-[10px] text-slate-500 bg-slate-900/40 border border-slate-900 px-2 py-1 rounded-md">Latency: 12ms</span>
                    </div>
                </header>

                {/* Viewport Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                    {messages.length === 0 ? (
                        /* Welcome Empty State */
                        <div className="flex flex-col items-center justify-center h-full text-center max-w-xl mx-auto py-12">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-600/10 border border-purple-500/20 text-purple-500 mb-6 animate-pulse">
                                <Bot size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Deploy an Agent</h3>
                            <p className="mt-2 text-sm text-slate-400">
                                Connect to database sources, write script integrations, or prompt Agentra to draft custom task automations.
                            </p>

                            {/* Prompt suggestion chips */}
                            <div className="mt-8 grid gap-3 sm:grid-cols-3 w-full">
                                {promptSuggestions.map((prompt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSendMessage(prompt)}
                                        className="flex items-center justify-between rounded-xl border border-slate-900 bg-slate-900/30 p-3 text-left text-xs text-slate-400 hover:border-purple-500/30 hover:bg-slate-900 hover:text-white transition group cursor-pointer"
                                    >
                                        <span>{prompt}</span>
                                        <ChevronRight size={12} className="text-slate-600 group-hover:text-purple-400 transition" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Message Stream */
                        <div className="max-w-3xl mx-auto space-y-6">
                            {messages.map(msg => {
                                const isUser = msg.role === "user" || msg.sender === "user";
                                const text = msg.content || msg.text || "";
                                const timeString = msg.created_at
                                    ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : (msg.time || "Just now");

                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-4 ${
                                            isUser ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        {/* Agent Avatar */}
                                        {!isUser && (
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white">
                                                <Bot size={16} />
                                            </div>
                                        )}

                                        {/* Bubble */}
                                        <div
                                            className={`group relative max-w-[85%] rounded-2xl p-4 text-xs leading-6 ${
                                                isUser
                                                    ? "bg-purple-600/15 border border-purple-500/20 text-slate-100 rounded-tr-none"
                                                    : "bg-slate-900/50 border border-slate-900 text-slate-100 rounded-tl-none"
                                            }`}
                                        >
                                            <p className="whitespace-pre-wrap">{text}</p>

                                            {/* Render images returned from agent workspace */}
                                            {msg.images && msg.images.length > 0 && (
                                                <div className="mt-3 grid gap-2 grid-cols-2 max-w-lg">
                                                    {msg.images.map((img, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={img}
                                                            alt="Agent workspace visualization"
                                                            className="rounded-xl border border-slate-800 max-h-48 w-full object-cover shadow"
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Render artifacts (code / scripts / etc) */}
                                            {msg.artifacts && msg.artifacts.length > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    {msg.artifacts.map((art, idx) => (
                                                        <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-slate-300">
                                                            <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-1 text-[11px]">
                                                                <Terminal size={12} className="text-purple-400" />
                                                                <span>Artifact: {art.name || `Asset ${idx + 1}`}</span>
                                                            </div>
                                                            {art.code ? (
                                                                <pre className="overflow-x-auto text-[10px] bg-black/30 p-2 rounded border border-slate-900/50 font-mono text-left max-h-40">
                                                                    <code>{art.code}</code>
                                                                </pre>
                                                            ) : (
                                                                <p className="text-[10px] text-slate-400">{art.description || "Compiled result file."}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            {/* Utility bar for agent messages (Copy) */}
                                            {!isUser && (
                                                <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/40 pt-2 text-[10px] text-slate-500">
                                                    <span>{timeString}</span>
                                                    <button
                                                        onClick={() => handleCopy(msg.id, text)}
                                                        className="flex items-center gap-1 rounded bg-slate-950 py-0.5 px-2 text-[9px] hover:bg-slate-800 hover:text-white transition cursor-pointer"
                                                    >
                                                        {copiedId === msg.id ? (
                                                            <>
                                                                <Check size={10} className="text-green-400" />
                                                                Copied
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy size={10} />
                                                                Copy text
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            )}

                                            {isUser && (
                                                <div className="mt-1.5 text-right text-[9px] text-slate-500">
                                                    {timeString}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Thinking State */}
                            {isThinking && (
                                <div className="flex gap-4 justify-start">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white">
                                        <Bot size={16} />
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-2xl bg-slate-900/50 border border-slate-900 py-4.5 px-6 rounded-tl-none">
                                        <span className="size-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="size-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="size-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-900 bg-slate-950/80 backdrop-blur shrink-0">
                    <div className="max-w-3xl mx-auto">
                        
                        {/* File Attachment Status Badge */}
                        {selectedFile && (
                            <div className="mb-2 flex items-center justify-between rounded-xl border border-purple-500/25 bg-purple-500/5 p-2 px-3 text-xs text-purple-400 animate-fadeIn max-w-md">
                                <div className="flex items-center gap-2 truncate">
                                    <Paperclip size={14} className="shrink-0 text-purple-500" />
                                    <span className="font-medium truncate">{selectedFile.name}</span>
                                    <span className="text-[10px] text-slate-500 shrink-0">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedFile(null)}
                                    className="p-1 text-slate-400 hover:text-red-400 rounded transition cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}

                        <div className="relative flex items-center rounded-xl border border-slate-900 bg-slate-900/20 focus-within:border-purple-600 transition p-1.5">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-slate-400 hover:text-white transition cursor-pointer"
                                title="Attach file for knowledge base indexing"
                            >
                                <Paperclip size={18} />
                            </button>
                            
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={e => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder={selectedFile ? "Provide instructions for the attached file..." : "Type a message or command..."}
                                className="flex-1 bg-transparent px-3 text-xs text-white placeholder-slate-500 outline-none"
                            />

                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputMessage.trim() && !selectedFile}
                                className="flex size-9 items-center justify-center rounded-lg bg-purple-600 text-white shadow-md shadow-purple-600/20 hover:bg-purple-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
                            >
                                <Send size={15} />
                            </button>
                        </div>
                        <p className="mt-2 text-center text-[10px] text-slate-500">
                            Agentra AI can compile code and execute web calls. Verify key values.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
