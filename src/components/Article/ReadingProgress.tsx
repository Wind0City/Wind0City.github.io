import { useEffect, useState } from "react";

export const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(scrollProgress);
        };

        window.addEventListener("scroll", updateProgress);
        updateProgress();

        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
            <div
                className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};