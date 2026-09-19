import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SquarePen,
  Trash2,
  LogOut,
  MessageSquare,
  PanelLeftClose,
} from "lucide-react";

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

      {/* SIDEBAR — Controlled toggle on both Desktop and Mobile */}
      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-40 flex flex-col
          bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-white/10
          transition-all duration-200 ease-out md:static md:h-[calc(100vh-4rem)]
          ${sidebarOpen ? "w-[264px] translate-x-0 shadow-2xl md:shadow-none" : "w-0 -translate-x-full overflow-hidden border-none pointer-events-none"}
        `}
      >
        {/* Top Header: Hide Sidebar button */}
        <div className="flex items-center justify-between px-3.5 pt-3.5 pb-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Navigation
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="size-7 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center justify-center transition cursor-pointer shadow-sm"
            title="Hide sidebar"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>

        {/* New Conversation Button */}
        <div className="px-3.5 pt-1.5 pb-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-bold text-xs px-3 py-2 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            title="Start new conversation"
          >
            <SquarePen size={13} />
            <span>New Conversation</span>
          </button>
        </div>

        {/* Conversation List Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1.5 text-[10px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span>Recent Chats</span>
          </span>
          <span className="font-mono text-[10px] bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/5">
            {conversations.length}
          </span>
        </div>

        {/* Conversation Items List */}
        <div className="flex-1 overflow-y-auto px-2.5 py-1 space-y-1 custom-scrollbar">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-3 text-center rounded-xl border border-dashed border-slate-200 dark:border-white/[0.07] my-2">
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">No history yet</p>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-1">Start a conversation to view log</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  title={conv.title || "Untitled Conversation"}
                  className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-100 dark:bg-white/[0.08] border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-medium shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-100/70 dark:hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <MessageSquare
                      size={14}
                      strokeWidth={1.75}
                      className={`shrink-0 transition-colors ${
                        isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-zinc-200"
                      }`}
                    />
                    <span className="truncate">{conv.title || "Untitled Conversation"}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition shrink-0 cursor-pointer"
                      title="Delete conversation"
                    >
                      <Trash2 size={12} />
                    </button>

                    {/* Indicator on Active item */}
                    {isActive && (
                      <div className="w-1.5 h-4.5 rounded-full bg-slate-900 dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_#ffffff] shrink-0 ml-1.5" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* User Profile Footer */}
        <div className="border-t border-slate-200 dark:border-white/[0.08] p-3 bg-slate-50 dark:bg-zinc-950">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              {user?.avatar || user?.photoURL ? (
                <img
                  className="size-7 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-white/10"
                  src={user.avatar || user.photoURL}
                  alt="avatar"
                />
              ) : (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-zinc-800 border border-slate-300 dark:border-white/15 text-[11px] font-bold text-slate-800 dark:text-white shadow-sm">
                  {userInitials}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {user?.fullname || user?.displayName || user?.name || "User"}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign out"
              className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-red-500 dark:hover:text-red-400 transition cursor-pointer shrink-0"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
