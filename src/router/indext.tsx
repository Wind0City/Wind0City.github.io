/**
 * 路由配置文件
 *
 * 功能：
 * 1. 定义应用的所有路由路径
 * 2. 配置路由与页面的映射关系
 * 3. 支持动态路由参数（如文章 ID）
 */
import { createBrowserRouter } from "react-router";

// 导入页面组件
import { BoardPage } from "../pages/Borad";
import { HomePage } from "@/pages/Home";
import { ProfilePage } from "@/pages/Profile";
import { TestPage } from "@/pages/Test";
import { ArticlePage } from "@/pages/Article";

/**
 * 路由配置数组
 *
 * 每个路由对象包含：
 * - path: 路由路径
 * - element: 对应的页面组件
 */
const routes = [
    {
        // 首页
        path: "/",
        element: <HomePage />,
    },
    {
        // 看板页面
        path: "/Board",
        element: <BoardPage />,
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
];

/**
 * 创建并导出路由实例
 *
 * createBrowserRouter 创建一个 BrowserRouter 实例
 * 用于在应用中实现客户端路由
 */
export const router = createBrowserRouter(routes);
