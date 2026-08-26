import React, { useState } from "react";
import { Globe, Code, Eye, Maximize2, Copy, Check, X, FileCode } from "lucide-react";

function detectHtmlArtifactFromContent(content) {
  if (!content || typeof content !== "string") return null;

  // Match ```html ... ``` code fences
  const fenceMatch = content.match(/```(?:html|xml)?\s*\n?([\s\S]*?)(?:```|$)/i);
  if (fenceMatch && (fenceMatch[1].includes("<html") || fenceMatch[1].includes("<!DOCTYPE") || fenceMatch[1].includes("<div") || fenceMatch[1].includes("<section"))) {
    return {
      id: "auto-extracted-html",
      type: "Website",
      title: "Generated HTML Page",
      files: [{ name: "index.html", content: fenceMatch[1].trim() }]
    };
  }

  // Match full <!DOCTYPE html> ... </html> document
  const docMatch = content.match(/(<!DOCTYPE[\s\S]*?<\/html>)/i);
  if (docMatch) {
    return {
      id: "auto-extracted-doc",
      type: "Website",
      title: "Generated HTML Document",
      files: [{ name: "index.html", content: docMatch[1].trim() }]
    };
  }

  return null;
}

function buildCombinedHtml(files) {
  const htmlFile = files.find((f) => f.name === "index.html") || files[0] || { content: "" };
  const cssFile = files.find((f) => f.name === "style.css");
  const jsFile = files.find((f) => f.name === "script.js");

  let rawHtml = htmlFile.content || "";

  // 1. Clean JSON string escapes (e.g., \" or \n) if present
  rawHtml = rawHtml
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t');

  // 2. Remove external references to style.css and script.js so iframe browser does not attempt HTTP 404 fetches
  rawHtml = rawHtml.replace(/<link[^>]*href=["'](?:\.?\/?style\.css)["'][^>]*\/?>/gi, "");
  rawHtml = rawHtml.replace(/<script[^>]*src=["'](?:\.?\/?script\.js)["'][^>]*><\/script>/gi, "");

  // 3. Prepare injected assets with console warning suppression for iframe play CDN
  const suppressWarnScript = `<script>
    (function() {
      var origWarn = console.warn;
      console.warn = function() {
        if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf('cdn.tailwindcss.com') !== -1) return;
        origWarn.apply(console, arguments);
      };
    })();
  </script>`;
  const tailwindCdn = `${suppressWarnScript}<script src="https://cdn.tailwindcss.com"></script>`;
  const googleFontsCdn = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">`;
  const extraCss = cssFile ? `<style>\n${cssFile.content}\n</style>` : "";
  const extraJs = jsFile ? `<script>\n${jsFile.content}\n</script>` : "";

  const isFullDoc = /<!DOCTYPE/i.test(rawHtml) || /<html/i.test(rawHtml);

  if (isFullDoc) {
    if (rawHtml.includes("</head>")) {
      rawHtml = rawHtml.replace(
        "</head>",
        `  ${tailwindCdn}\n  ${googleFontsCdn}\n  ${extraCss}\n</head>`
      );
    } else {
      rawHtml = `<head>${tailwindCdn}${googleFontsCdn}${extraCss}</head>` + rawHtml;
    }

    if (rawHtml.includes("</body>")) {
      rawHtml = rawHtml.replace("</body>", `  ${extraJs}\n</body>`);
    } else {
      rawHtml = rawHtml + extraJs;
    }

    return rawHtml;
  } else {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Live Preview</title>
  ${tailwindCdn}
  ${googleFontsCdn}
  <style>
    body { font-family: 'Inter', sans-serif; }
    ${cssFile ? cssFile.content : ""}
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
  ${rawHtml}
  ${extraJs}
</body>
</html>`;
  }
}

export default function ArtifactRenderer({ artifacts, content }) {
  let activeArtifacts = artifacts || [];

  if (activeArtifacts.length === 0 && content) {
    const autoArt = detectHtmlArtifactFromContent(content);
    if (autoArt) {
      activeArtifacts = [autoArt];
    }
  }

  if (!activeArtifacts || activeArtifacts.length === 0) return null;

  return (
    <div className="mt-4 space-y-4 w-full">
      {activeArtifacts.map((art, index) => {
        if (art.type === "Website" || art.files) {
          return <WebsiteArtifact key={art.id || index} artifact={art} />;
        }
        return null;
      })}
    </div>
  );
}

function WebsiteArtifact({ artifact }) {
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "code"
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const files = artifact.files || [];
  const srcDoc = buildCombinedHtml(files);

  const handleCopyFile = () => {
    const file = files[selectedFileIdx];
    if (!file) return;
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121217] shadow-lg overflow-hidden w-full transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-[#18181f] border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Globe size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white capitalize">
              {artifact.title || "Generated Web Application"}
            </h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {files.length} {files.length === 1 ? "File" : "Files"} (HTML, CSS, JS)
            </p>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "preview"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
            }`}
          >
            <Eye size={12} />
            <span>Preview</span>
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "code"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
            }`}
          >
            <Code size={12} />
            <span>Code</span>
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 dark:text-slate-400 transition cursor-pointer"
            title="Full Screen Preview"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      {activeTab === "preview" ? (
        <div className="relative w-full h-[450px] bg-slate-900 overflow-hidden">
          <iframe
            srcDoc={srcDoc}
            title={artifact.title || "Web Preview"}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-modals allow-forms"
          />
        </div>
      ) : (
        <div className="flex flex-col bg-slate-950 text-slate-100 text-xs font-mono h-[450px]">
          {/* File Select Sub-Tabs */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-1">
              {files.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFileIdx(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                    selectedFileIdx === idx
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <FileCode size={12} />
                  <span>{file.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyFile}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition cursor-pointer"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          {/* File Code Display */}
          <pre className="flex-1 p-4 overflow-auto text-[11px] leading-relaxed text-slate-300 whitespace-pre">
            <code>{files[selectedFileIdx]?.content || ""}</code>
          </pre>
        </div>
      )}

      {/* Fullscreen Preview Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-lg">
          <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 text-white">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-purple-400" />
              <span className="font-bold text-sm">{artifact.title || "Web Application Live Preview"}</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
          <iframe
            srcDoc={srcDoc}
            title="Full Screen Preview"
            className="flex-1 w-full border-0 bg-white"
            sandbox="allow-scripts allow-modals allow-forms"
          />
        </div>
      )}
    </div>
  );
}
