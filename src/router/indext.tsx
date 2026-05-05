/**
 * 路由配置文件
 *
 * 功能：
 * 1. 定义应用的所有路由路径
 * 2. 配置路由与页面的映射关系
 * 3. 支持动态路由参数（如文章 ID）
 * 4. 使用根布局避免状态栏重新渲染
 */
import { createBrowserRouter } from "react-router";

// 导入布局和页面组件
import { RootLayout } from "@/components/RootLayout";
import { HomePage } from "@/pages/Home";
import { ProfilePage } from "@/pages/Profile";
import { TestPage } from "@/pages/Test";
import { ArticlePage } from "@/pages/Article";

/**
 * 路由配置数组
 *
 * 使用嵌套路由结构：
 * - RootLayout 作为父路由，包含 StatusCard 和导航栏
 * - 子路由只渲染页面内容，避免重新渲染整个布局
 */
const routes = [
    {
        // 根路由：包含布局
        element: <RootLayout />,
        children: [
            {
                // 首页
                path: "/",
                element: <HomePage />,
            },
            {
                // 个人简介页面
                path: "/aboutme",
                element: <ProfilePage />,
            },
            {
                // 测试页面（文章列表）
                path: "/test",
                element: <TestPage />,
            },
            {
                // 文章详情页面
                // 使用动态路由参数 :id 匹配文章 ID
                // 例如：/article/getting-started-with-react
                path: "/article/:id",
                element: <ArticlePage />,
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