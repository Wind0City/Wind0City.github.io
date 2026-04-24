import { AnimatedCard } from "@/components/AnimatedCard";
import { Layout } from "@/components/Layout";

export const BoardPage = () => {
    return (
        <Layout>
            <AnimatedCard duration={600}>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Board
                </h1>
                <p className="text-white/80 text-center text-lg">
                    看板管理
                    <br />
                    拖拽任务，管理你的工作流
                </p>
            </AnimatedCard>
        </Layout>
    );
};
