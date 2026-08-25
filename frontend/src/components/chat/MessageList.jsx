import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Copy, Check } from "lucide-react";
import MarkdownMessage from "../MarkdownMessage";

export default function MessageList({
  messages,
  isThinking,
  userInitials,
  copiedId,
  handleCopy,
  messagesEndRef,
}) {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-6 space-y-6 pb-48">
      <AnimatePresence initial={false}>
        {messages.map((msg) => {
          const isUser = msg.role === "user" || msg.sender === "user";
          const text = msg.content || msg.text || "";
          const timeString = msg.created_at
            ? new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
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

              <div
                className={`group flex flex-col ${
                  isUser ? "items-end" : "items-start"
                } max-w-[85%]`}
              >
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
                          <img
                            key={idx}
                            src={img}
                            alt="Result"
                            className="rounded-xl border border-slate-200 dark:border-white/10 max-h-48 w-full object-cover shadow-md hover:scale-[1.02] transition-transform"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Toolbar */}
                <div
                  className={`mt-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="text-[10px] text-slate-400 px-1">
                    {timeString}
                  </span>
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
            <span
              className="size-2 rounded-full bg-purple-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="size-2 rounded-full bg-indigo-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="size-2 rounded-full bg-pink-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
            <span className="text-xs font-medium text-slate-400 ml-1">
              Agentra thinking…
            </span>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
