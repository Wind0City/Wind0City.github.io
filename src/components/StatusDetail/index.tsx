import { motion, AnimatePresence } from "framer-motion";
import { useStatus } from "@/contexts/StatusContext";
import { X } from "lucide-react";
import { spring } from "@/lib/animations";

export const StatusDetail = () => {
    const { selectedStatus, selectStatus } = useStatus();

    const handleClose = () => {
        selectStatus(null);
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-8 overflow-hidden">
            <AnimatePresence mode="wait">
                {selectedStatus && (
                    <motion.div
                        key={selectedStatus.id}
                        initial={{ x: -200, opacity: 0, scale: 0.9 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: -200, opacity: 0, scale: 0.9 }}
                        transition={spring}
                        className="max-w-2xl w-full bg-black/30 backdrop-blur-xl rounded-3xl border border-white/40 p-8 relative"
                    >
                        {/* 关闭按钮 */}
                        <motion.button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <X className="w-5 h-5 text-white" />
                        </motion.button>

                        {/* 日期时间 */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/50 text-sm mb-4"
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
                )}
            </AnimatePresence>
        </div>
    );
};
