import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, X, Sparkles, CornerDownLeft } from "lucide-react";
import { agentsList, agentInfo } from "../../data/agentsData";

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
  return (
    <div className="absolute bottom-0 left-0 right-0 pb-4 px-4 bg-gradient-to-t from-slate-50 via-slate-50/95 dark:from-[#030712] dark:via-[#030712]/95 to-transparent pt-10 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        
        {/* File Attachment Preview Badge */}
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-2.5 inline-flex items-center gap-2 rounded-xl border border-purple-400/40 dark:border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs text-purple-700 dark:text-purple-300 shadow-sm backdrop-blur-md"
            >
              <Paperclip size={13} className="shrink-0 text-purple-500" />
              <span className="truncate max-w-[240px] font-semibold">
                {selectedFile.name}
              </span>
              <button
                onClick={() => setSelectedFile(null)}
                className="ml-1 p-0.5 rounded-full hover:bg-purple-200/50 dark:hover:bg-purple-500/20 text-slate-400 hover:text-red-500 transition cursor-pointer"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agent Selector Pills Bar */}
        <div
          ref={agentDockRef}
          className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth"
        >
          {agentsList.map((agt) => {
            const Icon = agt.icon;
            const active = selectedAgent === agt.id;
            return (
              <button
                key={agt.id}
                onClick={() => setSelectedAgent(agt.id)}
                className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 border ${
                  active
                    ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white border-transparent shadow-md shadow-purple-500/25"
                    : "bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-white/[0.08] hover:border-purple-500/30 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  size={13}
                  className={active ? "text-white animate-pulse" : "text-purple-500"}
                />
                <span>{agt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Input Container */}
        <div className="relative rounded-2xl border border-slate-200/80 dark:border-white/[0.09] bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-2xl focus-within:border-purple-500/60 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all overflow-hidden">
          
          {/* Agent Hint Bar */}
          <div className="px-4 pt-2.5 pb-1 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between border-b border-slate-100 dark:border-white/[0.04]">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <Sparkles size={11} />
                {agentsList.find((a) => a.id === selectedAgent)?.name}
              </span>
              <span>· {agentInfo[selectedAgent]}</span>
            </div>
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 font-mono">
              <span>Enter to send</span>
              <CornerDownLeft size={10} />
            </span>
          </div>

          <div className="flex items-end gap-2 px-4 py-2.5">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File Attach Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mb-1 p-2 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-white/10 transition cursor-pointer shrink-0"
              title="Attach document or image"
            >
              <Paperclip size={18} />
            </motion.button>

            {/* Textarea Input */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={getPlaceholderText()}
              className="flex-1 resize-none bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none py-1.5 leading-relaxed max-h-[200px] overflow-y-auto"
            />

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() && !selectedFile}
              className={`mb-0.5 flex size-9 items-center justify-center rounded-xl transition-all cursor-pointer shrink-0 ${
                inputMessage.trim() || selectedFile
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
              }`}
            >
              <Send size={15} />
            </motion.button>
          </div>
        </div>

        <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-600 font-medium">
          Agentra Swarm Engine • Powered by multi-agent real-time synthesis.
        </p>
      </div>
    </div>
  );
}
