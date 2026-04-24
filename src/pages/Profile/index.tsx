import { AnimatedCard } from "@/components/AnimatedCard";
import { Layout } from "@/components/Layout";

export const ProfilePage = () => {
    return (
        <Layout>
            <AnimatedCard duration={600}>
                <h1 className="text-4xl font-bold text-white mb-4">About Me</h1>
                <p className="text-white/80 text-center text-lg">
                    个人简介
                    <br />
                    了解更多关于我的信息
                </p>
            </AnimatedCard>
        </Layout>
    );
};
