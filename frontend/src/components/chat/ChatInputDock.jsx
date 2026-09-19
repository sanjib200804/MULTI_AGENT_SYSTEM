import React, { useState, useEffect } from "react";
import {
  Plus,
  Mic,
  AudioLines,
  ArrowUp,
  ChevronDown,
  Paperclip,
  X,
} from "lucide-react";
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
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const currentAgent = agentsList.find((a) => a.id === selectedAgent) || agentsList[0];
  const currentAgentName = currentAgent?.name || "Auto";

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modelMenuOpen) {
        setModelMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modelMenuOpen]);

  // Voice speech-to-text toggle
  const toggleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Google Chrome or Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e) => {
        console.warn("Speech recognition error:", e);
        setIsListening(false);
      };
      recognition.onresult = (e) => {
        const transcript = e.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };
      recognition.start();
    } catch (err) {
      console.warn("Could not start speech recognition:", err);
      setIsListening(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 pb-3.5 px-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent pt-8 pointer-events-none z-30 backdrop-blur-[1px]">
      <div className="max-w-3xl mx-auto pointer-events-auto relative">
        
        {/* Subtle Ambient Monochrome backlight glow behind input card */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-white/[0.02] blur-3xl pointer-events-none rounded-full" />

        {/* File Attachment Chip (if file selected) */}
        {selectedFile && (
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-200 shadow-md backdrop-blur-md">
            <Paperclip size={13} className="shrink-0 text-zinc-400" />
            <span className="truncate max-w-[220px] font-medium">{selectedFile.name}</span>
            <button
              onClick={handleRemoveFile}
              className="ml-1 p-0.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-red-400 transition cursor-pointer"
              title="Remove file"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* The Input Card with Light and Dark Theme Glass Effect */}
        <div className="relative rounded-[22px] border border-black/10 dark:border-white/15 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-2xl shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.8)] focus-within:border-black/30 dark:focus-within:border-white/40 focus-within:shadow-2xl dark:focus-within:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300">
          
          {/* Top subtle highlight hairline */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent pointer-events-none" />

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Main Textarea Area */}
          <div className="px-5 pt-3.5 pb-1">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={getPlaceholderText ? getPlaceholderText() : "How can I help you today?"}
              className="w-full resize-none bg-transparent text-sm sm:text-[15px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none leading-relaxed min-h-[52px] max-h-[160px] custom-scrollbar selection:bg-[#4288BC]/30"
            />
          </div>

          {/* Bottom Controls Bar inside Card */}
          <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-slate-100 dark:border-white/[0.08]">
            {/* Left: Plus attach button */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center size-8 rounded-lg text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
                title="Attach file or image"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Right: Model Selector Pill + Mic + Send / Waveform */}
            <div className="flex items-center gap-2">
              {/* Agent / Model Selector Dropdown Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setModelMenuOpen(!modelMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer border border-transparent hover:border-black/10 dark:hover:border-white/20"
                  title="Switch Agent Mode"
                  aria-expanded={modelMenuOpen}
                >
                  <span>{currentAgentName}</span>
                  <ChevronDown
                    size={12}
                    className={`text-slate-400 dark:text-zinc-400 transition-transform duration-200 ${
                      modelMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu & Backdrop */}
                {modelMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40 pointer-events-auto"
                      onClick={() => setModelMenuOpen(false)}
                    />
                    <div className="absolute right-0 bottom-full mb-3 w-52 rounded-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-xl dark:shadow-[0_15px_45px_rgba(0,0,0,0.8)] py-2 z-50 max-h-80 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95">
                      <div className="px-3 py-1 text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider border-b border-slate-100 dark:border-white/10 mb-1">
                        Select Agent
                      </div>
                      {agentsList.map((agt) => {
                        const Icon = agt.icon;
                        const isSelected = selectedAgent === agt.id;
                        return (
                          <button
                            key={agt.id}
                            onClick={() => {
                              setSelectedAgent(agt.id);
                              setModelMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-left transition cursor-pointer ${
                              isSelected
                                ? "bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white font-semibold"
                                : "text-slate-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                            }`}
                          >
                            <Icon
                              size={14}
                              className={isSelected ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-zinc-400"}
                            />
                            <span className="flex-1 truncate">{agt.name}</span>
                            {isSelected && <span className="text-black dark:text-white text-xs">●</span>}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Mic / Voice Input Button */}
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`flex items-center justify-center size-8 rounded-lg transition cursor-pointer ${
                  isListening
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md animate-pulse"
                    : "text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
                title={isListening ? "Listening... click to stop" : "Voice input mode"}
              >
                <Mic size={16} />
              </button>

              {/* Send Button or Waveform Indicator */}
              {inputMessage.trim() || selectedFile ? (
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="flex size-7 items-center justify-center rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Send prompt"
                >
                  <ArrowUp size={15} strokeWidth={2.5} />
                </button>
              ) : (
                <div
                  className="flex items-center justify-center size-8 text-slate-400 dark:text-zinc-500"
                  title="Audio ready"
                >
                  <AudioLines size={16} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Capability / Agent Quick-Select Pills */}
        <div
          ref={agentDockRef}
          className="mt-3 w-full overflow-x-auto no-scrollbar scroll-smooth py-1.5 px-2"
        >
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 w-max sm:w-full min-w-full sm:min-w-0 px-1">
            {agentsList.map((agt) => {
              const Icon = agt.icon;
              const active = selectedAgent === agt.id;
              return (
                <button
                  key={agt.id}
                  onClick={() => setSelectedAgent(agt.id)}
                  className={`group flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 shrink-0 whitespace-nowrap select-none cursor-pointer border ${
                    active
                      ? "bg-black text-white dark:bg-white dark:text-black font-bold border-black dark:border-white shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "bg-white/80 dark:bg-zinc-900/70 hover:bg-white dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 backdrop-blur-md shadow-sm"
                  }`}
                >
                  <Icon
                    size={13}
                    className={`transition-colors duration-200 shrink-0 ${
                      active ? "text-white dark:text-black" : "text-slate-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                    }`}
                  />
                  <span>{agt.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
