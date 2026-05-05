/**
 * 测试页面（文章列表页）
 *
 * 功能：
 * 1. 作为文章列表的入口页面
 * 2. 展示所有文章的摘要信息
 * 3. 点击文章可跳转到详情页
 *
 * 不包含 Layout，因为 Layout 已经在根路由层级
 */
import { AnimatedCard } from "@/components/AnimatedCard";
import { ArticleList, getArticleList } from "@/components/Article";

/**
 * 测试页面组件
 *
 * @returns JSX 元素
 */
export const TestPage = () => {
    // 获取文章列表数据（不含内容）
    const articles = getArticleList();

    return (
        <AnimatedCard duration={600}>
            <ArticleList articles={articles} />
        </AnimatedCard>
    );
};