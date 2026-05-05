import { Link } from "react-router";
import type React from "react";
import { motion } from "framer-motion";
import { StatusCard } from "@/components/StatusCard";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LayoutProps {
    children: React.ReactNode;
}

const MAX_WIDTH = 1200;
const MIN_WIDTH = 320;
const PADDING = 24;
const STATUS_CARD_WIDTH = 200;
const GAP = 8;

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="fixed inset-0 z-10 overflow-hidden flex justify-center">
            <div
                className="flex gap-2 h-full py-2"
                style={{
                    width: `min(${MAX_WIDTH + STATUS_CARD_WIDTH + GAP}px, max(${MIN_WIDTH + STATUS_CARD_WIDTH + GAP}px, calc(100vw - ${PADDING * 2}px)))`,
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
                        width: `calc(100% - ${STATUS_CARD_WIDTH}px - ${GAP}px)`,
                    }}
                >
                    {/* 导航栏 */}
                    <motion.nav
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                        className="p-2 flex justify-between items-center bg-black/1 backdrop-blur-sm border-3 border-white/60 rounded-4xl flex-shrink-0"
                    >
                        <div className="flex gap-4">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/"
                                    className="px-4 py-2 backdrop-blur bg-white/1 border-2 border-white/60 rounded-full text-lg font-medium text-white hover:bg-white/30 transition"
                                >
                                    Home
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/test"
                                    className="px-4 py-2 backdrop-blur bg-white/1 border-2 border-white/60 rounded-full text-lg font-medium text-white hover:bg-white/30 transition"
                                >
                                    Article
                                </Link>
                            </motion.div>
                        </div>

                        {/* 右侧：WindCity 标题和主题切换 */}
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                        </div>
                    </motion.nav>

                    {/* 内容区域 */}
                    <main className="flex-1 min-h-0">{children}</main>
                </div>
            </div>
        </div>
    );
};
