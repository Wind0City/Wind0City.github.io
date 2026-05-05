import { StatusDetail } from "@/components/StatusDetail";
import { WindCityDisplay } from "@/components/WindCityDisplay";
import { useStatus } from "@/contexts/StatusContext";

/**
 * 首页组件
 *
 * 不包含 Layout，因为 Layout 已经在根路由层级
 */
export const HomePage = () => {
    const { selectedStatus } = useStatus();

    return (
        <>
            <WindCityDisplay show={!selectedStatus} />
            <StatusDetail />
        </>
    );
};