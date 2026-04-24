/**
 * 文章数据管理模块
 *
 * 功能：
 * 1. 从 src/posts 目录导入所有 Markdown 文件
 * 2. 解析 Markdown 文件的 frontmatter 和内容
 * 3. 提供文章列表和文章详情的获取接口
 *
 * 注意：
 * - 使用 Vite 的 import.meta.glob 功能批量导入 .md 文件
 * - 添加 ?raw 后缀以获取文件的原始字符串内容
 */
import { parseMarkdownFile, type ParsedArticle } from "@/utils/markdown";

/**
 * 使用 Vite 的 import.meta.glob 批量导入所有 Markdown 文件
 *
 * import.meta.glob 返回一个对象：
 * - key: 文件路径，如 "/src/posts/article.md"
 * - value: 导入函数，调用后返回文件内容
 *
 * eager: true 表示立即加载所有文件（不使用动态导入）
 * as: 'raw' 表示获取文件的原始字符串内容
 */
const markdownModules = import.meta.glob<{ default: string }>("/src/posts/*.md", {
    eager: true,
    as: "raw",
});

// 开发环境下打印调试信息
if (import.meta.env.DEV) {
    console.log("Markdown modules found:", Object.keys(markdownModules));
}

/**
 * 解析所有 Markdown 文件，生成文章数据数组
 *
 * 遍历导入的文件，解析每个文件的 frontmatter 和内容
 */
const articles: ParsedArticle[] = Object.entries(markdownModules).map(
    ([path, content]) => {
        // 从文件路径提取文件名作为 ID
        // 例如：/src/posts/getting-started-with-react.md -> getting-started-with-react
        const fileName = path.split("/").pop() || "";
        const id = fileName.replace(".md", "");

        // 解析 Markdown 文件
        return parseMarkdownFile(id, content as unknown as string);
    },
);

/**
 * 文章类型定义（重新导出，方便使用）
 */
export interface Article {
    /** 文章唯一标识符 */
    id: string;
    /** 文章标题 */
    title: string;
    /** 文章摘要 */
    summary: string;
    /** 发布日期 */
    date: string;
    /** 标签列表 */
    tags: string[];
    /** Markdown 正文内容 */
    content: string;
}

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

/**
 * 根据 ID 获取文章详情
 *
 * @param id - 文章 ID（文件名，不含扩展名）
 * @returns 文章对象，未找到返回 undefined
 */
export function getArticleById(id: string): Article | undefined {
    const article = articles.find((article) => article.id === id);

    if (!article) return undefined;

    return {
        id: article.id,
        title: article.frontmatter.title,
        summary: article.frontmatter.summary,
        date: article.frontmatter.date,
        tags: article.frontmatter.tags,
        content: article.content,
    };
}

/**
 * 获取所有文章（包含内容）
 *
 * @returns 完整的文章数组
 */
export function getAllArticles(): Article[] {
    return articles.map((article) => ({
        id: article.id,
        title: article.frontmatter.title,
        summary: article.frontmatter.summary,
        date: article.frontmatter.date,
        tags: article.frontmatter.tags,
        content: article.content,
    }));
}

/**
 * 根据标签筛选文章
 *
 * @param tag - 标签名称
 * @returns 包含该标签的文章列表
 */
export function getArticlesByTag(tag: string): Omit<Article, "content">[] {
    return getArticleList().filter((article) => article.tags.includes(tag));
}
