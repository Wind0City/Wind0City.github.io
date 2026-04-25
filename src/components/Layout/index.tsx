import { Link } from "react-router";
import type React from "react";
import { StatusCard } from "@/components/StatusCard";

interface LayoutProps {
    children: React.ReactNode;
}

/**
 * 布局常量
 *
 * - MAX_WIDTH: 内容区域最大宽度，防止在大屏幕上过宽
 * - MIN_WIDTH: 内容区域最小宽度，防止在小屏幕上压缩
 * - PADDING: 屏幕两侧留白
 * - STATUS_CARD_WIDTH: 左侧状态卡片宽度
 * - GAP: 状态卡片与主内容之间的间距（与导航栏和中间卡片的竖直间距一致）
 */
const MAX_WIDTH = 1200;  // 最大宽度 1200px
const MIN_WIDTH = 320;   // 最小宽度 320px
const PADDING = 24;      // 两侧边距 24px
const STATUS_CARD_WIDTH = 200;  // 状态卡片宽度 200px
const GAP = 8;  // 状态卡片与主内容之间的间距（与导航栏和中间卡片的竖直间距一致）

// 布局组件 - 包含导航栏和内容区域
// 使用 fixed 定位填满整个视口，防止页面滚动
export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="fixed inset-0 z-10 overflow-hidden flex justify-center">
            {/* 整体容器：状态卡片 + 主内容区域 */}
            <div
                className="flex gap-2 h-full py-2"
                style={{
                    width: `min(${MAX_WIDTH + STATUS_CARD_WIDTH + GAP}px, max(${MIN_WIDTH + STATUS_CARD_WIDTH + GAP}px, calc(100vw - ${PADDING * 2}px)))`
                }}
            >
                {/* 左侧状态卡片 */}
                <div
                    className="flex-shrink-0"
                    style={{ width: `${STATUS_CARD_WIDTH}px` }}
                >
                    <StatusCard />
                </div>

                {/* 右侧主内容区域 */}
                <div
                    className="flex flex-col gap-2 min-w-0"
                    style={{
                        width: `calc(100% - ${STATUS_CARD_WIDTH}px - ${GAP}px)`
                    }}
                >
                    {/* 导航栏 - 宽度与下方卡片一致 */}
                    <nav
                        className="p-2 flex justify-start gap-4 bg-black/1 backdrop-blur-sm border-3 border-white/60 rounded-4xl flex-shrink-0"
                    >
                        <Link
                            to="/"
                            className="px-4 py-2 backdrop-blur bg-white/1 border-2 border-white/60 rounded-full text-lg font-medium text-white hover:bg-white/30 transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/test"
                            className="px-4 py-2 backdrop-blur bg-white/1 border-2 border-white/60 rounded-full text-lg font-medium text-white hover:bg-white/30 transition"
                        >
                            Article
                        </Link>
                    </nav>

                    {/* 内容区域 */}
                    <main className="flex-1 min-h-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};
