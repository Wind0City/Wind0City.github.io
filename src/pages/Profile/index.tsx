import { AnimatedCard } from "@/components/AnimatedCard";

/**
 * 个人简介页面
 *
 * 不包含 Layout，因为 Layout 已经在根路由层级
 */
export const ProfilePage = () => {
    return (
        <AnimatedCard duration={600}>
            <h1 className="text-4xl font-bold text-white mb-4">About Me</h1>
            <p className="text-white/80 text-center text-lg">
                个人简介
                <br />
                了解更多关于我的信息
            </p>
        </AnimatedCard>
    );
};

export default ProfilePage;