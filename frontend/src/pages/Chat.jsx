/* eslint-disable react-hooks/purity */
import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../utils/axiosIntences";
import { Sparkles, Menu } from "lucide-react";
import ChatWelcome from "../components/chat/ChatWelcome";
import MessageList from "../components/chat/MessageList";
import ChatInputDock from "../components/chat/ChatInputDock";

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

    const getPlaceholderText = () => {
        if (selectedFile) return `Instructions for "${selectedFile.name}"…`;
        switch (selectedAgent) {
            case "image":         return "E.g., A futuristic cyberpunk city, or attach an image to analyze…";
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
            <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-[#0A0A0F] text-slate-800 dark:text-white">
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

    return (
        <div className="flex h-screen w-screen bg-slate-50 dark:bg-[#0A0A0F] text-slate-800 dark:text-slate-100 font-sans overflow-hidden pt-16 selection:bg-purple-500/30">

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
            <main className="relative flex flex-1 flex-col h-full overflow-hidden bg-slate-50/60 dark:bg-[#0A0A0F]/60">

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
                        <ChatWelcome
                            setSelectedAgent={setSelectedAgent}
                            handleSendMessage={handleSendMessage}
                        />
                    ) : (
                        <MessageList
                            messages={messages}
                            isThinking={isThinking}
                            userInitials={userInitials}
                            copiedId={copiedId}
                            handleCopy={handleCopy}
                            messagesEndRef={messagesEndRef}
                        />
                    )}
                </div>

                {/* Floating Input Dock */}
                <ChatInputDock
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                    selectedAgent={selectedAgent}
                    setSelectedAgent={setSelectedAgent}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    handleFileChange={handleFileChange}
                    handleSendMessage={handleSendMessage}
                    handleKeyPress={handleKeyPress}
                    getPlaceholderText={getPlaceholderText}
                    agentDockRef={agentDockRef}
                    fileInputRef={fileInputRef}
                    textareaRef={textareaRef}
                />

            </main>
        </div>
    );
}