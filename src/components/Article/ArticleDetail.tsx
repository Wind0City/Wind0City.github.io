/**
 * 文章详情组件
 *
 * 功能：
 * 1. 根据文章 ID 获取并显示文章完整内容
 * 2. 支持返回文章列表
 * 3. 使用 react-markdown 渲染 Markdown 内容
 * 4. 内容左对齐，按照 Markdown 格式显示
 */
import { useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArticleById } from "@/data/articles";

/**
 * 文章详情组件
 *
 * @returns JSX 元素
 */
export const ArticleDetail = () => {
    // useParams Hook 用于获取路由参数
    const { id } = useParams<{ id: string }>();

    // useNavigate Hook 用于编程式导航
    const navigate = useNavigate();

    // 根据 ID 获取文章详情
    const article = getArticleById(id || "");

    /**
     * 处理返回按钮点击事件
     */
    const handleBack = () => {
        navigate("/test");
    };

    // 文章不存在时显示错误提示
    if (!article) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 rounded-xl">
                <p className="text-white/80 text-xl mb-4">文章不存在</p>
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white hover:bg-white/20 transition"
                >
                    返回列表
                </button>
            </div>
        );
    }

    return (
        // 外层容器：半透明白色背景，内容左对齐
        <div className="w-full h-full overflow-auto bg-black/50 rounded-xl p-6 text-left">
            {/* 返回按钮 - 靠左 */}
            <button
                onClick={handleBack}
                className="mb-6 px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white hover:bg-white/20 transition inline-flex items-center gap-2"
            >
                <span>⬅</span>
            </button>

            {/* 文章头部信息 */}
            <header className="mb-8 pb-6 border-b border-white/20">
                {/* 文章标题 - 靠左 */}
                <h1 className="text-3xl font-bold text-white mb-4 text-left">
                    {article.title}
                </h1>

                <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span>{article.date}</span>
                    <div className="flex gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 bg-white/10 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* 文章内容区域 - 使用 react-markdown 渲染，左对齐 */}
            <article className="text-left">
                {/*
                 * ReactMarkdown 组件说明：
                 * - children: Markdown 内容字符串
                 * - remarkPlugins: 使用 remark-gfm 支持 GitHub 风格 Markdown
                 *   - 支持表格、删除线、任务列表等扩展语法
                 *
                 * 内容左对齐，按照标准 Markdown 文档格式显示
                 */}
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // 自定义代码块样式
                        code({ className, children, ...props }) {
                            // 判断是否为代码块（有 className 表示是代码块）
                            const isCodeBlock = className !== undefined;
                            if (isCodeBlock) {
                                return (
                                    <code
                                        className="block bg-white/10 p-4 rounded-xl text-sm overflow-x-auto"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            }
                            // 行内代码
                            return (
                                <code
                                    className="bg-white/10 px-1.5 py-0.5 rounded text-sm"
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        },
                        // 自定义代码块容器样式
                        pre({ children }) {
                            return <pre className="my-4">{children}</pre>;
                        },
                        // 自定义标题样式 - 左对齐
                        h1: ({ children }) => (
                            <h1 className="text-2xl font-bold text-white mt-8 mb-4">
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-xl font-semibold text-white mt-6 mb-3">
                                {children}
                            </h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-lg font-medium text-white mt-5 mb-2">
                                {children}
                            </h3>
                        ),
                        h4: ({ children }) => (
                            <h4 className="text-base font-medium text-white mt-4 mb-2">
                                {children}
                            </h4>
                        ),
                        // 自定义段落样式 - 左对齐
                        p: ({ children }) => (
                            <p className="text-white/90 leading-relaxed mb-4">
                                {children}
                            </p>
                        ),
                        // 自定义无序列表样式
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside text-white/90 mb-4 space-y-2 pl-4">
                                {children}
                            </ul>
                        ),
                        // 自定义有序列表样式
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside text-white/90 mb-4 space-y-2 pl-4">
                                {children}
                            </ol>
                        ),
                        // 列表项样式
                        li: ({ children }) => (
                            <li className="text-white/90 leading-relaxed">
                                {children}
                            </li>
                        ),
                        // 自定义链接样式
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                className="text-blue-400 hover:text-blue-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {children}
                            </a>
                        ),
                        // 自定义引用块样式
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/70 my-4">
                                {children}
                            </blockquote>
                        ),
                        // 自定义表格样式
                        table: ({ children }) => (
                            <div className="overflow-x-auto my-4">
                                <table className="min-w-full border border-white/20 rounded-lg">
                                    {children}
                                </table>
                            </div>
                        ),
                        thead: ({ children }) => (
                            <thead className="bg-white/10">{children}</thead>
                        ),
                        tbody: ({ children }) => (
                            <tbody className="divide-y divide-white/10">
                                {children}
                            </tbody>
                        ),
                        tr: ({ children }) => (
                            <tr className="border-b border-white/10">{children}</tr>
                        ),
                        th: ({ children }) => (
                            <th className="px-4 py-2 text-left text-white font-medium">
                                {children}
                            </th>
                        ),
                        td: ({ children }) => (
                            <td className="px-4 py-2 text-white/80">{children}</td>
                        ),
                        // 自定义水平线样式
                        hr: () => <hr className="border-white/20 my-6" />,
                        // 自定义图片样式
                        img: ({ src, alt }) => (
                            <img
                                src={src}
                                alt={alt}
                                className="max-w-full rounded-lg my-4"
                            />
                        ),
                    }}
                >
                    {article.content}
                </ReactMarkdown>
            </article>
        </div>
    );
};
