import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SquarePen, Trash2, LogOut, Sparkles, CreditCard, MessageSquare } from "lucide-react";

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
    const userInitials = (user?.fullname || user?.displayName || "U").slice(0, 1).toUpperCase();
    const currentCredits = user?.credit ?? user?.credits ?? 100;
    const totalCredits = user?.totalCredits || 100;
    const creditPercent = Math.min(100, Math.max(0, (currentCredits / totalCredits) * 100));

    return (
        <>
            {/* Mobile backdrop overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-md md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR — $10,000 Glassmorphic Container */}
            <aside
                className={`
                    fixed top-16 bottom-0 left-0 z-40 flex w-72 flex-col
                    bg-slate-50/95 dark:bg-slate-900/90 backdrop-blur-2xl
                    border-r border-slate-200/80 dark:border-white/10
                    shadow-xl md:shadow-none
                    transition-transform duration-300 ease-out md:static md:translate-x-0 md:h-[calc(100vh-4rem)]
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header / Brand */}
                <div className="flex items-center justify-between p-3 border-b border-slate-200/60 dark:border-white/5">
                    <div className="flex items-center gap-1 w-full justify-between">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 rounded-lg text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/10 transition md:hidden cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNewChat}
                            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 transition cursor-pointer"
                            title="New conversation"
                        >
                            <SquarePen size={14} />
                            <span>New</span>
                        </motion.button>
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 no-scrollbar">
                    <div className="flex items-center justify-between px-2 pt-1 pb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                            <MessageSquare size={12} />
                            Recent Chats
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-200/60 dark:bg-white/10 px-2 py-0.5 rounded-full">
                            {conversations.length}
                        </span>
                    </div>

                    <div className="space-y-1">
                        {conversations.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 px-4 text-center rounded-2xl border border-dashed border-slate-200 dark:border-white/5 my-2">
                                <Sparkles size={20} className="text-slate-300 dark:text-slate-700 mb-2" />
                                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">No conversations yet</p>
                                <p className="text-[10px] text-slate-400/80 dark:text-slate-600 mt-1">Start a new prompt to activate agents</p>
                            </div>
                        ) : (
                            conversations.map((conv) => {
                                const isActive = conv.id === activeConversationId;
                                return (
                                    <motion.div
                                        key={conv.id}
                                        whileHover={{ x: 3 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        onClick={() => {
                                            setActiveConversationId(conv.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={`group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-200 ${
                                            isActive
                                                ? "bg-purple-500/10 dark:bg-purple-500/15 text-purple-900 dark:text-purple-200 font-semibold border-l-3 border-purple-600 dark:border-purple-400 shadow-sm"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                    >
                                        <MessageSquare size={14} className={`shrink-0 ${isActive ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500 group-hover:text-purple-500"}`} />
                                        <span className="flex-1 truncate text-xs leading-relaxed">{conv.title || "Untitled Conversation"}</span>

                                        <motion.button
                                            whileHover={{ scale: 1.15, color: "#ef4444" }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteConversation(conv.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all shrink-0 cursor-pointer"
                                            title="Delete conversation"
                                        >
                                            <Trash2 size={13} />
                                        </motion.button>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* User Profile Footer & Credit Widget */}
                <div className="border-t border-slate-200/60 dark:border-white/5 p-3 space-y-3 bg-slate-100/40 dark:bg-slate-950/40">
                    {/* Credit Status Card */}
                    <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-2.5 shadow-sm">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 text-[11px]">
                                <CreditCard size={13} className="text-purple-500" />
                                Usage Credits
                            </span>
                            <span className="font-bold text-purple-600 dark:text-purple-400 text-[11px]">
                                {currentCredits} / {totalCredits}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${creditPercent}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                            />
                        </div>
                    </div>

                    {/* User Info Bar */}
                    <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5">
                        <div className="relative shrink-0">
                            <div className="p-[2px] rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500">
                                {user.avatar || user.photoURL ? (
                                    <img className="size-8 rounded-full object-cover" src={user.avatar || user.photoURL} alt="avatar" />
                                ) : (
                                    <div className="flex size-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                                        {userInitials}
                                    </div>
                                )}
                            </div>
                            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                                {user.fullname || user.displayName || "User"}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{user.email}</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1, color: "#ef4444" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={logout}
                            title="Sign out"
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/10 hover:text-red-500 transition cursor-pointer shrink-0"
                        >
                            <LogOut size={16} />
                        </motion.button>
                    </div>
                </div>
            </aside>
        </>
    );
}
