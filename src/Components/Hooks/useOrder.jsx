import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useOrder = (id) => {
    const axiosSecure = useAxiosSecure();

    const { data: order, refetch, isPending } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/${id}`);
            return res.data;
        }
    });

    return [order, refetch, isPending];
};

export default useOrder;