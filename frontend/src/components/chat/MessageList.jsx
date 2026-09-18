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
              <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-[0_0_12px_rgba(168,85,247,0.35)] border border-purple-400/30">
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
                <div className="rounded-2xl bg-[#1d1633]/90 border border-purple-500/30 text-slate-100 px-4 py-2.5 text-sm sm:text-[15px] whitespace-pre-wrap leading-relaxed shadow-[0_4px_20px_rgba(0,0,0,0.3),0_0_15px_rgba(168,85,247,0.15)] backdrop-blur-md">
                  {text}
                </div>
              ) : (
                /* Assistant Message Body */
                <div className="w-full text-sm sm:text-[15px] text-slate-200 leading-relaxed font-normal">
                  <MarkdownMessage content={text} isUser={false} />

                  {/* Returned Images Grid */}
                  {msg.images && msg.images.length > 0 && (
                    <div className="mt-3 grid gap-2 grid-cols-2">
                      {msg.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Generated output"
                          className="rounded-xl border border-purple-500/30 max-h-48 w-full object-cover shadow-[0_0_20px_rgba(168,85,247,0.2)]"
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
                <span className="text-[10px] text-purple-300/60 font-mono">
                  {timeString}
                </span>
                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.id, text)}
                    className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-purple-300/70 hover:text-purple-200 hover:bg-purple-950/30 rounded transition cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check size={10} className="text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
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
              <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-600 to-pink-600 text-xs font-bold text-white shadow-[0_0_12px_rgba(217,70,239,0.35)] border border-pink-400/30">
                {userInitials}
              </div>
            )}
          </div>
        );
      })}

      {/* Thinking Indicator */}
      {isThinking && (
        <div className="flex items-center gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-[0_0_12px_rgba(168,85,247,0.35)] border border-purple-400/30">
            <Bot size={14} />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-[#161228]/90 border border-purple-500/30 px-4 py-2.5 text-xs text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-md">
            <span className="size-2 rounded-full bg-purple-400 animate-ping" />
            <span className="font-mono text-purple-300 animate-pulse">Agentra is crafting your application…</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
