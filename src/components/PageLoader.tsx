import { motion } from "framer-motion";

export const PageLoader = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center gap-4"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
                />
                <p className="text-white/60 text-sm">加载中...</p>
            </motion.div>
        </div>
    );
};