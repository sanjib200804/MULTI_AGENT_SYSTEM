import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * MarkdownMessage
 * Renders markdown content with syntax-highlighted code blocks,
 * proper heading hierarchy, lists, tables, and inline formatting.
 */
export default function MarkdownMessage({ content, isUser }) {
    return (
        <div className={`markdown-body text-xs leading-6 ${isUser ? "text-slate-800 dark:text-slate-100" : "text-slate-700 dark:text-slate-100"}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // ── Headings ─────────────────────────────────────────────
                    h1: ({ children }) => (
                        <h1 className="text-base font-bold text-slate-800 dark:text-white mt-4 mb-2 border-b border-slate-200 dark:border-slate-700 pb-1">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-sm font-bold text-slate-800 dark:text-white mt-4 mb-2">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-1.5">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-2 mb-1">
                            {children}
                        </h4>
                    ),

                    // ── Paragraph ────────────────────────────────────────────
                    p: ({ children }) => (
                        <p className="my-1.5 whitespace-pre-wrap leading-relaxed">
                            {children}
                        </p>
                    ),

                    // ── Horizontal Rule ──────────────────────────────────────
                    hr: () => (
                        <hr className="my-3 border-slate-200 dark:border-slate-700" />
                    ),

                    // ── Lists ────────────────────────────────────────────────
                    ul: ({ children }) => (
                        <ul className="my-2 ml-4 space-y-0.5 list-disc list-outside text-slate-700 dark:text-slate-300">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="my-2 ml-4 space-y-0.5 list-decimal list-outside text-slate-700 dark:text-slate-300">
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

                    // ── Inline Code ──────────────────────────────────────────
                    code: ({ inline, className, children }) => {
                        if (inline) {
                            return (
                                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-300 font-mono text-[11px] border border-slate-200 dark:border-slate-700">
                                    {children}
                                </code>
                            );
                        }

                        // Fenced code block — extract language from className
                        const lang = className ? className.replace("language-", "") : "code";
                        return (
                            <div className="my-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                                {/* Language label bar */}
                                <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                    <span className="text-[10px] font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider">
                                        {lang}
                                    </span>
                                    <CopyCodeButton text={String(children)} />
                                </div>
                                {/* Code body */}
                                <pre className="overflow-x-auto p-4 bg-slate-950 dark:bg-[#0d1117] text-slate-300 text-[11px] font-mono leading-5 whitespace-pre">
                                    <code>{children}</code>
                                </pre>
                            </div>
                        );
                    },

                    // ── Pre (wraps fenced code, already handled in code) ─────
                    pre: ({ children }) => <>{children}</>,

                    // ── Blockquote ───────────────────────────────────────────
                    blockquote: ({ children }) => (
                        <blockquote className="my-2 pl-3 border-l-2 border-purple-400 dark:border-purple-500 text-slate-500 dark:text-slate-400 italic">
                            {children}
                        </blockquote>
                    ),

                    // ── Table ────────────────────────────────────────────────
                    table: ({ children }) => (
                        <div className="my-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-[11px]">{children}</table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-semibold">
                            {children}
                        </thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {children}
                        </tbody>
                    ),
                    tr: ({ children }) => <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">{children}</tr>,
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
            className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-white transition cursor-pointer px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600"
        >
            {copied ? "✓ Copied" : "Copy"}
        </button>
    );
}
