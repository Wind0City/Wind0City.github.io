interface ReadingTimeProps {
    content: string;
    wordsPerMinute?: number;
}

export const ReadingTime = ({
    content,
    wordsPerMinute = 300,
}: ReadingTimeProps) => {
    // 中文按字符数计算，英文按单词数计算
    const chineseChars = (content.match(/[一-龥]/g) || []).length;
    const englishWords = (
        content
            .replace(/[一-龥]/g, "")
            .match(/[a-zA-Z]+/g) || []
    ).length;

    const totalWords = chineseChars + englishWords;
    const minutes = Math.ceil(totalWords / wordsPerMinute);

    return (
        <span className="text-sm text-white/60">
            {minutes} 分钟阅读
        </span>
    );
};