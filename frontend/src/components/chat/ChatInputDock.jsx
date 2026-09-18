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
    <div className="absolute bottom-0 left-0 right-0 pb-3.5 px-4 bg-gradient-to-t from-[#0a0715]/75 via-[#0a0715]/25 to-transparent pt-8 pointer-events-none z-30 backdrop-blur-[1px]">
      <div className="max-w-3xl mx-auto pointer-events-auto relative">
        
        {/* Ambient violet neon backlight glow behind input card */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-gradient-to-r from-purple-800/20 via-fuchsia-700/25 to-purple-800/20 blur-3xl pointer-events-none rounded-full" />

        {/* File Attachment Chip (if file selected) */}
        {selectedFile && (
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-[#181328]/60 px-3 py-1.5 text-xs text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.25)] backdrop-blur-md">
            <Paperclip size={13} className="shrink-0 text-purple-400" />
            <span className="truncate max-w-[220px] font-medium">{selectedFile.name}</span>
            <button
              onClick={handleRemoveFile}
              className="ml-1 p-0.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-red-400 transition cursor-pointer"
              title="Remove file"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* The Claude-Style Glowing Input Card with Transparent Glass Effect */}
        <div className="relative rounded-[22px] border border-white/15 bg-white/[0.03] dark:bg-[#130f22]/50 backdrop-blur-2xl shadow-[0_0_50px_-10px_rgba(168,85,247,0.32),0_0_20px_-3px_rgba(192,132,252,0.18),inset_0_1px_1.5px_0_rgba(255,255,255,0.25)] focus-within:border-purple-400/70 focus-within:bg-[#130f22]/65 focus-within:shadow-[0_0_70px_-5px_rgba(168,85,247,0.55),0_0_30px_rgba(192,132,252,0.3),inset_0_1px_2px_0_rgba(255,255,255,0.3)] transition-all duration-300">
          
          {/* Top subtle neon highlight hairline */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/60 to-transparent pointer-events-none" />

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
              className="w-full resize-none bg-transparent text-sm sm:text-[15px] text-slate-100 placeholder:text-slate-400/75 outline-none leading-relaxed min-h-[52px] max-h-[160px] custom-scrollbar selection:bg-purple-500/30"
            />
          </div>

          {/* Bottom Controls Bar inside Card */}
          <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-purple-500/10">
            {/* Left: Plus attach button */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center size-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
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
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer border border-transparent hover:border-purple-500/30"
                  title="Switch Agent Mode"
                  aria-expanded={modelMenuOpen}
                >
                  <span>{currentAgentName}</span>
                  <ChevronDown
                    size={12}
                    className={`text-slate-400 transition-transform duration-200 ${
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
                    <div className="absolute right-0 bottom-full mb-3 w-52 rounded-2xl border border-purple-500/35 bg-[#141024]/95 backdrop-blur-2xl shadow-[0_15px_45px_rgba(0,0,0,0.7),0_0_30px_rgba(168,85,247,0.25)] py-2 z-50 max-h-80 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95">
                      <div className="px-3 py-1 text-[10px] font-mono text-purple-300/70 uppercase tracking-wider border-b border-white/5 mb-1">
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
                                ? "bg-purple-600/30 text-purple-200 font-semibold"
                                : "text-slate-300 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <Icon
                              size={14}
                              className={isSelected ? "text-purple-300" : "text-slate-400"}
                            />
                            <span className="flex-1 truncate">{agt.name}</span>
                            {isSelected && <span className="text-purple-400 text-xs">●</span>}
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
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)] animate-pulse"
                    : "text-slate-400 hover:text-purple-300 hover:bg-white/10"
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
                  className="flex size-7 items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.65)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Send prompt"
                >
                  <ArrowUp size={15} strokeWidth={2.5} />
                </button>
              ) : (
                <div
                  className="flex items-center justify-center size-8 text-slate-400"
                  title="Audio ready"
                >
                  <AudioLines size={16} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Capability / Agent Quick-Select Pills (Claude reference style: Write, Create, Learn...) */}
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
                      ? "bg-purple-600/40 text-white border-purple-400/80 shadow-[0_0_18px_rgba(168,85,247,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                      : "bg-[#151026]/40 hover:bg-[#201838]/60 text-slate-300 hover:text-white border-purple-500/20 hover:border-purple-400/50 shadow-[0_0_10px_-2px_rgba(168,85,247,0.15)] hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] backdrop-blur-md"
                  }`}
                >
                  <Icon
                    size={13}
                    className={`transition-colors duration-200 shrink-0 ${
                      active ? "text-purple-200" : "text-purple-400 group-hover:text-purple-200"
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
