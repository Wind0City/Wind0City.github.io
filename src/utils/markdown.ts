/**
 * Markdown 文章解析工具
 *
 * 功能：
 * 1. 解析 Markdown 文件的 frontmatter（YAML 格式的元数据）
 * 2. 提取文章标题、日期、标签等信息
 * 3. 支持 Vite 的 ?raw 导入方式读取 Markdown 文件
 */

/**
 * 文章 Frontmatter 元数据接口
 *
 * 对应 Markdown 文件顶部的 YAML 配置块
 */
export interface ArticleFrontmatter {
    /** 文章标题 */
    title: string;
    /** 发布日期，格式 YYYY-MM-DD */
    date: string;
    /** 文章标签列表 */
    tags: string[];
    /** 文章摘要 */
    summary: string;
}

/**
 * 解析后的文章数据接口
 */
export interface ParsedArticle {
    /** 文章 ID（基于文件名） */
    id: string;
    /** Frontmatter 元数据 */
    frontmatter: ArticleFrontmatter;
    /** Markdown 正文内容 */
    content: string;
}

/**
 * 解析 Markdown 文件的 frontmatter
 *
 * Frontmatter 是 Markdown 文件顶部的 YAML 配置块，格式如下：
 * ---
 * title: 文章标题
 * date: 2024-01-15
 * tags: [标签1, 标签2]
 * summary: 文章摘要
 * ---
 *
 * @param rawContent - Markdown 文件的原始内容
 * @returns 解析后的 frontmatter 对象和剩余内容
 */
export function parseFrontmatter(rawContent: string): {
    frontmatter: ArticleFrontmatter;
    content: string;
} {
    // 使用正则表达式匹配 frontmatter 块
    // frontmatter 以 --- 开始和结束
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = rawContent.match(frontmatterRegex);

    if (!match) {
        // 如果没有 frontmatter，返回默认值
        return {
            frontmatter: {
                title: "无标题",
                date: new Date().toISOString().split("T")[0],
                tags: [],
                summary: "",
            },
            content: rawContent,
        };
    }

    // 提取 frontmatter 文本和正文内容
    const [, frontmatterText, content] = match;

    // 解析 YAML 格式的 frontmatter
    // 简化实现：逐行解析键值对
    const frontmatter: Partial<ArticleFrontmatter> = {};

    // 按行分割并解析
    const lines = frontmatterText.split("\n");
    for (const line of lines) {
        // 跳过空行
        if (!line.trim()) continue;

        // 匹配 key: value 格式
        const colonIndex = line.indexOf(":");
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex).trim();
        let value: string | string[] = line.slice(colonIndex + 1).trim();

        // 处理数组格式 [item1, item2]
        if (value.startsWith("[") && value.endsWith("]")) {
            // 移除方括号，按逗号分割，移除引号和空格
            value = value
                .slice(1, -1)
                .split(",")
                .map((item) => item.trim().replace(/['"]/g, ""));
        }

        // 将解析的值赋给 frontmatter 对象
        (frontmatter as Record<string, string | string[]>)[key] = value;
    }

    return {
        frontmatter: frontmatter as ArticleFrontmatter,
        content,
    };
}

/**
 * 解析 Markdown 文件
 *
 * @param id - 文章 ID（文件名，不含扩展名）
 * @param rawContent - Markdown 文件的原始内容
 * @returns 解析后的文章对象
 */
export function parseMarkdownFile(
    id: string,
    rawContent: string
): ParsedArticle {
    const { frontmatter, content } = parseFrontmatter(rawContent);

    return {
        id,
        frontmatter,
        content,
    };
}
