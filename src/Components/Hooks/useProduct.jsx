import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProduct = (id) => {
    const axiosPublic = useAxiosPublic();

    const { data: product, refetch, isPending, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/product/${id}`);
            return res.data;
        }
    });

    return [product, refetch, isPending, isError];
};

export default useProduct;