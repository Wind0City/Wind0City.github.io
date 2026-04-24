/**
 * 动画卡片组件
 *
 * 功能：创建一个从小尺寸展开到全屏的动画卡片效果
 * 原理：
 * 1. 组件挂载后，通过 setTimeout 延迟 50ms 触发展开动画
 * 2. 使用 CSS transform: scale() 实现从中心点展开的动画
 * 3. 内容区域使用 opacity 渐显，配合延迟实现"先展开后显示内容"的效果
 *
 * 动画时序：
 * - 0-50ms: 等待触发（避免首次渲染闪烁）
 * - 50ms: 开始展开
 * - 50ms ~ (50+duration)ms: 卡片尺寸展开动画
 * - (50+duration*0.3)ms: 内容开始渐显
 * - (50+duration*0.8)ms: 内容完全显示
 */
import { useEffect, useState } from "react";
import type React from "react";

/**
 * AnimatedCard 组件属性接口
 */
interface AnimatedCardProps {
    /** 卡片内容 */
    children: React.ReactNode;
    /** 动画持续时间（毫秒），默认 800ms */
    duration?: number;
}

/**
 * 动画卡片组件
 *
 * @param props - 组件属性
 * @returns JSX 元素
 *
 * @example
 * // 基础用法
 * <AnimatedCard>
 *   <div>卡片内容</div>
 * </AnimatedCard>
 */
export const AnimatedCard = ({
    children,
    duration = 800,
}: AnimatedCardProps) => {
    // 控制卡片是否处于展开状态
    const [isExpanded, setIsExpanded] = useState(false);

    /**
     * 组件挂载后触发展开动画
     * 延迟 50ms 是为了让初始渲染完成，避免动画闪烁
     */
    useEffect(() => {
        const timer = setTimeout(() => setIsExpanded(true), 50);
        // 清理定时器，防止组件卸载时内存泄漏
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            // 样式说明：
            // - backdrop-blur-md: 毛玻璃模糊效果
            // - border border-white/60: 半透明白色边框
            // - bg-transparent: 透明背景，让子组件背景色显示
            // - rounded-3xl: 大圆角
            // - shadow-lg shadow-black/40: 大阴影，40% 透明度黑色
            // - overflow-hidden: 隐藏溢出内容，配合圆角使用
            // - transition-all: 所有属性都参与过渡动画
            // - ease-out: 缓出动画曲线，开始快结束慢
            // - w-full h-full: 填满父容器
            className="backdrop-blur border-2 border-white/60 bg-transparent rounded-3xl shadow-lg shadow-black/40 flex items-center justify-center overflow-hidden transition-all ease-out w-full h-full"
            style={{
                // 使用 scale 实现从中心展开的动画
                transform: isExpanded ? "scale(1)" : "scale(0.1)",
                // 从中心点展开
                transformOrigin: "center center",
                // 动画持续时间
                transitionDuration: `${duration}ms`,
            }}
        >
            {/* 内容容器：控制内容的渐显效果，overflow-auto 支持内部滚动 */}
            <div
                className="w-full h-full flex flex-col items-center justify-center overflow-auto"
                style={{
                    // 透明度动画：
                    // - 展开后 opacity 为 1（完全显示）
                    // - 收起时 opacity 为 0（完全隐藏）
                    opacity: isExpanded ? 1 : 0,
                    // 过渡配置：
                    // - 持续时间：duration 的 50%，让内容显示更快
                    // - 延迟：duration 的 30%，等卡片展开一部分后再显示内容
                    // - 曲线：ease-out，平滑淡入
                    transition: `opacity ${duration * 0.5}ms ease-out ${duration * 0.4}ms`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
