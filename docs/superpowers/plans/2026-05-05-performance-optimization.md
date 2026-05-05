# Kanban 项目性能优化实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 通过修复 lint 错误、实现代码分割和优化构建配置，将 bundle 大小减少 30% 以上，提升首屏加载速度。

**Architecture:** 采用三阶段优化策略：首先修复代码质量问题，然后实现路由级和组件级懒加载，最后优化 Vite 构建配置，实现第三方库的合理分割。

**Tech Stack:** React 19, TypeScript 6, Vite 8, React Router 7, Framer Motion, React.lazy, Suspense

---

## 文件结构

### 需要创建的文件
- `src/hooks/useStatus.ts` - Status Context 的 hook
- `src/hooks/useTheme.ts` - Theme Context 的 hook
- `src/components/ui/button-variants.ts` - Button 的 variants 定义
- `src/components/PageLoader.tsx` - 页面加载组件

### 需要修改的文件
- `src/components/Article/TableOfContents.tsx` - 修复 useEffect 问题
- `src/components/WindCityDisplay/index.tsx` - 修复 useEffect 问题
- `src/contexts/StatusContext.tsx` - 移除 hook 导出
- `src/contexts/ThemeContext.tsx` - 移除 hook 导出
- `src/components/ui/button.tsx` - 移除 variants 导出
- `src/data/articles.ts` - 移除 console 语句
- `src/router/indext.tsx` - 实现路由懒加载
- `src/pages/Article/index.tsx` - 实现 Markdown 懒加载
- `vite.config.ts` - 配置 manualChunks

---

## 阶段 1：修复 Lint 错误

### Task 1: 修复 TableOfContents 的 useEffect 问题

**Files:**
- Modify: `src/components/Article/TableOfContents.tsx:17-33`

- [ ] **Step 1: 将 useEffect 改为 useMemo**

将 useEffect 中的 setState 逻辑改为使用 useMemo 计算 headings：

```tsx
import { useState, useEffect, useMemo } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
    const [activeId, setActiveId] = useState<string>("");

    // 使用 useMemo 计算标题列表，避免 useEffect 中的 setState
    const headings = useMemo(() => {
        const lines = content.split("\n");
        const items: TOCItem[] = [];

        lines.forEach((line, index) => {
            const match = line.match(/^(#{1,3})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2].trim();
                const id = `heading-${index}`;
                items.push({ id, text, level });
            }
        });

        return items;
    }, [content]);

    useEffect(() => {
        // 监听滚动，高亮当前标题
        const handleScroll = () => {
            const headingElements = document.querySelectorAll(
                "h1, h2, h3",
            );
            let currentId = "";

            headingElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 100) {
                    currentId = el.id;
                }
            });

            setActiveId(currentId);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (headings.length === 0) return null;

    return (
        <nav className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-sm font-semibold text-white/80 mb-3">
                目录
            </h3>
            <ul className="space-y-1">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <button
                            onClick={() => scrollToHeading(heading.id)}
                            className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                                heading.level === 1
                                    ? "font-medium"
                                    : heading.level === 2
                                      ? "pl-4"
                                      : "pl-6"
                            } ${
                                activeId === heading.id
                                    ? "bg-white/20 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            {heading.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
```

- [ ] **Step 2: 验证修改**

运行 lint 检查该文件：

```bash
npm run lint -- src/components/Article/TableOfContents.tsx
```

预期：无 useEffect setState 错误

---

### Task 2: 修复 WindCityDisplay 的 useEffect 问题

**Files:**
- Modify: `src/components/WindCityDisplay/index.tsx:10-17`

- [ ] **Step 1: 简化 useEffect 逻辑**

修复 useEffect 中的 setState 问题，只在 show 为 true 时设置定时器：

```tsx
import { useEffect, useState } from "react";

interface WindCityDisplayProps {
    show: boolean;
}

export const WindCityDisplay = ({ show }: WindCityDisplayProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 只在 show 为 true 时启动定时器
        if (!show) {
            setIsVisible(false);
            return;
        }

        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, [show]);

    if (!show) return null;

    return (
        <div
            className={`w-full h-full flex items-center justify-center transition-all duration-500 ease-out ${
                isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
            }`}
        >
            <h1 className="text-6xl font-bold text-white tracking-wider">
                WindCity
            </h1>
        </div>
    );
};
```

- [ ] **Step 2: 验证修改**

运行 lint 检查该文件：

```bash
npm run lint -- src/components/WindCityDisplay/index.tsx
```

预期：无 useEffect setState 错误

---

### Task 3: 分离 StatusContext 的 hook

**Files:**
- Create: `src/hooks/useStatus.ts`
- Modify: `src/contexts/StatusContext.tsx:140-146`

- [ ] **Step 1: 创建 hooks 目录**

```bash
mkdir -p src/hooks
```

- [ ] **Step 2: 创建 useStatus hook 文件**

```tsx
import { useContext } from "react";
import { StatusContext } from "@/contexts/StatusContext";

export const useStatus = () => {
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error("useStatus must be used within a StatusProvider");
    }
    return context;
};
```

- [ ] **Step 3: 修改 StatusContext 文件**

移除 hook 导出，只保留 Provider：

```tsx
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

export interface StatusItem {
    id: string;
    date: string;
    time: string;
    content: string;
    detail?: string;
}

const statusData: StatusItem[] = [
    {
        id: "1",
        date: "2026.4.29",
        time: "10:30",
        content: "优化博客主界面设计",
        detail:
            "今天完成了主界面的重新设计，添加了状态栏联动功能，让用户可以点击状态查看详细信息。使用了渐进式动画效果，提升了用户体验。",
    },
    {
        id: "2",
        date: "2026.4.23",
        time: "16:38",
        content: "依旧沉迷于装饰 blog",
        detail:
            "花了一整天调整样式，研究 Tailwind CSS 4 的新特性，尝试各种玻璃态效果。",
    },
    {
        id: "3",
        date: "2026.4.23",
        time: "14:20",
        content: "学习 React Router 7 的新特性",
        detail:
            "React Router 7 带来了很多改进，包括更好的类型支持和新的 API。正在逐步迁移项目。",
    },
    {
        id: "4",
        date: "2026.4.22",
        time: "22:15",
        content: "终于把文章分类功能做完了 🎉",
        detail:
            "文章分类功能终于完成了！支持按标签筛选，搜索功能也加上了。虽然花了不少时间，但效果很满意。",
    },
    {
        id: "5",
        date: "2026.4.22",
        time: "18:30",
        content: "调试 Markdown 渲染样式",
        detail: "调整代码块、表格、引用等元素的样式，让文章阅读体验更好。",
    },
    {
        id: "6",
        date: "2026.4.21",
        time: "20:00",
        content: "开始搭建个人博客系统",
        detail:
            "决定用 React + Vite + Tailwind 搭建自己的博客，记录学习和生活。选择这套技术栈是因为开发体验好，构建速度快。",
    },
    {
        id: "7",
        date: "2026.4.20",
        time: "15:45",
        content: "研究 Tailwind CSS 4 的新语法",
        detail:
            "Tailwind CSS 4 带来了全新的配置方式，使用 CSS 变量和 @theme 指令，让主题定制更加灵活。",
    },
    {
        id: "8",
        date: "2026.4.19",
        time: "21:30",
        content: "尝试用 Vite 替换 Webpack",
        detail:
            "Vite 的开发服务器启动速度真的很快，HMR 也几乎即时。迁移过程比想象中顺利。",
    },
    {
        id: "9",
        date: "2026.4.18",
        time: "10:15",
        content: "阅读 TypeScript 高级类型文档",
        detail:
            "深入学习了条件类型、映射类型和模板字面量类型，TypeScript 的类型系统真的很强大。",
    },
    {
        id: "10",
        date: "2026.4.17",
        time: "19:00",
        content: "配置 ESLint 和 Prettier",
        detail:
            "统一了代码风格，配置了保存自动格式化。团队协作必备，避免代码风格争议。",
    },
    {
        id: "11",
        date: "2026.4.16",
        time: "16:20",
        content: "初始化项目结构 🚀",
        detail:
            "创建了基础的 React 项目结构，配置了 TypeScript 和 Vite。一切从零开始，充满期待！",
    },
];

interface StatusContextType {
    statuses: StatusItem[];
    selectedStatus: StatusItem | null;
    selectStatus: (status: StatusItem | null) => void;
    latestStatus: StatusItem | null;
}

// 导出 Context 供 hook 使用
export const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider = ({ children }: { children: ReactNode }) => {
    const [selectedStatus, setSelectedStatus] = useState<StatusItem | null>(
        null,
    );

    const selectStatus = (status: StatusItem | null) => {
        setSelectedStatus(status);
    };

    const latestStatus = statusData.length > 0 ? statusData[0] : null;

    return (
        <StatusContext.Provider
            value={{
                statuses: statusData,
                selectedStatus,
                selectStatus,
                latestStatus,
            }}
        >
            {children}
        </StatusContext.Provider>
    );
};
```

- [ ] **Step 4: 更新导入语句**

查找所有使用 `useStatus` 的文件并更新导入：

```bash
grep -r "from \"@/contexts/StatusContext\"" src --include="*.tsx" --include="*.ts"
```

将导入语句从：
```tsx
import { useStatus } from "@/contexts/StatusContext";
```

改为：
```tsx
import { useStatus } from "@/hooks/useStatus";
```

- [ ] **Step 5: 验证修改**

```bash
npm run lint -- src/contexts/StatusContext.tsx src/hooks/useStatus.ts
```

预期：无 Fast Refresh 错误

---

### Task 4: 分离 ThemeContext 的 hook

**Files:**
- Create: `src/hooks/useTheme.ts`
- Modify: `src/contexts/ThemeContext.tsx:81-87`

- [ ] **Step 1: 创建 useTheme hook 文件**

```tsx
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
```

- [ ] **Step 2: 修改 ThemeContext 文件**

移除 hook 导出，只保留 Provider：

```tsx
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

// 导出 Context 供 hook 使用
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // 从 localStorage 读取主题偏好
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme") as Theme | null;
            if (saved === "light" || saved === "dark") {
                return saved;
            }
            // 跟随系统偏好
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return "dark";
            }
        }
        return "light";
    });

    useEffect(() => {
        // 应用主题到 document
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        // 保存到 localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    // 监听系统主题变化
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            const saved = localStorage.getItem("theme");
            // 只有用户没有手动设置主题时才跟随系统
            if (!saved) {
                setThemeState(e.matches ? "dark" : "light");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const toggleTheme = () => {
        setThemeState((prev) => (prev === "light" ? "dark" : "light"));
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
```

- [ ] **Step 3: 更新导入语句**

查找所有使用 `useTheme` 的文件并更新导入：

```bash
grep -r "from \"@/contexts/ThemeContext\"" src --include="*.tsx" --include="*.ts"
```

将导入语句从：
```tsx
import { useTheme } from "@/contexts/ThemeContext";
```

改为：
```tsx
import { useTheme } from "@/hooks/useTheme";
```

- [ ] **Step 4: 验证修改**

```bash
npm run lint -- src/contexts/ThemeContext.tsx src/hooks/useTheme.ts
```

预期：无 Fast Refresh 错误

---

### Task 5: 分离 button 的 variants

**Files:**
- Create: `src/components/ui/button-variants.ts`
- Modify: `src/components/ui/button.tsx:7-42`

- [ ] **Step 1: 创建 button-variants 文件**

```tsx
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "bg-white/30 backdrop-blur-md shadow-lg shadow-black/10 hover:bg-white/50 hover:shadow-xl hover:shadow-black/15 border border-white/20",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
```

- [ ] **Step 2: 修改 button.tsx**

移除 variants 定义，从新文件导入：

```tsx
import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariantProps } from "./button-variants"

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariantProps & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
```

- [ ] **Step 3: 验证修改**

```bash
npm run lint -- src/components/ui/button.tsx src/components/ui/button-variants.ts
```

预期：无 Fast Refresh 错误

---

### Task 6: 移除 console 语句

**Files:**
- Modify: `src/data/articles.ts:62-64`

- [ ] **Step 1: 移除 console.log 语句**

删除开发环境下的 console.log 调试语句：

```tsx
// 删除以下代码
if (import.meta.env.DEV) {
    console.log("Articles loaded:", articles.length);
}
```

修改后的文件末尾应该是：

```tsx
/**
 * 解析所有 Markdown 文件，生成文章数据数组
 */
const articles: ParsedArticle[] = Object.entries(markdownFiles).map(
    ([id, content]) => {
        return parseMarkdownFile(id, content);
    }
);

/**
 * 获取所有文章列表（不含内容）
 *
 * @returns 文章列表数组，只包含基本信息
 */
export function getArticleList(): Omit<Article, "content">[] {
    return articles.map((article) => ({
        id: article.id,
        title: article.frontmatter.title,
        summary: article.frontmatter.summary,
        date: article.frontmatter.date,
        tags: article.frontmatter.tags,
    }));
}
```

- [ ] **Step 2: 验证修改**

```bash
npm run lint -- src/data/articles.ts
```

预期：无 console 错误

---

### Task 7: 验证所有 lint 错误已修复

- [ ] **Step 1: 运行完整的 lint 检查**

```bash
npm run lint
```

预期：无错误，无警告

- [ ] **Step 2: 提交阶段 1 的修改**

```bash
git add -A
git commit -m "fix: 修复所有 lint 错误

- 修复 TableOfContents 和 WindCityDisplay 的 useEffect setState 问题
- 分离 Context hooks 到独立文件以解决 Fast Refresh 问题
- 分离 button variants 到独立文件
- 移除 console 语句"
```

---

## 阶段 2：代码分割

### Task 8: 创建页面加载组件

**Files:**
- Create: `src/components/PageLoader.tsx`

- [ ] **Step 1: 创建 PageLoader 组件**

```tsx
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
```

- [ ] **Step 2: 验证组件创建**

```bash
npm run lint -- src/components/PageLoader.tsx
```

---

### Task 9: 实现路由级懒加载

**Files:**
- Modify: `src/router/indext.tsx`

- [ ] **Step 1: 修改路由配置**

使用 React.lazy 和 Suspense 实现页面懒加载：

```tsx
/**
 * 路由配置文件
 *
 * 功能：
 * 1. 定义应用的所有路由路径
 * 2. 配置路由与页面的映射关系
 * 3. 支持动态路由参数（如文章 ID）
 * 4. 使用根布局避免状态栏重新渲染
 * 5. 实现路由级懒加载，优化首屏性能
 */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

// 导入布局组件
import { RootLayout } from "@/components/RootLayout";
import { PageLoader } from "@/components/PageLoader";

// 懒加载页面组件
const HomePage = lazy(() => import("@/pages/Home"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const TestPage = lazy(() => import("@/pages/Test"));
const ArticlePage = lazy(() => import("@/pages/Article"));

/**
 * 路由配置数组
 *
 * 使用嵌套路由结构：
 * - RootLayout 作为父路由，包含 StatusCard 和导航栏
 * - 子路由只渲染页面内容，避免重新渲染整个布局
 * - 使用 Suspense 实现页面加载状态
 */
const routes = [
    {
        // 根路由：包含布局
        element: <RootLayout />,
        children: [
            {
                // 首页
                path: "/",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                // 个人简介页面
                path: "/aboutme",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <ProfilePage />
                    </Suspense>
                ),
            },
            {
                // 测试页面（文章列表）
                path: "/test",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <TestPage />
                    </Suspense>
                ),
            },
            {
                // 文章详情页面
                // 使用动态路由参数 :id 匹配文章 ID
                // 例如：/article/getting-started-with-react
                path: "/article/:id",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <ArticlePage />
                    </Suspense>
                ),
            },
        ],
    },
];

/**
 * 创建并导出路由实例
 *
 * createBrowserRouter 创建一个 BrowserRouter 实例
 * 用于在应用中实现客户端路由
 */
export const router = createBrowserRouter(routes);
```

- [ ] **Step 2: 验证路由配置**

```bash
npm run lint -- src/router/indext.tsx
```

---

### Task 10: 实现 Markdown 渲染器懒加载

**Files:**
- Modify: `src/pages/Article/index.tsx`

- [ ] **Step 1: 检查 Article 页面当前实现**

```bash
cat src/pages/Article/index.tsx
```

- [ ] **Step 2: 修改 Article 页面，懒加载 Markdown 渲染器**

根据当前实现，将 react-markdown 改为懒加载：

```tsx
import { lazy, Suspense } from "react";
import { useParams } from "react-router";
import { getArticleById } from "@/data/articles";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

// 懒加载 Markdown 渲染器
const ReactMarkdown = lazy(() => import("react-markdown"));

export const ArticlePage = () => {
    const { id } = useParams<{ id: string }>();
    const article = id ? getArticleById(id) : undefined;

    if (!article) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-white/60">文章未找到</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-auto p-6">
            <article className="prose prose-invert max-w-none">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {article.title}
                    </h1>
                    <div className="flex gap-4 text-white/60 text-sm">
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.tags.join(", ")}</span>
                    </div>
                </header>
                <Suspense fallback={<SkeletonLoader />}>
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </Suspense>
            </article>
        </div>
    );
};
```

- [ ] **Step 3: 验证修改**

```bash
npm run lint -- src/pages/Article/index.tsx
```

---

### Task 11: 配置 Vite manualChunks

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: 更新 Vite 配置**

添加 manualChunks 配置优化第三方库分割：

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // React 核心
                    "vendor-react": ["react", "react-dom"],
                    // 路由
                    "vendor-router": ["react-router", "react-router-dom"],
                    // 动画
                    "vendor-motion": ["framer-motion"],
                    // UI 组件库
                    "vendor-ui": [
                        "radix-ui",
                        "@hugeicons/react",
                        "lucide-react",
                    ],
                    // Markdown 渲染
                    "vendor-markdown": [
                        "react-markdown",
                        "remark-gfm",
                    ],
                },
            },
        },
        // 提高 chunk 大小警告阈值
        chunkSizeWarningLimit: 600,
    },
});
```

- [ ] **Step 2: 验证配置**

```bash
npm run build
```

检查构建输出，确认生成了多个 chunk 文件。

---

### Task 12: 检查未使用的依赖

- [ ] **Step 1: 安装 depcheck**

```bash
npm install -g depcheck
```

- [ ] **Step 2: 运行依赖检查**

```bash
depcheck /Users/windcity/Downloads/JS/kanban
```

- [ ] **Step 3: 根据检查结果移除无用依赖**

如果有未使用的依赖，移除它们：

```bash
npm uninstall <unused-package>
```

- [ ] **Step 4: 提交阶段 2 的修改**

```bash
git add -A
git commit -m "feat: 实现代码分割优化

- 添加 PageLoader 组件用于路由加载状态
- 实现路由级懒加载，每个页面独立 chunk
- 实现 Markdown 渲染器懒加载
- 配置 Vite manualChunks 优化第三方库分割
- 检查并移除未使用的依赖"
```

---

## 阶段 3：验证与测试

### Task 13: 功能测试

- [ ] **Step 1: 构建项目**

```bash
npm run build
```

预期：构建成功，无错误。

- [ ] **Step 2: 启动预览服务器**

```bash
npm run preview
```

- [ ] **Step 3: 测试所有页面路由**

在浏览器中测试：
1. 访问首页 `/` - 应该正常显示
2. 访问文章列表 `/test` - 应该正常显示
3. 点击文章进入详情页 `/article/:id` - 应该正常显示
4. 访问个人简介 `/aboutme` - 应该正常显示
5. 测试主题切换功能 - 应该正常工作

预期：所有页面正常加载，无白屏或错误。

---

### Task 14: 性能测试

- [ ] **Step 1: 检查构建产物大小**

```bash
ls -lh dist/assets/*.js | awk '{print $9, $5}'
```

记录各 chunk 的大小。

- [ ] **Step 2: 对比优化前后的 bundle 大小**

优化前：
- index.js: 589KB

优化后预期：
- index.js: < 200KB
- vendor-*.js: 各 40-130KB
- 页面 chunks: 各 20-50KB

- [ ] **Step 3: 使用 Chrome DevTools 测试加载性能**

1. 打开 Chrome DevTools
2. 切换到 Network 标签
3. 刷新页面
4. 检查：
   - 首屏加载的资源总大小
   - JavaScript 资源的加载顺序
   - 是否有懒加载的 chunk

预期：首屏加载资源明显减少，懒加载 chunk 在路由切换时才加载。

---

### Task 15: 最终代码审查

- [ ] **Step 1: 运行完整的 lint 检查**

```bash
npm run lint
```

预期：无错误，无警告。

- [ ] **Step 2: 运行类型检查**

```bash
npm run build
```

预期：TypeScript 编译成功，无类型错误。

- [ ] **Step 3: 提交最终修改**

```bash
git add -A
git commit -m "docs: 更新构建配置和性能优化文档"
```

---

### Task 16: 生成优化报告

- [ ] **Step 1: 创建优化报告**

```bash
cat > docs/superpowers/optimization-report.md << 'EOF'
# Kanban 项目性能优化报告

**日期：** 2026-05-05
**状态：** 已完成

---

## 优化结果

### Bundle 大小对比

**优化前：**
- index.js: 589KB (gzip: 186KB)
- index.css: 47KB (gzip: 8.5KB)

**优化后：**
- index.js: [待填写]
- vendor-react.js: [待填写]
- vendor-router.js: [待填写]
- vendor-motion.js: [待填写]
- vendor-ui.js: [待填写]
- vendor-markdown.js: [待填写]
- 页面 chunks: [待填写]

**总体改进：**
- 首屏加载减少：[待填写]%
- 总体积减少：[待填写]%

### Lint 错误

- 优化前：6 个错误
- 优化后：0 个错误

### 代码质量改进

1. ✅ 修复 useEffect 中的 setState 问题
2. ✅ 分离 Context hooks 解决 Fast Refresh 问题
3. ✅ 分离 button variants
4. ✅ 移除 console 语句
5. ✅ 实现路由级懒加载
6. ✅ 实现组件级懒加载
7. ✅ 优化第三方库分割

---

## 性能提升

- **首屏加载时间：** 减少 [待填写]%
- **Time to Interactive：** 减少 [待填写]%
- **开发体验：** Fast Refresh 正常工作

---

## 后续建议

1. 考虑添加 Service Worker 缓存
2. 优化图片资源（WebP 格式）
3. 字体子集化
4. 考虑 SSR/SSG 方案
EOF
```

- [ ] **Step 2: 提交优化报告**

```bash
git add docs/superpowers/optimization-report.md
git commit -m "docs: 添加性能优化报告"
```

---

## 完成标准

- [ ] 所有 lint 错误已修复
- [ ] 构建成功，无错误
- [ ] 所有页面功能正常
- [ ] Bundle 大小减少至少 30%
- [ ] 首屏加载速度明显提升
- [ ] 代码质量符合最佳实践
