import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SquarePen, Trash2, LogOut, MessageSquare } from "lucide-react";

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    conversations,
    activeConversationId,
    setActiveConversationId,
    handleNewChat,
    handleDeleteConversation,
    user,
    logout,
}) {
    const userInitials = (user?.fullname || user?.displayName || user?.name || "U").slice(0, 1).toUpperCase();

    return (
        <>
            {/* Mobile backdrop overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR — Quiet Productivity Navigation */}
            <aside
                className={`
                    fixed top-16 bottom-0 left-0 z-40 flex w-64 flex-col
                    bg-white dark:bg-[#09090b]
                    border-r border-slate-200/80 dark:border-white/[0.08]
                    transition-transform duration-200 ease-out md:static md:translate-x-0 md:h-[calc(100vh-4rem)]
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* New Chat Header Button */}
                <div className="p-3 border-b border-slate-100 dark:border-white/[0.05]">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 md:hidden cursor-pointer"
                        >
                            <X size={16} />
                        </button>

                        <button
                            onClick={handleNewChat}
                            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-3 py-2 text-xs font-semibold shadow-sm transition cursor-pointer"
                            title="New conversation"
                        >
                            <SquarePen size={14} />
                            <span>New Conversation</span>
                        </button>
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 custom-scrollbar">
                    <div className="flex items-center justify-between px-2 pb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                            <MessageSquare size={12} />
                            <span>Recent Chats</span>
                        </span>
                        <span className="font-mono text-[10px] bg-slate-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded">
                            {conversations.length}
                        </span>
                    </div>

                    <div className="space-y-0.5">
                        {conversations.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 px-3 text-center rounded-lg border border-dashed border-slate-200 dark:border-white/[0.06] my-2">
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">No history yet</p>
                                <p className="text-[10px] text-slate-400/80 dark:text-slate-600 mt-1">Start a conversation to view log</p>
                            </div>
                        ) : (
                            conversations.map((conv) => {
                                const isActive = conv.id === activeConversationId;
                                return (
                                    <div
                                        key={conv.id}
                                        onClick={() => {
                                            setActiveConversationId(conv.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={`group flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer ${
                                            isActive
                                                ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white font-medium"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:text-slate-900 dark:hover:text-slate-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <MessageSquare size={13} className={`shrink-0 ${isActive ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500"}`} />
                                            <span className="truncate">{conv.title || "Untitled Conversation"}</span>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteConversation(conv.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition shrink-0 cursor-pointer"
                                            title="Delete conversation"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* User Profile Footer */}
                <div className="border-t border-slate-100 dark:border-white/[0.05] p-3 bg-slate-50/50 dark:bg-[#0c0c0f]">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2 min-w-0">
                            {user.avatar || user.photoURL ? (
                                <img className="size-7 rounded-full object-cover shrink-0" src={user.avatar || user.photoURL} alt="avatar" />
                            ) : (
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-white">
                                    {userInitials}
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                    {user.fullname || user.displayName || user.name || "User"}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            title="Sign out"
                            className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-red-500 transition cursor-pointer shrink-0"
                        >
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
