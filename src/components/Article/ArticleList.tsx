/**
 * 文章列表组件
 *
 * 功能：
 * 1. 展示所有文章的摘要信息
 * 2. 点击文章跳转到详情页
 * 3. 显示文章标题、日期、标签和摘要
 * 4. 左上角分类筛选菜单（三横线图标）
 * 5. 搜索功能：搜索标题、摘要、标签
 */
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import type { Article } from "@/data/articles";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, listItem } from "@/lib/animations";

/**
 * 文章分类定义
 *
 * - web: Web 开发相关
 * - AI: 人工智能相关
 * - deeplearning: 深度学习相关
 * - other: 其他分类
 */
type Category = "all" | "web" | "AI" | "deeplearning" | "other";

/**
 * 分类配置：显示名称和对应的标签关键词
 */
const CATEGORY_CONFIG: Record<Category, { label: string; tags: string[] }> = {
    all: { label: "All", tags: [] },
    web: {
        label: "Web",
        tags: ["React", "CSS", "TypeScript", "前端", "JavaScript", "HTML"],
    },
    AI: { label: "AI", tags: ["AI", "人工智能", "机器学习"] },
    deeplearning: {
        label: "Deep Learning",
        tags: ["深度学习", "神经网络", "Deep Learning"],
    },
    other: { label: "Other", tags: ["Git", "工具", "协作", "Other"] },
};

/**
 * ArticleList 组件属性接口
 */
interface ArticleListProps {
    /** 文章列表数据 */
    articles: Omit<Article, "content">[];
}

/**
 * 文章列表组件
 *
 * @param props - 组件属性
 * @returns JSX 元素
 */
export const ArticleList = ({ articles }: ArticleListProps) => {
    // useNavigate Hook 用于编程式导航
    const navigate = useNavigate();

    // 当前选中的分类
    const [selectedCategory, setSelectedCategory] = useState<Category>("all");

    // 分类菜单是否显示（鼠标悬停控制）
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 搜索关键词
    const [searchQuery, setSearchQuery] = useState("");

    /**
     * 根据分类和搜索关键词筛选文章
     */
    const filteredArticles = useMemo(() => {
        let result = articles;

        // 分类筛选
        if (selectedCategory !== "all") {
            const categoryTags = CATEGORY_CONFIG[selectedCategory].tags;
            result = result.filter((article) =>
                article.tags.some((tag) => categoryTags.includes(tag)),
            );
        }

        // 搜索筛选
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (article) =>
                    article.title.toLowerCase().includes(query) ||
                    article.summary.toLowerCase().includes(query) ||
                    article.tags.some((tag) =>
                        tag.toLowerCase().includes(query),
                    ),
            );
        }

        return result;
    }, [articles, selectedCategory, searchQuery]);

    /**
     * 处理文章点击事件
     * 点击后导航到文章详情页
     *
     * @param articleId - 文章 ID
     */
    const handleArticleClick = (articleId: string) => {
        // 导航到文章详情页，路径格式：/article/:id
        navigate(`/article/${articleId}`);
    };

    /**
     * 处理分类选择
     *
     * @param category - 分类名称
     */
    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setIsMenuOpen(false);
    };

    /**
     * 高亮搜索文本
     */
    const highlightText = (text: string, query: string) => {
        if (!query.trim()) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark
                    key={index}
                    className="bg-yellow-300/50 text-inherit rounded px-0.5"
                >
                    {part}
                </mark>
            ) : (
                part
            ),
        );
    };

    return (
        // 外层容器：半透明白色背景，内容左对齐
        <div className="w-full h-full overflow-auto bg-black/30 rounded-xl p-6">
            {/* 顶部区域：分类菜单、搜索框和标题 */}
            <div className="flex items-center gap-4 mb-6">
                {/* 左侧：分类筛选菜单 */}
                <div
                    className="relative flex-shrink-0"
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    {/* 三横线图标按钮（汉堡菜单） */}
                    <button
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                        aria-label="文章分类筛选"
                    >
                        {/* 三横线图标 */}
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 12h16"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* 下拉菜单：鼠标悬停时显示 */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 pt-1 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg min-w-[120px] z-10">
                            {/* 分类列表 */}
                            {(Object.keys(CATEGORY_CONFIG) as Category[]).map(
                                (category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            handleCategorySelect(category)
                                        }
                                        className={`w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200 rounded-sm ${
                                            selectedCategory === category
                                                ? "bg-white/10 font-medium"
                                                : ""
                                        }`}
                                    >
                                        {CATEGORY_CONFIG[category].label}
                                    </button>
                                ),
                            )}
                        </div>
                    )}
                </div>

                {/* 搜索框 */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索文章..."
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* 页面标题 */}
                <h1 className="text-2xl font-bold text-white flex-shrink-0">
                    文章列表
                </h1>
            </div>

            {/* 当前筛选提示 */}
            {(selectedCategory !== "all" || searchQuery) && (
                <div className="mb-4 text-white/60 text-sm flex items-center gap-2">
                    {selectedCategory !== "all" && (
                        <span>
                            分类：{CATEGORY_CONFIG[selectedCategory].label}
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className="ml-2 px-2 py-0.5 bg-white/10 rounded hover:bg-white/20 transition"
                            >
                                清除
                            </button>
                        </span>
                    )}
                    {searchQuery && (
                        <span>
                            搜索："{searchQuery}"
                            <button
                                onClick={() => setSearchQuery("")}
                                className="ml-2 px-2 py-0.5 bg-white/10 rounded hover:bg-white/20 transition"
                            >
                                清除
                            </button>
                        </span>
                    )}
                </div>
            )}

            {/* 文章列表容器 */}
            <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, index) => (
                        <motion.article
                            key={article.id}
                            variants={listItem}
                            layout
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleArticleClick(article.id)}
                            className="p-4 bg-white/10 rounded-xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* 文章标题 */}
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {highlightText(article.title, searchQuery)}
                            </h2>

                            {/* 文章元信息：日期和标签 */}
                            <div className="flex items-center gap-4 mb-2 text-white/60 text-sm">
                                {/* 发布日期 */}
                                <span>{article.date}</span>

                                {/* 标签列表 */}
                                <div className="flex gap-2 flex-wrap">
                                    {article.tags.map((tag) => (
                                        <motion.span
                                            key={tag}
                                            className="px-2 py-0.5 bg-white/10 rounded-full text-xs"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {highlightText(tag, searchQuery)}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* 文章摘要 */}
                            <p className="text-white/80 text-sm line-clamp-2">
                                {highlightText(article.summary, searchQuery)}
                            </p>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* 空状态提示 */}
            <AnimatePresence mode="wait">
                {filteredArticles.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center text-white/60 py-8"
                    >
                        {selectedCategory === "all" && !searchQuery
                            ? "暂无文章"
                            : "没有找到匹配的文章"}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
