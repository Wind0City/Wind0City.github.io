import { AnimatedCard } from "@/components/AnimatedCard";
import { Layout } from "@/components/Layout";

export const HomePage = () => {
    return (
        <Layout>
            <AnimatedCard duration={1000}>
                <h1 className="text-4xl font-bold text-white mb-4">WindCity</h1>
            </AnimatedCard>
        </Layout>
    );
};
