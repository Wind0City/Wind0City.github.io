import { motion, AnimatePresence } from "framer-motion";
import { useStatus } from "@/hooks/useStatus";

export const StatusCard = () => {
    const { statuses, selectedStatus, selectStatus } = useStatus();

    return (
        <div className="w-full h-full bg-black/20 backdrop-blur-md rounded-4xl border border-white/80 flex flex-col overflow-hidden relative">
            {/* 标题 */}
            <h2 className="absolute top-0 left-0 right-0 z-10 rounded-3xl text-lg font-bold text-white text-center p-3 border-b-2 border-white/80 m-0 bg-white/20 backdrop-blur-xl">
                Status
            </h2>

            {/* 时间轴容器 */}
            <div className="flex-1 overflow-auto px-4 pt-14 pb-2">
                <div className="relative">
                    {/* 竖向时间轴线 */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/30" />

                    {/* 状态列表 */}
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {statuses.map((status, index) => (
                                <motion.div
                                    key={status.id}
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                                    className="relative pl-6"
                                >
                                    {/* 时间轴圆点 */}
                                    <motion.div
                                        className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/80 transition-colors duration-300 ${
                                            selectedStatus?.id === status.id
                                                ? "bg-fuchsia-400"
                                                : "bg-white/60"
                                        }`}
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.9 }}
                                    />

                                    {/* 状态内容卡片 */}
                                    <motion.button
                                        onClick={() => selectStatus(status)}
                                        className={`w-full text-left bg-black/20 rounded-lg p-3 border transition-all duration-300 ${
                                            selectedStatus?.id === status.id
                                                ? "border-fuchsia-400/50 bg-fuchsia-500/10"
                                                : "border-white/10 hover:border-white/30 hover:bg-white/5"
                                        }`}
                                        whileHover={{ scale: 1.02, x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        {/* 日期和时间 */}
                                        <div className="text-xs text-white/50 mb-1">
                                            {status.date} {status.time}
                                        </div>
                                        {/* 状态内容 */}
                                        <p className="text-sm text-white/80 leading-relaxed">
                                            {status.content}
                                        </p>
                                    </motion.button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};
