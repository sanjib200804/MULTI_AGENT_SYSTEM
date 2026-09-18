import { MenuIcon, XIcon, ArrowRight, LogOut, LayoutDashboard, Coins } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { navLinks } from "../data/navLinks";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { getLenis } from "./LenisScroll";

export default function NavBar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, setIsAuthModalOpen, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleNavClick = (e, link) => {
    closeMobileMenu();

    if (link.href.startsWith("#")) {
      e.preventDefault();
      const targetId = link.href.substring(1);
      if (location.pathname !== "/") {
        navigate(`/#${targetId}`);
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { offset: -80 });
        else el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const userCredits = user?.credits ?? user?.credit ?? 100;
  const userName = user?.fullname || user?.displayName || user?.name || "User";
  const userEmail = user?.email || "";
  const userAvatar = user?.avatar || user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`;

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled || location.pathname === "/chat"
          ? "bg-[#0a0715]/85 backdrop-blur-xl border-b border-purple-500/15 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        
        {/* Brand Logo & Name (matching reference tech cluster) */}
        <Link 
          to="/" 
          onClick={closeMobileMenu} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          {/* Hexagonal / Mesh Node Cluster Icon */}
          <div className="relative flex items-center justify-center size-8">
            <svg 
              className="w-7 h-7 text-pink-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)] transition-transform duration-300 group-hover:scale-105" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="8" width="4.5" height="4.5" rx="2" fill="currentColor" />
              <rect x="7.5" y="4" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.9" />
              <rect x="7.5" y="12" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.9" />
              <rect x="13" y="8" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.8" />
              <rect x="13" y="16" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.8" />
              <rect x="18.5" y="12" width="4.5" height="4.5" rx="2" fill="currentColor" opacity="0.7" />
            </svg>
          </div>
          
          <span className="text-xl font-bold tracking-tight text-white transition-colors">
            Agentra<span className="text-pink-400 font-normal">.AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="text-xs font-medium tracking-wide text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          {user && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-slate-200">
              <Coins size={14} className="text-pink-400" />
              <span>Credits:</span>
              <span className="font-bold text-white">{userCredits}</span>
            </div>
          )}

          {!user ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-xs font-semibold text-white transition duration-200 cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:shadow-[0_0_30px_rgba(244,63,94,0.65)]"
            >
              Get Started
            </button>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center cursor-pointer ring-2 ring-pink-500/40 rounded-full"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <img
                  className="w-9 h-9 rounded-full border border-white/20 object-cover shadow-sm"
                  src={userAvatar}
                  alt={userName}
                />
              </button>

              <AnimatePresence>
                {openProfile && (
                  <motion.div
                    className="absolute right-0 mt-3 w-60 z-50 rounded-2xl bg-[#0b0f19] border border-white/10 shadow-2xl overflow-hidden text-left"
                    initial={{ y: -10, scale: 0.95, opacity: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                      <p className="text-sm font-semibold text-white truncate">
                        {userName}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {userEmail}
                      </p>
                    </div>

                    <button
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition cursor-pointer"
                      onClick={() => {
                        setOpenProfile(false);
                        navigate('/dashboard');
                      }}
                    >
                      <LayoutDashboard size={14} className="text-blue-400" />
                      <span>Dashboard</span>
                    </button>

                    <button
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 transition cursor-pointer border-t border-white/5"
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

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpenMobileMenu((prev) => !prev)}
            aria-label={openMobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={openMobileMenu}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-white"
          >
            {openMobileMenu ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[65px] z-40 flex flex-col justify-between bg-[#030712]/95 backdrop-blur-2xl px-6 py-6 transition-all duration-300 md:hidden ${
          openMobileMenu
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-white transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          {user ? (
            <>
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                <span>Credits Balance</span>
                <span className="font-bold text-white">{userCredits}</span>
              </div>
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="flex justify-center items-center gap-2 rounded-full bg-blue-600 text-white py-3 text-xs font-semibold shadow-lg shadow-blue-500/25"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => {
                  closeMobileMenu();
                  logout();
                }}
                className="rounded-full border border-rose-500/30 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
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
              className="rounded-full bg-blue-600 hover:bg-blue-500 text-white py-3 text-xs font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
}