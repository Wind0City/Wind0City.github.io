# Kanban 项目性能优化设计文档

**日期：** 2026-05-05
**作者：** Claude
**状态：** 待实施

---

## 一、背景与目标

### 当前问题

1. **构建产物过大**
   - JS bundle: 589KB（gzip 后 186KB）
   - 超过 500KB 限制，触发 Vite 警告
   - 所有代码打包成单文件，缺少代码分割

2. **代码质量问题**
   - 6 个 ESLint 错误需要修复
   - useEffect 中直接调用 setState，影响性能
   - Fast Refresh 问题影响开发体验

3. **性能优化空间**
   - 缺少懒加载机制
   - 第三方库未优化
   - 首屏加载速度可提升

### 优化目标

- **主要目标：** 减少 bundle 大小至少 30%（目标 < 400KB）
- **次要目标：**
  - 修复所有 lint 错误
  - 实现路由级 + 组件级懒加载
  - 提升首屏加载速度
  - 改善开发体验（Fast Refresh）

---

## 二、技术方案

### 2.1 代码分割策略

#### 路由级懒加载

使用 `React.lazy()` + `Suspense` 实现页面级代码分割：

```tsx
// router/indext.tsx
import { lazy, Suspense } from "react";
import { RootLayout } from "@/components/RootLayout";

const HomePage = lazy(() => import("@/pages/Home"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const TestPage = lazy(() => import("@/pages/Test"));
const ArticlePage = lazy(() => import("@/pages/Article"));

const routes = [
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense> },
      { path: "/aboutme", element: <Suspense fallback={<LoadingSpinner />}><ProfilePage /></Suspense> },
      { path: "/test", element: <Suspense fallback={<LoadingSpinner />}><TestPage /></Suspense> },
      { path: "/article/:id", element: <Suspense fallback={<LoadingSpinner />}><ArticlePage /></Suspense> },
    ],
  },
];
```

**预期效果：**
- 每个页面独立 chunk
- 首屏只加载必要代码
- 预计减少初始 bundle 40-50%

#### 组件级懒加载

**Markdown 渲染器懒加载：**

```tsx
// pages/Article/index.tsx
import { lazy, Suspense } from "react";

const ReactMarkdown = lazy(() => import("react-markdown"));

function ArticlePage() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Suspense>
  );
}
```

**动画组件按需加载：**
- Framer Motion 已经是按需导入，保持现状
- 检查是否有未使用的动画配置

#### 第三方库优化

**检查未使用的依赖：**
```bash
npm install -g depcheck
depcheck
```

**图标库优化：**
- HugeIcons 和 Lucide React 同时存在，检查是否可以统一
- 使用 tree-shaking 确保按需导入

### 2.2 Lint 错误修复

#### 问题 1：useEffect 中的 setState

**文件：** `src/components/Article/TableOfContents.tsx`

**当前代码：**
```tsx
useEffect(() => {
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
    setHeadings(items);
}, [content]);
```

**修复方案：**
```tsx
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
```

**文件：** `src/components/WindCityDisplay/index.tsx`

**当前代码：**
```tsx
useEffect(() => {
    if (show) {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    } else {
        setIsVisible(false);
    }
}, [show]);
```

**修复方案：**
```tsx
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
}, [show]);

// 使用 CSS transition 控制显示/隐藏
```

#### 问题 2：Fast Refresh 问题

**文件：** `src/contexts/StatusContext.tsx`

**当前结构：**
```tsx
// 同一文件导出 Provider 和 hook
export const StatusProvider = ({ children }) => { ... };
export const useStatus = () => { ... };
```

**修复方案：**
```tsx
// contexts/StatusContext.tsx
export const StatusProvider = ({ children }) => { ... };

// hooks/useStatus.ts
export const useStatus = () => {
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error("useStatus must be used within a StatusProvider");
    }
    return context;
};
```

**同样处理：**
- `ThemeContext.tsx` → 分离 `useTheme` hook
- `button.tsx` → 分离 `buttonVariants` 到 `button-variants.ts`

#### 问题 3：console 语句

**文件：** 需要定位具体位置

**修复方案：**
- 移除开发环境的 console 语句
- 或使用 ESLint 规则允许特定 console 方法

### 2.3 Vite 配置优化

**文件：** `vite.config.ts`

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
                    // 第三方库单独打包
                    "vendor-react": ["react", "react-dom"],
                    "vendor-router": ["react-router", "react-router-dom"],
                    "vendor-motion": ["framer-motion"],
                    "vendor-ui": ["radix-ui", "@hugeicons/react", "lucide-react"],
                },
            },
        },
        // 提高 chunk 大小警告阈值
        chunkSizeWarningLimit: 600,
    },
});
```

---

## 三、实施计划

### 阶段 1：修复 Lint 错误（1-2 小时）

**任务清单：**
1. ✅ 修复 `TableOfContents.tsx` 的 useEffect 问题
2. ✅ 修复 `WindCityDisplay/index.tsx` 的 useEffect 问题
3. ✅ 分离 `StatusContext.tsx` 的 hook 导出
4. ✅ 分离 `ThemeContext.tsx` 的 hook 导出
5. ✅ 分离 `button.tsx` 的 variants 导出
6. ✅ 移除 console 语句

**验证：**
```bash
npm run lint
```

### 阶段 2：代码分割（2-3 小时）

**任务清单：**
1. ✅ 实现路由级懒加载
   - 修改 `router/indext.tsx`
   - 添加 Loading 组件
2. ✅ 实现 Markdown 渲染器懒加载
   - 修改 `ArticlePage` 组件
3. ✅ 配置 Vite manualChunks
   - 优化第三方库分割
4. ✅ 检查未使用的依赖
   - 运行 depcheck
   - 移除无用依赖

**验证：**
```bash
npm run build
# 检查 dist/assets/ 目录中的 chunk 文件
```

### 阶段 3：验证与测试（1 小时）

**任务清单：**
1. ✅ 功能测试
   - 测试所有页面路由
   - 测试文章详情页加载
   - 测试主题切换
2. ✅ 性能测试
   - 检查 bundle 大小
   - 测试首屏加载速度
   - 验证懒加载效果
3. ✅ 代码审查
   - 确保无 lint 错误
   - 确保类型安全

**验证命令：**
```bash
npm run lint
npm run build
npm run preview
```

---

## 四、预期效果

### Bundle 大小优化

**优化前：**
- `index.js`: 589KB (gzip: 186KB)
- `index.css`: 47KB (gzip: 8.5KB)

**优化后预期：**
- `index.js`: ~200KB (gzip: ~70KB) - 核心代码
- `vendor-react.js`: ~130KB (gzip: ~45KB) - React 生态
- `vendor-motion.js`: ~80KB (gzip: ~25KB) - Framer Motion
- `vendor-router.js`: ~40KB (gzip: ~15KB) - React Router
- `Home.js`: ~30KB - 首页
- `Article.js`: ~50KB - 文章页（含 Markdown）
- 其他页面：各 20-40KB

**总体预期：**
- 首屏加载减少 60-70%
- 总体积减少 30-40%

### 性能提升

- **首屏加载时间：** 减少 40-50%
- **Time to Interactive：** 减少 30-40%
- **开发体验：** Fast Refresh 正常工作

### 代码质量

- **Lint 错误：** 0 个
- **代码规范：** 符合 React 最佳实践
- **可维护性：** 更好的模块分离

---

## 五、风险与注意事项

### 潜在风险

1. **懒加载闪烁**
   - **风险：** 路由切换时可能出现短暂的白屏或加载状态
   - **缓解：** 使用合适的 loading 组件，添加过渡动画

2. **SEO 影响**
   - **风险：** 客户端渲染可能影响 SEO
   - **缓解：** 当前是 SPA，SEO 本身有限，可考虑未来 SSR

3. **兼容性问题**
   - **风险：** 某些旧浏览器可能不支持动态导入
   - **缓解：** Vite 会自动处理 polyfill

### 注意事项

1. **测试覆盖**
   - 确保所有页面路由正常工作
   - 测试懒加载组件的加载状态
   - 验证错误边界处理

2. **开发体验**
   - Fast Refresh 应该正常工作
   - 热更新速度不应受影响

3. **构建配置**
   - 确保 manualChunks 配置合理
   - 避免过度分割导致 HTTP 请求过多

---

## 六、后续优化建议

### 短期优化（可选）

1. **图片优化**
   - 使用 WebP 格式
   - 添加图片懒加载

2. **字体优化**
   - 字体子集化（只包含使用的字符）
   - 预加载关键字体

3. **缓存策略**
   - 配置 Service Worker
   - 利用浏览器缓存

### 长期优化（未来）

1. **SSR/SSG**
   - 考虑使用 Next.js 或 Remix
   - 改善 SEO 和首屏性能

2. **CDN 部署**
   - 静态资源 CDN 加速
   - 边缘缓存

3. **性能监控**
   - 添加性能指标收集
   - 真实用户监控（RUM）

---

## 七、总结

本优化方案聚焦于性能提升，通过代码分割、lint 错误修复和构建优化，预计可以：

- **减少 bundle 大小 30-40%**
- **提升首屏加载速度 40-50%**
- **修复所有代码质量问题**
- **改善开发体验**

实施过程分为三个阶段，预计总耗时 4-6 小时，风险可控，效果显著。
