/**
 * 文章详情页面
 *
 * 功能：
 * 1. 作为文章详情的路由页面
 * 2. 包裹 ArticleDetail 组件，提供统一的动画效果
 *
 * 不包含 Layout，因为 Layout 已经在根路由层级
 */
import { AnimatedCard } from "@/components/AnimatedCard";
import { ArticleDetail } from "@/components/Article";

/**
 * 文章详情页面组件
 *
 * @returns JSX 元素
 */
export const ArticlePage = () => {
    return (
        <AnimatedCard duration={600}>
            <ArticleDetail />
        </AnimatedCard>
    );
};

export default ArticlePage;