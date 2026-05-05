import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/30"
            aria-label={theme === "light" ? "切换到暗色模式" : "切换到亮色模式"}
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5 text-white" />
            ) : (
                <Sun className="w-5 h-5 text-white" />
            )}
        </button>
    );
};