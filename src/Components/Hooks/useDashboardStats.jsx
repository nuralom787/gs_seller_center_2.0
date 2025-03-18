import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDashboardStats = () => {
    const axiosSecure = useAxiosSecure();

    const { data: statistic, refetch, isPending, isError } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/order-stats");
            return res.data;
        }
    });

    return [statistic, refetch, isPending, isError];
};

export default useDashboardStats;