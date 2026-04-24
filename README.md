# WindCity Kanban

一个现代化的看板应用，采用 React + TypeScript + Vite 构建，具有视频背景、玻璃态设计和流畅的页面切换动画。

## 技术栈

### 核心框架
- **React 19** - 最新版本的 React 框架
- **TypeScript 6** - 类型安全的 JavaScript 超集
- **Vite 8** - 极速的前端构建工具

### UI 与样式
- **Tailwind CSS 4** - 原子化 CSS 框架
- **shadcn/ui** - 基于 Radix UI 的组件库
- **liquid-glass-react** - 液态玻璃效果组件
- **Radix UI** - 无样式原语组件库
- **Lucide React** - 图标库
- **HugeIcons** - 图标库

### 状态管理
- **Zustand** - 轻量级状态管理库

### 路由
- **React Router 7** - React 官方路由库

### 拖拽功能
- **@dnd-kit/core** - 现代化的拖拽库

### 工具库
- **clsx** - 条件类名拼接
- **tailwind-merge** - Tailwind 类名合并
- **class-variance-authority (CVA)** - 组件变体管理

---

## 项目结构

```
src/
├── components/           # 可复用组件
│   ├── AnimatedCard/    # 动画卡片组件
│   ├── Board/           # 看板相关组件
│   │   ├── index.tsx    # 看板主组件
│   │   ├── Task.tsx     # 任务卡片
│   │   └── KanbanGroup.tsx # 看板分组
│   ├── Layout/          # 布局组件
│   └── ui/              # shadcn/ui 组件
├── pages/               # 页面组件
│   ├── Home/            # 首页
│   ├── Borad/           # 看板页面
│   ├── Profile/         # 个人简介页
│   └── Test/            # 测试页面
├── stores/              # Zustand 状态管理
│   └── useKanban.tsx    # 看板状态
├── router/              # 路由配置
├── lib/                 # 工具函数
└── App.tsx              # 应用入口
```

---

## 核心知识点

### 1. Tailwind CSS 4 新特性

```css
/* 使用 @import 导入 */
@import "tailwindcss";

/* 自定义变体 */
@custom-variant dark (&:is(.dark *));

/* CSS 变量与 Tailwind 结合 */
:root {
    --background: oklch(1 0 0);
}

/* @theme 定义主题变量 */
@theme inline {
    --font-sans: 'Figtree Variable', sans-serif;
    --color-background: var(--background);
}
```

**关键点：**
- `oklch()` 颜色空间 - 更直观的颜色表示
- `@theme inline` - 将 CSS 变量映射为 Tailwind 类
- `backdrop-blur-md` - 毛玻璃效果
- `bg-white/10` - 透明度语法

### 2. Zustand 状态管理

```typescript
import { create } from "zustand";

interface Board {
    groupId: string;
    groupName: string;
    tasks: Task[];
}

export const useKanban = create<{
    boards: Board[];
    createBoard: (board: Board) => void;
    updateBoard: (board: Board) => void;
    moveTask: (taskId: string, sourceGroupId: string, targetGroupId: string) => void;
}>((set) => ({
    boards: [],
    createBoard: (board) => set((state) => ({ 
        boards: [...state.boards, board] 
    })),
    updateBoard: (board) => set((state) => ({
        boards: state.boards.map((b) => 
            b.groupId === board.groupId ? board : b
        ),
    })),
}));
```

**关键点：**
- `create` 创建 store
- `set` 更新状态（不可变更新）
- 直接解构使用：`const { boards } = useKanban()`

### 3. @dnd-kit 拖拽实现

```tsx
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

// 可拖拽元素
const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "task-1",
    data: { type: "task" },
});

// 可放置区域
const { setNodeRef } = useDroppable({
    id: "group-1",
});

// 拖拽结束处理
const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // active.id - 被拖拽元素 ID
    // over.id - 目标区域 ID
};
```

**关键点：**
- `UniqueIdentifier` 类型需要 `String()` 转换
- `transform` 用于拖拽时的位置变换
- `data` 可携带自定义数据

### 4. React Router 7

```tsx
import { createBrowserRouter, RouterProvider, Link } from "react-router";

const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/Board", element: <BoardPage /> },
];

export const router = createBrowserRouter(routes);

// 在 App 中使用
<RouterProvider router={router} />

// 导航链接
<Link to="/Board">跳转到看板</Link>
```

**关键点：**
- `createBrowserRouter` 创建路由实例
- `Link` 组件实现 SPA 导航（不刷新页面）
- 导航栏放在 `App.tsx` 层级可避免路由切换时重新渲染

### 5. CSS 动画与过渡

```tsx
// AnimatedCard 组件实现
const [isExpanded, setIsExpanded] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 50);
    return () => clearTimeout(timer);
}, []);

return (
    <div
        className="transition-all ease-out"
        style={{
            width: isExpanded ? expandedWidth : initialWidth,
            height: isExpanded ? expandedHeight : initialHeight,
            transitionDuration: `${duration}ms`,
        }}
    >
        {children}
    </div>
);
```

**关键点：**
- `useEffect` 触发初始动画
- `transition-all` 过渡所有属性
- `calc()` 动态计算尺寸

### 6. 视频背景实现

```tsx
<video
    className="fixed inset-0 w-full h-full object-cover pointer-events-none"
    autoPlay
    muted
    loop
    playsInline
>
    <source src="/video.mp4" type="video/mp4" />
</video>
```

**关键点：**
- `fixed` 定位覆盖全屏
- `pointer-events-none` 防止阻挡交互
- `muted` 静音自动播放
- 放在 `App.tsx` 层级避免路由切换重置

### 7. 玻璃态设计 (Glassmorphism)

```tsx
<div className="
    backdrop-blur-md      // 背景模糊
    bg-white/10           // 半透明背景
    border border-white/30 // 半透明边框
    rounded-3xl           // 大圆角
    shadow-lg             // 阴影
">
```

**关键点：**
- `backdrop-blur` - 毛玻璃效果
- `/` 语法设置透明度
- 多层叠加增强效果

### 8. TypeScript 配置

```json
{
    "compilerOptions": {
        "moduleResolution": "bundler",
        "verbatimModuleSyntax": true,  // 类型导入必须用 type
        "paths": {
            "@/*": ["./src/*"]  // 路径别名
        }
    }
}
```

**关键点：**
- `verbatimModuleSyntax` 要求 `import type { X }`
- `paths` 配合 Vite 的 `resolve.alias`

### 9. Vite 配置

```typescript
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [react(), tailwindcss()],
});
```

### 10. shadcn/ui 组件变体

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full",
    {
        variants: {
            variant: {
                default: "bg-primary text-white",
                glass: "bg-white/30 backdrop-blur-md shadow-lg",
            },
        },
    }
);
```

---

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码格式化
npm run format

# 代码检查
npm run lint
```

---

## 学习资源

- [React 官方文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [Zustand 文档](https://zustand-demo.pmnd.rs)
- [dnd-kit 文档](https://docs.dndkit.com)
- [React Router 文档](https://reactrouter.com)
- [shadcn/ui 文档](https://ui.shadcn.com)
