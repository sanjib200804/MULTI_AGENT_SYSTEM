import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useAuthContext } from "../context/AuthContext";
import { navLinks } from "../data/navLinks";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { theme } = useThemeContext();
  const { user, setIsAuthModalOpen, logout } = useAuthContext();

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
    <nav
      className={`fixed top-0 left-0 z-50 w-full px-6 py-4 md:px-16 lg:px-24 xl:px-32 ${
        openMobileMenu ? "" : "backdrop-blur"
      }`}
    >
      {/* Navbar */}
      <div className="relative z-50 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu}>
          <img
            className="h-9 w-auto shrink-0 md:h-9.5"
            src={
              theme === "dark"
                ? "/assets/logo-light.svg"
                : "/assets/logo-dark.svg"
            }
            alt="Agentra AI"
            width={140}
            height={40}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex lg:gap-9 lg:pl-20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 text-sm font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="rounded-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 text-sm font-medium"
            >
              Get started
            </button>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpenMobileMenu((prev) => !prev)}
            aria-label={openMobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={openMobileMenu}
            className="relative z-50"
          >
            {openMobileMenu ? (
              <XIcon
                size={26}
                className="transition active:scale-90"
              />
            ) : (
              <MenuIcon
                size={26}
                className="transition active:scale-90"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center gap-7 bg-white/90 text-lg font-medium backdrop-blur-xl transition-all duration-300 dark:bg-black/90 md:hidden ${
          openMobileMenu
            ? "visible translate-x-0 opacity-100"
            : "invisible -translate-x-full opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={closeMobileMenu}
            className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
          >
            {link.name}
          </Link>
        ))}

        {user ? (
          <div className="flex flex-col items-center gap-4 w-full px-6">
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              className="rounded-md bg-purple-600 px-6 py-2.5 text-white transition hover:bg-purple-700 w-full text-center"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                closeMobileMenu();
                logout();
              }}
              className="rounded-md border border-slate-300 dark:border-slate-700 px-6 py-2.5 w-full text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              closeMobileMenu();
              setIsAuthModalOpen(true);
            }}
            className="rounded-md bg-purple-600 px-6 py-2.5 text-white transition hover:bg-purple-700 w-full text-center"
          >
            Get started
          </button>
        )}
      </div>
    </nav>
  );
}