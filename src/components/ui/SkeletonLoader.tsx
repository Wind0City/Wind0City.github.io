import { motion } from "framer-motion";

interface SkeletonLoaderProps {
    variant?: "text" | "rectangular" | "circular";
    width?: string | number;
    height?: string | number;
    className?: string;
}

/**
 * 骨架屏加载组件
 *
 * 特性：
 * - 闪烁动画
 * - 支持不同形状（矩形、圆形、文本）
 * - 支持自定义尺寸
 */
export const SkeletonLoader = ({
    variant = "text",
    width,
    height,
    className = "",
}: SkeletonLoaderProps) => {
    const variantStyles = {
        text: "rounded h-4",
        rectangular: "rounded-lg",
        circular: "rounded-full",
    };

    const defaultSizes = {
        text: { width: "100%", height: "1rem" },
        rectangular: { width: "100%", height: "100px" },
        circular: { width: "40px", height: "40px" },
    };

    const finalWidth = width || defaultSizes[variant].width;
    const finalHeight = height || defaultSizes[variant].height;

    return (
        <motion.div
            className={`bg-white/10 ${variantStyles[variant]} ${className}`}
            style={{
                width: typeof finalWidth === "number" ? `${finalWidth}px` : finalWidth,
                height:
                    typeof finalHeight === "number"
                        ? `${finalHeight}px`
                        : finalHeight,
            }}
            animate={{
                opacity: [0.5, 1, 0.5],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
};

/**
 * 文章卡片骨架屏
 */
export const ArticleSkeleton = () => {
    return (
        <div className="p-4 bg-white/10 rounded-xl border border-white/20 space-y-3">
            <SkeletonLoader variant="text" width="60%" height="1.5rem" />
            <div className="flex gap-4">
                <SkeletonLoader variant="text" width="80px" height="0.875rem" />
                <SkeletonLoader variant="text" width="60px" height="0.875rem" />
            </div>
            <SkeletonLoader variant="text" height="1rem" />
            <SkeletonLoader variant="text" height="1rem" width="80%" />
        </div>
    );
};
