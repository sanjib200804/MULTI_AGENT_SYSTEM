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
              <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-lg bg-zinc-800 text-white text-xs font-bold shadow-sm border border-white/20">
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
                <div className="rounded-2xl bg-zinc-800/90 border border-white/15 text-zinc-100 px-4 py-2.5 text-sm sm:text-[15px] whitespace-pre-wrap leading-relaxed shadow-sm backdrop-blur-md">
                  {text}
                </div>
              ) : (
                /* Assistant Message Body */
                <div className="w-full text-sm sm:text-[15px] text-zinc-200 leading-relaxed font-normal">
                  <MarkdownMessage content={text} isUser={false} />

                  {/* Returned Images Grid */}
                  {msg.images && msg.images.length > 0 && (
                    <div className="mt-3 grid gap-2 grid-cols-2">
                      {msg.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Generated output"
                          className="rounded-xl border border-white/15 max-h-48 w-full object-cover shadow-sm"
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
                <span className="text-[10px] text-zinc-500 font-mono">
                  {timeString}
                </span>
                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.id, text)}
                    className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 hover:text-white hover:bg-white/10 rounded transition cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check size={10} className="text-white" />
                        <span className="text-white font-semibold">Copied</span>
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
              <div className="flex size-7 shrink-0 mt-0.5 items-center justify-center rounded-lg bg-zinc-700 border border-white/20 text-xs font-bold text-white shadow-sm">
                {userInitials}
              </div>
            )}
          </div>
        );
      })}

      {/* Thinking Indicator */}
      {isThinking && (
        <div className="flex items-center gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-white text-xs font-bold border border-white/20 shadow-sm">
            <Bot size={14} />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-zinc-900/90 border border-white/15 px-4 py-2.5 text-xs text-zinc-300 shadow-sm backdrop-blur-md">
            <span className="size-2 rounded-full bg-white animate-ping" />
            <span className="font-mono text-zinc-300 animate-pulse">Agentra is crafting your application…</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
