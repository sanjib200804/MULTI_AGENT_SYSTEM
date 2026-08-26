import { MenuIcon, XIcon, ArrowRight, LogOut, LayoutDashboard, Coins } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { navLinks } from "../data/navLinks";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, setIsAuthModalOpen, setIsPricingModalOpen, logout } = useAuthContext();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openMobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobileMenu]);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  const userCredits = user?.credits ?? user?.credit ?? 100;
  const userName = user?.fullname || user?.displayName || user?.name || "User";
  const userEmail = user?.email || "";
  const userAvatar = user?.avatar || user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`;

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        
        {/* Brand Text */}
        <Link to="/" onClick={closeMobileMenu} className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
          Agentra<span className="text-purple-600 dark:text-purple-400">.AI</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            link.name === "Pricing" ? (
              <button
                key={link.name}
                onClick={() => setIsPricingModalOpen(true)}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          {user && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Coins size={14} className="text-purple-600 dark:text-purple-400" />
              <span>Credits:</span>
              <span className="font-bold text-slate-900 dark:text-white">{userCredits}</span>
            </div>
          )}

          {!user ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
            >
              Get started
            </button>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center cursor-pointer"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <img
                  className="w-9 h-9 rounded-full border border-slate-300 dark:border-white/20 object-cover shadow-sm"
                  src={userAvatar}
                  alt={userName}
                />
              </button>

              <AnimatePresence>
                {openProfile && (
                  <motion.div
                    className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-white dark:bg-[#0b0b0b] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden text-left"
                    initial={{ y: -10, scale: 0.95, opacity: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {userName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {userEmail}
                      </p>
                    </div>

                    <button
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                      onClick={() => {
                        setOpenProfile(false);
                        navigate('/dashboard');
                      }}
                    >
                      <LayoutDashboard size={14} />
                      <span>Dashboard</span>
                    </button>

                    <button
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-white/5 transition cursor-pointer border-t border-slate-100 dark:border-white/5"
                      onClick={() => {
                        setOpenProfile(false);
                        logout();
                      }}
                    >
                      <LogOut size={14} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpenMobileMenu((prev) => !prev)}
            aria-label={openMobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={openMobileMenu}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white"
          >
            {openMobileMenu ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[60px] z-40 flex flex-col justify-between bg-white dark:bg-[#09090b] px-6 py-6 transition-all duration-200 md:hidden ${
          openMobileMenu
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            link.name === "Pricing" ? (
              <button
                key={link.name}
                onClick={() => {
                  closeMobileMenu();
                  setIsPricingModalOpen(true);
                }}
                className="text-left rounded-md px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMobileMenu}
                className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t border-slate-200 dark:border-white/10">
          {user ? (
            <>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Credits</span>
                <span className="font-bold text-slate-900 dark:text-white">{userCredits}</span>
              </div>
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="flex justify-center items-center gap-2 rounded-lg bg-purple-600 text-white py-2.5 text-xs font-semibold shadow-sm"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => {
                  closeMobileMenu();
                  logout();
                }}
                className="rounded-lg border border-slate-200 dark:border-white/10 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-white/5 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                closeMobileMenu();
                setIsAuthModalOpen(true);
              }}
              className="rounded-lg bg-purple-600 text-white py-2.5 text-xs font-semibold shadow-sm"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
}