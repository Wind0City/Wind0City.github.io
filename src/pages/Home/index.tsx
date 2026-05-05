import { StatusDetail } from "@/components/StatusDetail";
import { WindCityDisplay } from "@/components/WindCityDisplay";
import { Layout } from "@/components/Layout";
import { useStatus } from "@/contexts/StatusContext";

export const HomePage = () => {
    const { selectedStatus } = useStatus();

    return (
        <Layout>
            <WindCityDisplay show={!selectedStatus} />
            <StatusDetail />
        </Layout>
    );
};