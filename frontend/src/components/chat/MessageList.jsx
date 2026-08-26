import React from "react";
import { Bot, Copy, Check } from "lucide-react";
import MarkdownMessage from "../MarkdownMessage";
import ArtifactRenderer from "./ArtifactRenderer";

export default function MessageList({
  messages,
  isThinking,
  userInitials,
  copiedId,
  handleCopy,
  messagesEndRef,
}) {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-6 space-y-6 pb-44">
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
          <div
            key={msg.id}
            className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
          >
            {/* AI Avatar */}
            {!isUser && (
              <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm">
                <Bot size={14} />
              </div>
            )}

            <div
              className={`group flex flex-col ${
                isUser ? "items-end" : "items-start"
              } max-w-[85%] w-full`}
            >
              {isUser ? (
                /* User Message Pill */
                <div className="rounded-xl bg-slate-900 text-white dark:bg-slate-800 px-4 py-2.5 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-sm">
                  {text}
                </div>
              ) : (
                /* Assistant Message Body */
                <div className="w-full text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                  <MarkdownMessage content={text} isUser={false} />

                  {/* Returned Images Grid */}
                  {msg.images && msg.images.length > 0 && (
                    <div className="mt-3 grid gap-2 grid-cols-2">
                      {msg.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Generated output"
                          className="rounded-lg border border-slate-200 dark:border-white/10 max-h-48 w-full object-cover shadow-sm"
                        />
                      ))}
                    </div>
                  )}

                  {/* Artifacts (Web Application Live Preview & Code View) */}
                  <ArtifactRenderer artifacts={msg.artifacts} content={text} />
                </div>
              )}

              {/* Action Toolbar */}
              <div
                className={`mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                  isUser ? "flex-row-reverse" : ""
                }`}
              >
                <span className="text-[10px] text-slate-400 font-mono">
                  {timeString}
                </span>
                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.id, text)}
                    className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check size={10} className="text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Copied</span>
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
              <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-lg bg-purple-600 text-xs font-bold text-white shadow-sm">
                {userInitials}
              </div>
            )}
          </div>
        );
      })}

      {/* Thinking Indicator */}
      {isThinking && (
        <div className="flex items-center gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white text-xs font-bold shadow-sm">
            <Bot size={14} />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/10 px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 shadow-sm">
            <span className="size-2 rounded-full bg-purple-500 animate-ping" />
            <span className="font-mono animate-pulse">Agentra is crafting your application…</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
