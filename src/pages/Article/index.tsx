/**
 * 文章详情页面
 *
 * 功能：
 * 1. 作为文章详情的路由页面
 * 2. 包裹 ArticleDetail 组件，提供统一的布局和动画效果
 */
import { AnimatedCard } from "@/components/AnimatedCard";
import { Layout } from "@/components/Layout";
import { ArticleDetail } from "@/components/Article";

/**
 * 文章详情页面组件
 *
 * @returns JSX 元素
 */
export const ArticlePage = () => {
    return (
        <Layout>
            {/* 动画卡片容器 */}
            <AnimatedCard duration={600}>
                {/* 文章详情组件 */}
                <ArticleDetail />
            </AnimatedCard>
        </Layout>
    );
};
