import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, setTheme } = useThemeContext();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button 
            type="button"
            onClick={toggleTheme} 
            className="flex items-center justify-center size-9 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white transition-colors duration-200 ease-in-out cursor-pointer shadow-sm"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun size={17} className="text-white" /> : <Moon size={17} className="text-slate-800" />}
        </button>
    );
}