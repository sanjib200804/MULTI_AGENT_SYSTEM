import { MenuIcon, XIcon, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useAuthContext } from "../context/AuthContext";
import { navLinks } from "../data/navLinks";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useThemeContext();
  const { user, setIsAuthModalOpen, logout } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = openMobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobileMenu]);

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] py-3 shadow-md shadow-slate-900/5 dark:shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16">
        
        {/* Logo & Brand Indicator */}
        <div className="flex items-center gap-4">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2.5 group">
            <img
              className="h-8 w-auto shrink-0 transition-transform group-hover:scale-105"
              src={
                theme === "dark"
                  ? "/assets/logo-light.svg"
                  : "/assets/logo-dark.svg"
              }
              alt="Agentra AI"
              width={130}
              height={36}
            />
          </Link>
          
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
            </span>
            <span>Swarm Online</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-200/80 dark:border-white/[0.08] bg-white/50 dark:bg-slate-900/50 px-3 py-1.5 backdrop-blur-md md:flex shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2.5">
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <span>Dashboard</span>
                <ArrowRight size={13} />
              </Link>
              <button
                onClick={logout}
                className="rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white/70 dark:bg-slate-900/70 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Get Started</span>
            </button>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpenMobileMenu((prev) => !prev)}
            aria-label={openMobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={openMobileMenu}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200"
          >
            {openMobileMenu ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 top-[65px] z-40 flex flex-col justify-between bg-slate-50/95 dark:bg-[#0A0A0F]/95 backdrop-blur-2xl px-6 py-8 transition-all duration-300 md:hidden ${
          openMobileMenu
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={closeMobileMenu}
              className="rounded-xl px-4 py-3 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-white/5 hover:text-purple-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-slate-200/80 dark:border-white/10">
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="flex justify-center items-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
              >
                <span>Dashboard</span>
                <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => {
                  closeMobileMenu();
                  logout();
                }}
                className="rounded-xl border border-slate-200 dark:border-white/10 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                closeMobileMenu();
                setIsAuthModalOpen(true);
              }}
              className="flex justify-center items-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
            >
              <Sparkles size={16} />
              <span>Get Started Free</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}