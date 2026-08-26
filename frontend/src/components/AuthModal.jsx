import React, { useEffect, useRef } from "react";
import { X, Bot } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import GoogleSignInButton from "./GoogleSignInButton";

export default function AuthModal() {
    const { isAuthModalOpen, setIsAuthModalOpen, authError } = useAuth();
    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsAuthModalOpen(false);
            }
        };

        if (isAuthModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                closeBtnRef.current?.focus();
            }, 100);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isAuthModalOpen, setIsAuthModalOpen]);

    // Close on clicking backdrop (outside the modal box)
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsAuthModalOpen(false);
        }
    };

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="auth-modal-title"
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950 md:p-10 text-center"
                    >
                        {/* Close Button */}
                        <button
                            ref={closeBtnRef}
                            onClick={() => setIsAuthModalOpen(false)}
                            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        {/* Agentra AI Logo */}
                        <div className="flex flex-col items-center">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-600 shadow-lg shadow-purple-600/30 text-white mb-6">
                                <Bot size={30} />
                            </div>
                            
                            {/* Heading */}
                            <h2 id="auth-modal-title" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Start building with Agentra AI
                            </h2>
                            
                            {/* Subheading */}
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Sign in with your Google account to start your free trial.
                            </p>
                        </div>

                        {/* Error Banner */}
                        {authError && (
                            <div 
                                className="mt-6 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-500 font-medium"
                                role="alert"
                            >
                                {authError}
                            </div>
                        )}

                        {/* Google Sign-in Button */}
                        <div className="mt-8 flex flex-col gap-4">
                            <GoogleSignInButton />
                            
                            {/* Footnote */}
                            <p className="text-center text-xs text-slate-400 leading-relaxed px-2">
                                By continuing, you agree to Agentra AI’s{" "}
                                <a href="#terms" className="text-purple-600 dark:text-purple-400 hover:underline">Terms of Service</a>{" "}
                                and{" "}
                                <a href="#privacy" className="text-purple-600 dark:text-purple-400 hover:underline">Privacy Policy</a>.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
