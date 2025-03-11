import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCoupon = (id) => {
    const axiosPublic = useAxiosPublic();

    const { data: coupon, refetch, isPending } = useQuery({
        queryKey: ["coupon", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/coupon/${id}`);
            return res.data;
        }
    });

    return [coupon, refetch, isPending];
};

export default useCoupon;