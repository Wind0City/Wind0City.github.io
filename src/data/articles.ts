/**
 * 文章数据管理模块
 *
 * 功能：
 * 1. 从 src/posts 目录导入所有 Markdown 文件
 * 2. 解析 Markdown 文件的 frontmatter 和内容
 * 3. 提供文章列表和文章详情的获取接口
 *
 * 注意：
 * - 使用静态导入 ?raw 方式导入 Markdown 文件
 * - 确保在生产环境中正确加载
 */
import { parseMarkdownFile, type ParsedArticle } from "@/utils/markdown";

// 静态导入所有 Markdown 文件（使用 ?raw 获取原始字符串）
import gettingStartedReact from "/src/posts/getting-started-with-react.md?raw";
import cssFlexboxGuide from "/src/posts/css-flexbox-guide.md?raw";
import typescriptTips from "/src/posts/typescript-tips.md?raw";
import gitWorkflow from "/src/posts/git-workflow.md?raw";

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
 * 文章数据映射表
 *
 * key: 文章 ID（文件名）
 * value: Markdown 文件原始内容
 */
const markdownFiles: Record<string, string> = {
    "getting-started-with-react": gettingStartedReact,
    "css-flexbox-guide": cssFlexboxGuide,
    "typescript-tips": typescriptTips,
    "git-workflow": gitWorkflow,
};

/**
 * 解析所有 Markdown 文件，生成文章数据数组
 */
const articles: ParsedArticle[] = Object.entries(markdownFiles).map(
    ([id, content]) => {
        return parseMarkdownFile(id, content);
    }
);

// 开发环境下打印调试信息
if (import.meta.env.DEV) {
    console.log("Articles loaded:", articles.length);
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
