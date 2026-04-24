/**
 * 状态卡片组件
 *
 * 功能：
 * 1. 显示个人状态时间线
 * 2. 竖向时间轴样式
 * 3. 显示日期、时间和状态内容
 */

/**
 * 状态项类型定义
 */
interface StatusItem {
    /** 唯一标识 */
    id: string;
    /** 日期 */
    date: string;
    /** 时间 */
    time: string;
    /** 状态内容 */
    content: string;
}

/**
 * 示例状态数据
 */
const statusData: StatusItem[] = [
    {
        id: "1",
        date: "2026.4.23",
        time: "16:38",
        content: "依旧沉迷于装饰 blog",
    },
    {
        id: "2",
        date: "2026.4.23",
        time: "14:20",
        content: "学习 React Router 7 的新特性",
    },
    {
        id: "3",
        date: "2026.4.22",
        time: "22:15",
        content: "终于把文章分类功能做完了 🎉",
    },
    {
        id: "4",
        date: "2026.4.22",
        time: "18:30",
        content: "调试 Markdown 渲染样式",
    },
    {
        id: "5",
        date: "2026.4.21",
        time: "20:00",
        content: "开始搭建个人博客系统",
    },
    {
        id: "6",
        date: "2026.4.20",
        time: "15:45",
        content: "研究 Tailwind CSS 4 的新语法",
    },
    {
        id: "7",
        date: "2026.4.19",
        time: "21:30",
        content: "尝试用 Vite 替换 Webpack",
    },
    {
        id: "8",
        date: "2026.4.18",
        time: "10:15",
        content: "阅读 TypeScript 高级类型文档",
    },
    {
        id: "9",
        date: "2026.4.17",
        time: "19:00",
        content: "配置 ESLint 和 Prettier",
    },
    {
        id: "10",
        date: "2026.4.16",
        time: "16:20",
        content: "初始化项目结构 🚀",
    },
    {
        id: "11",
        date: "2026.4.15",
        time: "14:00",
        content: "构思博客的整体设计风格",
    },
];

/**
 * 状态卡片组件
 *
 * @returns JSX 元素
 */
export const StatusCard = () => {
    return (
        <div className="w-full h-full bg-black/20 backdrop-blur-md rounded-4xl border border-white/80 flex flex-col overflow-hidden relative">
            {/* 标题 - 绝对定位覆盖在顶部，透明背景+毛玻璃效果 */}
            <h2 className="absolute top-0 left-0 right-0 z-10 rounded-3xl text-lg font-bold text-white text-center p-3 border-b-2 border-white/80 m-0 bg-white/20 backdrop-blur-xl">
                Status
            </h2>

            {/* 时间轴容器 - 可滚动区域，滚动条在内部，顶部留出标题空间 */}
            <div className="flex-1 overflow-auto px-4 pt-14 pb-2">
                <div className="relative">
                    {/* 竖向时间轴线 */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/30" />

                    {/* 状态列表 */}
                    <div className="space-y-4">
                        {statusData.map((status) => (
                            <div key={status.id} className="relative pl-6">
                                {/* 时间轴圆点 */}
                                <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-white/60 rounded-full border-2 border-white/80" />

                                {/* 状态内容卡片 */}
                                <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                                    {/* 日期和时间 */}
                                    <div className="text-xs text-white/50 mb-1">
                                        {status.date} {status.time}
                                    </div>
                                    {/* 状态内容 */}
                                    <p className="text-sm text-white/80 leading-relaxed">
                                        {status.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
