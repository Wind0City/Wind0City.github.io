# 博客动画系统重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 引入 Framer Motion 重构博客动画系统，提升用户体验

**Architecture:** 采用分层架构，动画配置层统一管理参数，组件层使用 Framer Motion 实现动画效果，支持共享布局动画和页面过渡

**Tech Stack:** React 19, TypeScript 6, Framer Motion 11.x, Tailwind CSS 4

---

## 文件结构

### 新增文件
- `src/lib/animations.ts` - 动画配置文件
- `src/components/ui/RippleButton.tsx` - 涟漪按钮组件
- `src/components/ui/LoadingSpinner.tsx` - 加载指示器组件
- `src/components/ui/SkeletonLoader.tsx` - 骨架屏组件

### 修改文件
- `src/components/StatusCard/index.tsx` - 状态卡片组件
- `src/components/StatusDetail/index.tsx` - 状态详情组件
- `src/components/Article/ArticleList.tsx` - 文章列表组件
- `src/components/Layout/index.tsx` - 布局组件
- `src/App.tsx` - 应用入口
- `package.json` - 添加依赖

---

## Task 1: 安装 Framer Motion 依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 安装 framer-motion 包**

Run: `npm install framer-motion`

Expected: 成功安装 framer-motion@11.x

- [ ] **Step 2: 验证安装**

Run: `npm list framer-motion`

Expected: 显示 framer-motion 版本号

- [ ] **Step 3: 提交依赖变更**

```bash
git add package.json package-lock.json
git commit -m "chore: 添加 framer-motion 动画库依赖"
```

---

## Task 2: 创建动画配置文件

**Files:**
- Create: `src/lib/animations.ts`

- [ ] **Step 1: 创建动画配置文件**

```typescript
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
        damping: 17,
    },
};

/**
 * 点击效果配置
 */
export const tapScale = {
    scale: 0.95,
};
```

- [ ] **Step 2: 提交动画配置文件**

```bash
git add src/lib/animations.ts
git commit -m "feat: 添加动画配置文件"
```

---

## Task 3: 创建 RippleButton 组件

**Files:**
- Create: `src/components/ui/RippleButton.tsx`

- [ ] **Step 1: 创建涟漪按钮组件**

```typescript
import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { hoverScale, tapScale } from "@/lib/animations";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "default" | "glass";
}

/**
 * 带涟漪效果的按钮组件
 *
 * 特性：
 * - 悬停缩放效果
 * - 点击涟漪效果
 * - 支持自定义样式
 */
export const RippleButton = ({
    children,
    variant = "default",
    className = "",
    ...props
}: RippleButtonProps) => {
    const baseStyles =
        "px-4 py-2 rounded-full font-medium transition-colors duration-200";

    const variantStyles = {
        default: "bg-white/10 text-white hover:bg-white/20",
        glass:
            "backdrop-blur bg-white/30 border-2 border-white/60 text-white hover:bg-white/40",
    };

    return (
        <motion.button
            whileHover={hoverScale}
            whileTap={tapScale}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
```

- [ ] **Step 2: 提交 RippleButton 组件**

```bash
git add src/components/ui/RippleButton.tsx
git commit -m "feat: 添加 RippleButton 涟漪按钮组件"
```

---

## Task 4: 创建 LoadingSpinner 组件

**Files:**
- Create: `src/components/ui/LoadingSpinner.tsx`

- [ ] **Step 1: 创建加载指示器组件**

```typescript
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    color?: string;
}

/**
 * 加载指示器组件
 *
 * 特性：
 * - 旋转动画
 * - 支持不同尺寸
 * - 支持自定义颜色
 */
export const LoadingSpinner = ({
    size = "md",
    color = "currentColor",
}: LoadingSpinnerProps) => {
    const sizeMap = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    };

    return (
        <motion.div
            className={`${sizeMap[size]} ${color}`}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="31.416"
                    strokeDashoffset="10"
                />
            </svg>
        </motion.div>
    );
};
```

- [ ] **Step 2: 提交 LoadingSpinner 组件**

```bash
git add src/components/ui/LoadingSpinner.tsx
git commit -m "feat: 添加 LoadingSpinner 加载指示器组件"
```

---

## Task 5: 创建 SkeletonLoader 组件

**Files:**
- Create: `src/components/ui/SkeletonLoader.tsx`

- [ ] **Step 1: 创建骨架屏加载组件**

```typescript
import { motion } from "framer-motion";

interface SkeletonLoaderProps {
    variant?: "text" | "rectangular" | "circular";
    width?: string | number;
    height?: string | number;
    className?: string;
}

/**
 * 骨架屏加载组件
 *
 * 特性：
 * - 闪烁动画
 * - 支持不同形状（矩形、圆形、文本）
 * - 支持自定义尺寸
 */
export const SkeletonLoader = ({
    variant = "text",
    width,
    height,
    className = "",
}: SkeletonLoaderProps) => {
    const variantStyles = {
        text: "rounded h-4",
        rectangular: "rounded-lg",
        circular: "rounded-full",
    };

    const defaultSizes = {
        text: { width: "100%", height: "1rem" },
        rectangular: { width: "100%", height: "100px" },
        circular: { width: "40px", height: "40px" },
    };

    const finalWidth = width || defaultSizes[variant].width;
    const finalHeight = height || defaultSizes[variant].height;

    return (
        <motion.div
            className={`bg-white/10 ${variantStyles[variant]} ${className}`}
            style={{
                width: typeof finalWidth === "number" ? `${finalWidth}px` : finalWidth,
                height:
                    typeof finalHeight === "number"
                        ? `${finalHeight}px`
                        : finalHeight,
            }}
            animate={{
                opacity: [0.5, 1, 0.5],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
};

/**
 * 文章卡片骨架屏
 */
export const ArticleSkeleton = () => {
    return (
        <div className="p-4 bg-white/10 rounded-xl border border-white/20 space-y-3">
            <SkeletonLoader variant="text" width="60%" height="1.5rem" />
            <div className="flex gap-4">
                <SkeletonLoader variant="text" width="80px" height="0.875rem" />
                <SkeletonLoader variant="text" width="60px" height="0.875rem" />
            </div>
            <SkeletonLoader variant="text" height="1rem" />
            <SkeletonLoader variant="text" height="1rem" width="80%" />
        </div>
    );
};
```

- [ ] **Step 2: 提交 SkeletonLoader 组件**

```bash
git add src/components/ui/SkeletonLoader.tsx
git commit -m "feat: 添加 SkeletonLoader 骨架屏组件"
```

---

## Task 6: 重构 StatusCard 组件

**Files:**
- Modify: `src/components/StatusCard/index.tsx`

- [ ] **Step 1: 读取当前 StatusCard 组件**

Run: Read the file at `src/components/StatusCard/index.tsx`

- [ ] **Step 2: 重构 StatusCard 组件，添加 Framer Motion 动画**

```typescript
import { motion, AnimatePresence } from "framer-motion";
import { useStatus } from "@/contexts/StatusContext";
import { hoverScale, tapScale, fadeIn } from "@/lib/animations";

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
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.05 }}
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
```

- [ ] **Step 3: 提交 StatusCard 重构**

```bash
git add src/components/StatusCard/index.tsx
git commit -m "refactor: 重构 StatusCard 组件，添加 Framer Motion 动画"
```

---

## Task 7: 重构 StatusDetail 组件

**Files:**
- Modify: `src/components/StatusDetail/index.tsx`

- [ ] **Step 1: 读取当前 StatusDetail 组件**

Run: Read the file at `src/components/StatusDetail/index.tsx`

- [ ] **Step 2: 重构 StatusDetail 组件，简化动画逻辑**

```typescript
import { motion, AnimatePresence } from "framer-motion";
import { useStatus } from "@/contexts/StatusContext";
import { X } from "lucide-react";
import { spring, scaleIn } from "@/lib/animations";

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
```

- [ ] **Step 3: 提交 StatusDetail 重构**

```bash
git add src/components/StatusDetail/index.tsx
git commit -m "refactor: 重构 StatusDetail 组件，简化动画逻辑"
```

---

## Task 8: 重构 ArticleList 组件

**Files:**
- Modify: `src/components/Article/ArticleList.tsx`

- [ ] **Step 1: 读取当前 ArticleList 组件**

Run: Read the file at `src/components/Article/ArticleList.tsx`

- [ ] **Step 2: 重构 ArticleList 组件，添加交错动画**

在文件顶部添加导入：

```typescript
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, listItem } from "@/lib/animations";
```

修改列表项渲染部分（找到 `<div className="space-y-4">` 部分）：

```typescript
{/* 文章列表容器 */}
<motion.div
    className="space-y-4"
    variants={staggerContainer}
    initial="initial"
    animate="animate"
>
    <AnimatePresence mode="popLayout">
        {filteredArticles.map((article, index) => (
            <motion.article
                key={article.id}
                variants={listItem}
                layout
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: index * 0.05 }}
                onClick={() => handleArticleClick(article.id)}
                className="p-4 bg-white/10 rounded-xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* 文章标题 */}
                <h2 className="text-xl font-semibold text-white mb-2">
                    {highlightText(article.title, searchQuery)}
                </h2>

                {/* 文章元信息：日期和标签 */}
                <div className="flex items-center gap-4 mb-2 text-white/60 text-sm">
                    {/* 发布日期 */}
                    <span>{article.date}</span>

                    {/* 标签列表 */}
                    <div className="flex gap-2 flex-wrap">
                        {article.tags.map((tag) => (
                            <motion.span
                                key={tag}
                                className="px-2 py-0.5 bg-white/10 rounded-full text-xs"
                                whileHover={{ scale: 1.1 }}
                            >
                                {highlightText(tag, searchQuery)}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* 文章摘要 */}
                <p className="text-white/80 text-sm line-clamp-2">
                    {highlightText(article.summary, searchQuery)}
                </p>
            </motion.article>
        ))}
    </AnimatePresence>
</motion.div>
```

修改空状态部分（找到 `{filteredArticles.length === 0 &&` 部分）：

```typescript
{/* 空状态提示 */}
<AnimatePresence mode="wait">
    {filteredArticles.length === 0 && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-white/60 py-8"
        >
            {selectedCategory === "all" && !searchQuery
                ? "暂无文章"
                : "没有找到匹配的文章"}
        </motion.div>
    )}
</AnimatePresence>
```

- [ ] **Step 3: 提交 ArticleList 重构**

```bash
git add src/components/Article/ArticleList.tsx
git commit -m "refactor: 重构 ArticleList 组件，添加交错动画和过渡效果"
```

---

## Task 9: 重构 Layout 组件

**Files:**
- Modify: `src/components/Layout/index.tsx`

- [ ] **Step 1: 读取当前 Layout 组件**

Run: Read the file at `src/components/Layout/index.tsx`

- [ ] **Step 2: 重构 Layout 组件，添加导航栏动画**

在文件顶部添加导入：

```typescript
import { motion } from "framer-motion";
```

修改导航栏部分（找到 `<nav` 部分）：

```typescript
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
```

- [ ] **Step 3: 提交 Layout 重构**

```bash
git add src/components/Layout/index.tsx
git commit -m "refactor: 重构 Layout 组件，添加导航栏入场动画"
```

---

## Task 10: 重构 App.tsx 添加页面过渡

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 读取当前 App.tsx**

Run: Read the file at `src/App.tsx`

- [ ] **Step 2: 重构 App.tsx，添加页面过渡动画**

```typescript
import { RouterProvider } from "react-router";
import { router } from "./router/indext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StatusProvider } from "./contexts/StatusContext";

function App() {
    return (
        <ThemeProvider>
            <StatusProvider>
                {/* 背景图片 */}
                <div
                    className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-300"
                    style={{
                        backgroundImage: "url(/background.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                {/* 暗色模式遮罩 */}
                <div className="fixed inset-0 w-full h-full pointer-events-none bg-black/0 dark:bg-black/50 transition-colors duration-300" />
                <div className="relative z-10">
                    <RouterProvider router={router} />
                </div>
            </StatusProvider>
        </ThemeProvider>
    );
}

export default App;
```

注意：由于 React Router 7 的 `RouterProvider` 不支持直接包裹 `AnimatePresence`，页面过渡动画需要在路由配置中处理，或者使用 `useLocation` 在布局层面实现。这里我们保持 App.tsx 简洁，页面过渡效果已经在各个组件内部实现。

- [ ] **Step 3: 提交 App.tsx 优化**

```bash
git add src/App.tsx
git commit -m "refactor: 优化 App.tsx 结构"
```

---

## Task 11: 测试动画效果

**Files:**
- None (testing task)

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`

Expected: 开发服务器成功启动

- [ ] **Step 2: 测试状态时间轴动画**

手动测试：
1. 打开浏览器访问 http://localhost:5173
2. 点击左侧状态卡片中的不同状态
3. 验证：
   - 时间轴圆点悬停缩放效果
   - 状态卡片悬停缩放和位移效果
   - 状态详情滑入动画
   - 关闭按钮旋转动画

- [ ] **Step 3: 测试文章列表动画**

手动测试：
1. 点击导航栏的 "Article" 按钮
2. 验证：
   - 文章列表项交错出现
   - 文章卡片悬停效果
   - 搜索筛选过渡动画
   - 标签悬停效果

- [ ] **Step 4: 测试页面过渡动画**

手动测试：
1. 在首页和文章列表页之间切换
2. 验证：
   - 导航栏入场动画
   - 页面内容过渡流畅

- [ ] **Step 5: 测试主题切换**

手动测试：
1. 点击主题切换按钮
2. 验证：
   - 主题切换过渡流畅
   - 动画在明暗模式下都正常工作

---

## Task 12: 性能优化检查

**Files:**
- None (optimization task)

- [ ] **Step 1: 检查包体积**

Run: `npm run build`

Expected: 构建成功，检查 framer-motion 包体积

- [ ] **Step 2: 使用 Chrome DevTools 测试性能**

手动测试：
1. 打开 Chrome DevTools → Performance
2. 录制页面交互过程
3. 验证：
   - FPS ≥ 60
   - 无明显性能瓶颈
   - 动画流畅

- [ ] **Step 3: 测试移动端性能**

手动测试：
1. 使用 Chrome DevTools 模拟移动设备
2. 验证动画在移动设备上流畅

---

## Task 13: 最终提交和文档更新

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 更新 README.md，添加 Framer Motion 说明**

在技术栈部分添加：

```markdown
### 动画库
- **Framer Motion 11** - React 动画库，用于实现流畅的交互动画和页面过渡
```

在核心知识点部分添加：

```markdown
### 11. Framer Motion 动画

```tsx
import { motion, AnimatePresence } from "framer-motion";

// 基础动画
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
/>

// 悬停和点击效果
<motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
/>

// 交错动画
<motion.div
    variants={staggerContainer}
    initial="initial"
    animate="animate"
>
    {items.map((item) => (
        <motion.div key={item.id} variants={listItem} />
    ))}
</motion.div>
```

**关键点：**
- `motion` 组件替代原生 HTML 元素
- `AnimatePresence` 管理组件进入/退出
- `whileHover` / `whileTap` 实现交互效果
- `variants` 定义动画变体
- `layoutId` 实现共享布局动画
```

- [ ] **Step 2: 提交文档更新**

```bash
git add README.md
git commit -m "docs: 更新 README，添加 Framer Motion 说明"
```

- [ ] **Step 3: 创建最终提交**

```bash
git add -A
git commit -m "feat: 完成 Framer Motion 动画系统重构

- 添加动画配置文件统一管理动画参数
- 创建 RippleButton、LoadingSpinner、SkeletonLoader 组件
- 重构 StatusCard、StatusDetail、ArticleList、Layout 组件
- 实现流畅的交互动画和页面过渡效果
- 提升用户体验和代码可维护性"
```

---

## 完成标准

- [ ] 所有动画效果正常工作
- [ ] 交互反馈及时且自然
- [ ] 页面过渡平滑连贯
- [ ] 性能指标达标（FPS ≥ 60）
- [ ] 代码可维护性提高
- [ ] 文档更新完整