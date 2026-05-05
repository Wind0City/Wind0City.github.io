import { useEffect, useState } from "react";

interface WindCityDisplayProps {
    show: boolean;
}

export const WindCityDisplay = ({ show }: WindCityDisplayProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 只在 show 为 true 时启动定时器
        if (!show) {
            return;
        }

        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => {
            clearTimeout(timer);
            setIsVisible(false);
        };
    }, [show]);

    if (!show) return null;

    return (
        <div
            className={`w-full h-full flex items-center justify-center transition-all duration-500 ease-out ${
                isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
            }`}
        >
            <h1 className="text-6xl font-bold text-white tracking-wider">
                WindCity
            </h1>
        </div>
    );
};