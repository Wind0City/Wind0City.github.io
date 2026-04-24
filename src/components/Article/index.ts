/**
 * 文章组件导出入口
 *
 * 统一导出所有文章相关组件，方便其他模块引用
 */

// 导出文章列表组件
export { ArticleList } from "./ArticleList";

// 导出文章详情组件
export { ArticleDetail } from "./ArticleDetail";

// 导出文章数据获取函数
export {
    getArticleById,
    getArticleList,
    getAllArticles,
    getArticlesByTag,
} from "@/data/articles";

// 导出文章类型定义
export type { Article } from "@/data/articles";
