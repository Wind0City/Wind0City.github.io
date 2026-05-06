import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { useStatus } from "@/hooks/useStatus";
import {
    FileText,
    User,
    ArrowRight,
    Sparkles,
    X,
    Calendar,
    Clock,
} from "lucide-react";
import { staggerContainer, listItem, spring } from "@/lib/animations";

/**
 * 欢迎卡片组件 - 简洁优雅型
 */
const WelcomeCard = () => {
    const currentHour = new Date().getHours();
    const greeting =
        currentHour < 12 ? "早上好" : currentHour < 18 ? "下午好" : "晚上好";

    return (
        <motion.div
            variants={listItem}
            className="relative overflow-hidden bg-transparent hover:bg-black/20 hover:backdrop-blur-md rounded-3xl border-2 border-white/70 p-6 min-h-[180px] flex flex-col justify-center items-center text-center transition-all duration-300 group"
        >
            {/* 内容 */}
            <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    >
                        <Sparkles className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white">
                        {greeting}
                    </h2>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">WindCity</h3>
                <p className="text-white/80 text-base leading-relaxed">
                    这里是我的个人空间，记录学习、生活和思考的点滴
                </p>
            </div>
        </motion.div>
    );
};

/**
 * 时间线展示组件
 */
const TimelineCard = () => {
    const { statuses, selectStatus } = useStatus();
    const displayStatuses = statuses.slice(0, 6);

    return (
        <motion.div
            variants={listItem}
            className="bg-transparent hover:bg-black/20 hover:backdrop-blur-md rounded-3xl border-2 border-white/70 p-4 flex flex-col h-full transition-all duration-300 group"
        >
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">时间线</h3>
                </div>
                <Link
                    to="/article"
                    className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1"
                >
                    查看全部 <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="relative flex-1 overflow-y-auto min-h-0">
                {/* 时间轴线 */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />

                {/* 时间线项目 */}
                <div className="space-y-3">
                    {displayStatuses.map((status, index) => (
                        <motion.div
                            key={status.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 cursor-pointer group/item"
                            onClick={() => selectStatus(status)}
                        >
                            {/* 时间点 */}
                            <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 border-2 border-white/60 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>

                            {/* 内容卡片 */}
                            <div className="bg-transparent group-hover/item:bg-black/20 group-hover/item:backdrop-blur-sm rounded-xl p-3 border border-white/20 group-hover/item:border-white/40 transition-all">
                                <div className="flex items-center gap-2 text-xs text-white/70 mb-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{status.date}</span>
                                    <Clock className="w-3 h-3 ml-1" />
                                    <span>{status.time}</span>
                                </div>
                                <p className="text-white text-sm leading-relaxed line-clamp-2">
                                    {status.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/**
 * 快速导航卡片组件
 */
const QuickNavCard = () => {
    const navItems = [
        {
            to: "/article",
            icon: FileText,
            title: "文章列表",
            description: "浏览技术文章和学习笔记",
            color: "from-blue-500/20 to-blue-600/20",
            iconColor: "text-blue-400",
        },
        {
            to: "/aboutme",
            icon: User,
            title: "关于我",
            description: "了解更多关于我的信息",
            color: "from-purple-500/20 to-purple-600/20",
            iconColor: "text-purple-400",
        },
    ];

    return (
        <motion.div
            variants={listItem}
            className="bg-transparent hover:bg-black/20 hover:backdrop-blur-md rounded-3xl border-2 border-white/70 p-4 flex flex-col h-full transition-all duration-300"
        >
            <h3 className="text-lg font-semibold text-white mb-3 flex-shrink-0">
                快速导航
            </h3>
            <div className="space-y-2 flex-1">
                {navItems.map((item) => (
                    <Link key={item.to} to={item.to} className="block group">
                        <motion.div
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center gap-3 p-3 bg-transparent group-hover:bg-black/20 group-hover:backdrop-blur-sm rounded-xl border-2 border-white/30 group-hover:border-white/50 transition-all`}
                        >
                            <div
                                className={`p-2 rounded-lg bg-white/10 ${item.iconColor}`}
                            >
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-medium text-sm group-hover:text-white">
                                    {item.title}
                                </div>
                                <div className="text-xs text-white/70">
                                    {item.description}
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

/**
 * 统计信息卡片组件
 */
const StatsCard = () => {
    const { statuses } = useStatus();
    const today = new Date();
    const thisMonth = statuses.filter((s) => {
        const date = new Date(s.date.replace(/\./g, "-"));
        return (
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }).length;

    return (
        <motion.div variants={listItem} className="grid grid-cols-3 gap-2">
            <div className="bg-transparent hover:bg-black/20 hover:backdrop-blur-md rounded-2xl border-2 border-white/70 p-3 text-center transition-all duration-300">
                <div className="text-2xl font-bold text-white mb-0.5">
                    {statuses.length}
                </div>
                <div className="text-xs text-white/70">总动态</div>
            </div>
            <div className="bg-transparent hover:bg-black/20 hover:backdrop-blur-md rounded-2xl border-2 border-white/70 p-3 text-center transition-all duration-300">
                <div className="text-2xl font-bold text-white mb-0.5">
                    {thisMonth}
                </div>
                <div className="text-xs text-white/70">本月</div>
            </div>
            <div className="bg-transparent hover:bg-black/20 hover:backdrop-blur-md rounded-2xl border-2 border-white/70 p-3 text-center transition-all duration-300">
                <div className="text-2xl font-bold text-white mb-0.5">4</div>
                <div className="text-xs text-white/70">文章</div>
            </div>
        </motion.div>
    );
};

/**
 * 状态详情浮窗组件
 */
const StatusDetailModal = () => {
    const { selectedStatus, selectStatus } = useStatus();

    const handleClose = () => {
        selectStatus(null);
    };

    return (
        <AnimatePresence>
            {selectedStatus && (
                <>
                    {/* 遮罩层 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    />

                    {/* 浮窗内容 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={spring}
                        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50 bg-black/5 backdrop-blur-xl rounded-4xl border-3 border-white/80 p-8 overflow-auto max-h-[calc(100vh-2rem)] md:max-h-[80vh]"
                    >
                        {/* 关闭按钮 */}
                        <motion.button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                            }}
                        >
                            <X className="w-5 h-5 text-white" />
                        </motion.button>

                        {/* 日期时间 */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/80 text-sm mb-4"
                        >
                            {selectedStatus.date} · {selectedStatus.time}
                        </motion.div>

                        {/* 状态内容 */}
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-2xl font-bold text-white mb-6"
                        >
                            {selectedStatus.content}
                        </motion.h2>

                        {/* 详细描述 */}
                        {selectedStatus.detail && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/80 leading-relaxed text-lg"
                            >
                                {selectedStatus.detail}
                            </motion.p>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

/**
 * 首页组件
 *
 * 功能：
 * 1. 欢迎信息展示
 * 2. 最新动态摘要
 * 3. 快速导航入口
 * 4. 统计信息展示
 * 5. 状态详情浮窗
 */
export const HomePage = () => {
    return (
        <>
            {/* 主内容区域 - 固定布局 */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="w-full h-full flex flex-col overflow-hidden"
            >
                <div className="flex flex-col h-full gap-2 py-2">
                    {/* 欢迎卡片 */}
                    <div className="flex-shrink-0">
                        <WelcomeCard />
                    </div>

                    {/* 统计信息 */}
                    <div className="flex-shrink-0">
                        <StatsCard />
                    </div>

                    {/* 两栏布局：时间线 + 快速导航 - 填充剩余空间 */}
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <TimelineCard />
                        <QuickNavCard />
                    </div>
                </div>
            </motion.div>

            {/* 状态详情浮窗 */}
            <StatusDetailModal />
        </>
    );
};

export default HomePage;
