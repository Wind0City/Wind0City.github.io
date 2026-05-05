import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    plugins: [react(), tailwindcss()],
    assetsInclude: ["**/*.md"],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // React 核心
                    if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
                        return "vendor-react";
                    }
                    // 路由
                    if (id.includes("node_modules/react-router/") || id.includes("node_modules/react-router-dom/")) {
                        return "vendor-router";
                    }
                    // 动画
                    if (id.includes("node_modules/framer-motion/")) {
                        return "vendor-motion";
                    }
                    // UI 组件库
                    if (
                        id.includes("node_modules/radix-ui/") ||
                        id.includes("node_modules/@hugeicons/react/") ||
                        id.includes("node_modules/lucide-react/")
                    ) {
                        return "vendor-ui";
                    }
                    // Markdown 渲染
                    if (id.includes("node_modules/react-markdown/") || id.includes("node_modules/remark-gfm/")) {
                        return "vendor-markdown";
                    }
                    return undefined;
                },
            },
        },
        // 提高 chunk 大小警告阈值
        chunkSizeWarningLimit: 600,
    },
});
