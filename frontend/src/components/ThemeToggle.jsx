import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, setTheme } = useThemeContext();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button onClick={toggleTheme} className="flex items-center justify-center size-9 p-2 rounded-full bg-slate-950/5 hover:bg-slate-950/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors duration-200 ease-in-out">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}