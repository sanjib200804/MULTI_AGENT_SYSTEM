import React from "react";
import { Send, Paperclip, X, CornerDownLeft } from "lucide-react";
import { agentsList } from "../../data/agentsData";

export default function ChatInputDock({
  inputMessage,
  setInputMessage,
  selectedAgent,
  setSelectedAgent,
  selectedFile,
  setSelectedFile,
  handleFileChange,
  handleSendMessage,
  handleKeyPress,
  getPlaceholderText,
  agentDockRef,
  fileInputRef,
  textareaRef,
}) {
  const currentAgentName = agentsList.find((a) => a.id === selectedAgent)?.name || "Auto";

  return (
    <div className="absolute bottom-0 left-0 right-0 pb-3 px-4 bg-gradient-to-t from-slate-50 via-slate-50/95 dark:from-[#09090b] dark:via-[#09090b]/95 to-transparent pt-6 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        
        {/* File Attachment Chip */}
        {selectedFile && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121215] px-2 py-1 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
            <Paperclip size={12} className="shrink-0 text-slate-400" />
            <span className="truncate max-w-[200px] font-medium">{selectedFile.name}</span>
            <button
              onClick={() => setSelectedFile(null)}
              className="ml-1 p-0.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Agent Selector Pills Bar */}
        <div
          ref={agentDockRef}
          className="mb-2 flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar scroll-smooth"
        >
          {agentsList.map((agt) => {
            const Icon = agt.icon;
            const active = selectedAgent === agt.id;
            return (
              <button
                key={agt.id}
                onClick={() => setSelectedAgent(agt.id)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition shrink-0 cursor-pointer border ${
                  active
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm"
                    : "bg-white dark:bg-[#121215] text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <Icon size={12} className={active ? "text-white dark:text-slate-900" : "text-slate-400"} />
                <span>{agt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Composer Box */}
        <div className="rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121215] shadow-md focus-within:border-slate-400 dark:focus-within:border-slate-600 transition overflow-hidden">
          
          {/* Agent Hint Bar */}
          <div className="px-3 pt-1.5 pb-0.5 text-[11px] text-slate-400 flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04]">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {currentAgentName} Mode · Ready
            </span>
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 font-mono">
              <span>Send</span>
              <CornerDownLeft size={10} />
            </span>
          </div>

          <div className="flex items-end gap-2 px-3 py-1.5">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File Attach Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mb-0.5 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer shrink-0"
              title="Attach document or image"
            >
              <Paperclip size={15} />
            </button>

            {/* Textarea Input */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={getPlaceholderText()}
              className="flex-1 resize-none bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none py-1 leading-relaxed max-h-[160px] overflow-y-auto"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() && !selectedFile}
              className={`mb-0.5 flex size-7 items-center justify-center rounded-md transition shrink-0 cursor-pointer ${
                inputMessage.trim() || selectedFile
                  ? "bg-purple-600 hover:bg-purple-500 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-white/[0.05] text-slate-400 dark:text-slate-600 cursor-not-allowed"
              }`}
            >
              <Send size={13} />
            </button>
          </div>
        </div>

        <p className="mt-1 text-center text-[10px] text-slate-400 dark:text-slate-600 font-normal">
          Agentra Multi-Agent Swarm
        </p>
      </div>
    </div>
  );
}
