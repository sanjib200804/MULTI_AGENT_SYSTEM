import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

function extractRawText(children) {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
        return children.map(extractRawText).join("");
    }
    if (children && children.props && children.props.children) {
        return extractRawText(children.props.children);
    }
    return String(children || "");
}

/**
 * MarkdownMessage
 * Renders markdown content with syntax-highlighted code blocks,
 * proper heading hierarchy, lists, tables, and inline formatting.
 */
export default function MarkdownMessage({ content, isUser }) {
    return (
        <div className={`markdown-body text-sm sm:text-[15px] leading-relaxed ${isUser ? "text-slate-800 dark:text-slate-100" : "text-slate-700 dark:text-slate-100"}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // ── Headings ─────────────────────────────────────────────
                    h1: ({ children }) => (
                        <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-5 mb-2.5 border-b border-slate-200 dark:border-slate-700 pb-1.5">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white mt-4 mb-2">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mt-3.5 mb-1.5">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 mb-1">
                            {children}
                        </h4>
                    ),

                    // ── Paragraph ────────────────────────────────────────────
                    p: ({ children }) => (
                        <p className="my-2 whitespace-pre-wrap leading-relaxed">
                            {children}
                        </p>
                    ),

                    // ── Horizontal Rule ──────────────────────────────────────
                    hr: () => (
                        <hr className="my-4 border-slate-200 dark:border-slate-700" />
                    ),

                    // ── Lists ────────────────────────────────────────────────
                    ul: ({ children }) => (
                        <ul className="my-2.5 ml-5 space-y-1 list-disc list-outside text-slate-700 dark:text-slate-300">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="my-2.5 ml-5 space-y-1 list-decimal list-outside text-slate-700 dark:text-slate-300">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="pl-1 leading-relaxed">{children}</li>
                    ),

                    // ── Bold / Italic / Strike ───────────────────────────────
                    strong: ({ children }) => (
                        <strong className="font-semibold text-slate-800 dark:text-white">
                            {children}
                        </strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-slate-600 dark:text-slate-300">{children}</em>
                    ),
                    del: ({ children }) => (
                        <del className="line-through text-slate-400">{children}</del>
                    ),

                    // ── Inline & Fenced Code ──────────────────────────────────
                    code: ({ inline, className, children }) => {
                        if (inline) {
                            return (
                                <code className="px-1.5 py-0.5 rounded-md bg-[#201538] text-purple-200 font-mono text-xs sm:text-[13px] border border-purple-500/30">
                                    {children}
                                </code>
                            );
                        }

                        // Extract language name from className e.g. "language-python hljs"
                        const langMatch = className ? className.match(/language-([^\s]+)/) : null;
                        const lang = langMatch ? langMatch[1] : (className ? className.replace("hljs", "").trim() : "code");
                        const rawText = extractRawText(children);

                        return (
                            <div className="my-3.5 rounded-xl overflow-hidden border border-purple-500/25 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.12)]">
                                {/* Language label bar */}
                                <div className="flex items-center justify-between px-4 py-2 bg-[#1a142c] border-b border-purple-500/20">
                                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                                        {lang || "code"}
                                    </span>
                                    <CopyCodeButton text={rawText} />
                                </div>
                                {/* Code body with syntax highlighting colors */}
                                <pre className="overflow-x-auto p-4 bg-[#100c1e] text-purple-100/90 text-xs sm:text-sm font-mono leading-6 whitespace-pre custom-scrollbar">
                                    <code className={className}>{children}</code>
                                </pre>
                            </div>
                        );
                    },

                    // ── Pre (wraps fenced code, handled in code) ─────────────
                    pre: ({ children }) => <>{children}</>,

                    // ── Blockquote ───────────────────────────────────────────
                    blockquote: ({ children }) => (
                        <blockquote className="my-3 pl-3.5 pr-3 py-1.5 border-l-2 border-purple-400 bg-purple-950/20 rounded-r-lg text-purple-200/90 italic">
                            {children}
                        </blockquote>
                    ),

                    // ── Table ────────────────────────────────────────────────
                    table: ({ children }) => (
                        <div className="my-3 overflow-x-auto rounded-xl border border-purple-500/20 shadow-sm">
                            <table className="w-full text-xs sm:text-sm">{children}</table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-[#18122c] text-purple-200 font-semibold border-b border-purple-500/20">
                            {children}
                        </thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody className="divide-y divide-purple-500/15 bg-[#120d22]/50">
                            {children}
                        </tbody>
                    ),
                    tr: ({ children }) => <tr className="hover:bg-purple-950/30 transition-colors">{children}</tr>,
                    th: ({ children }) => (
                        <th className="px-3 py-2 text-left font-semibold">{children}</th>
                    ),
                    td: ({ children }) => (
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{children}</td>
                    ),

                    // ── Link ─────────────────────────────────────────────────
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 dark:text-purple-400 underline underline-offset-2 hover:text-purple-700 dark:hover:text-purple-300 transition"
                        >
                            {children}
                        </a>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

/** Small inline button that copies fenced-code content to clipboard */
function CopyCodeButton({ text }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text.replace(/\n$/, ""));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="text-[10px] text-slate-300 hover:text-white transition cursor-pointer px-2 py-0.5 rounded bg-white/10 hover:bg-purple-600 font-sans"
        >
            {copied ? "✓ Copied" : "Copy"}
        </button>
    );
}
