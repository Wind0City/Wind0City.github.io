import { Outlet, Link } from "react-router";
import { motion } from "framer-motion";
import { StatusCard } from "@/components/StatusCard";
import { ThemeToggle } from "@/components/ThemeToggle";

const MAX_WIDTH = 1200;
const MIN_WIDTH = 320;
const PADDING = 24;
const STATUS_CARD_WIDTH = 200;
const GAP = 8;

/**
 * 根布局组件
 *
 * 使用 Outlet 实现路由嵌套，避免页面切换时重新渲染 StatusCard
 */
export const RootLayout = () => {
    return (
        <div className="fixed inset-0 z-10 overflow-hidden flex justify-center">
            <div
                className="flex gap-2 h-full py-2"
                style={{
                    width: `min(${MAX_WIDTH + STATUS_CARD_WIDTH + GAP}px, max(${MIN_WIDTH + STATUS_CARD_WIDTH + GAP}px, calc(100vw - ${PADDING * 2}px)))`,
                }}
            >
                {/* 左侧状态卡片 - 不会随页面切换重新渲染 */}
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
                                    to="/article"
                                    className="px-4 py-2 backdrop-blur bg-white/1 border-2 border-white/60 rounded-full text-lg font-medium text-white hover:bg-white/30 transition"
                                >
                                    Article
                                </Link>
                            </motion.div>
                        </div>

                        {/* 右侧：主题切换 */}
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                        </div>
                    </motion.nav>

                    {/* 内容区域 - 页面内容在这里渲染 */}
                    <main className="flex-1 min-h-0">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
