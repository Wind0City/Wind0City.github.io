import { useState, useEffect, useMemo, useCallback } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
    const [activeId, setActiveId] = useState<string>("");

    // 使用 useMemo 计算标题列表，避免 useEffect 中的 setState
    const headings = useMemo(() => {
        const lines = content.split("\n");
        const items: TOCItem[] = [];

        lines.forEach((line, index) => {
            const match = line.match(/^(#{1,3})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2].trim();
                const id = `heading-${index}`;
                items.push({ id, text, level });
            }
        });

        return items;
    }, [content]);

    useEffect(() => {
        // 监听滚动，高亮当前标题
        const handleScroll = () => {
            const headingElements = document.querySelectorAll(
                "h1, h2, h3",
            );
            let currentId = "";

            headingElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 100) {
                    currentId = el.id;
                }
            });

            setActiveId(currentId);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-sm font-semibold text-white/80 mb-3">
                目录
            </h3>
            <ul className="space-y-1">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <button
                            onClick={() => scrollToHeading(heading.id)}
                            className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                                heading.level === 1
                                    ? "font-medium"
                                    : heading.level === 2
                                      ? "pl-4"
                                      : "pl-6"
                            } ${
                                activeId === heading.id
                                    ? "bg-white/20 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            {heading.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};