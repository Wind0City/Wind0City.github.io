import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { hoverScale, tapScale } from "@/lib/animations";

interface RippleButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: ReactNode;
    variant?: "default" | "glass";
}

/**
 * 带涟漪效果的按钮组件
 *
 * 特性：
 * - 悬停缩放效果
 * - 点击涟漪效果
 * - 支持自定义样式
 */
export const RippleButton = ({
    children,
    variant = "default",
    className = "",
    ...props
}: RippleButtonProps) => {
    const baseStyles =
        "px-4 py-2 rounded-full font-medium transition-colors duration-200";

    const variantStyles = {
        default: "bg-white/10 text-white hover:bg-white/20",
        glass:
            "backdrop-blur bg-white/30 border-2 border-white/60 text-white hover:bg-white/40",
    };

    return (
        <motion.button
            whileHover={hoverScale}
            whileTap={tapScale}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};