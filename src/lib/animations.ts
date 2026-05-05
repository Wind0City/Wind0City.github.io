/**
 * 动画配置文件
 *
 * 统一管理所有动画参数，包括：
 * - 过渡时长
 * - 缓动函数
 * - 动画变体定义
 */

/**
 * 过渡时长配置（单位：秒）
 */
export const duration = {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
} as const;

/**
 * Spring 动画配置
 */
export const spring = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
};

/**
 * 缓动函数配置
 */
export const ease = {
    easeOut: [0.16, 1, 0.3, 1] as const,
    easeInOut: [0.65, 0, 0.35, 1] as const,
};

/**
 * 淡入淡出动画变体
 */
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

/**
 * 从左侧滑入动画变体
 */
export const slideInFromLeft = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
};

/**
 * 从右侧滑入动画变体
 */
export const slideInFromRight = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
};

/**
 * 缩放动画变体
 */
export const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
};

/**
 * 页面过渡动画变体
 */
export const pageTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

/**
 * 列表项交错动画配置
 */
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

/**
 * 列表项动画变体
 */
export const listItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

/**
 * 悬停效果配置
 */
export const hoverScale = {
    scale: 1.05,
    transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
    },
};

/**
 * 点击效果配置
 */
export const tapScale = {
    scale: 0.95,
};
