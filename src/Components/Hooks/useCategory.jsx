import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategory = (id) => {
    const axiosPublic = useAxiosPublic();

    const { data: category, refetch, isPending, isError } = useQuery({
        queryKey: ["category", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/category/${id}`);
            return res.data;
        }
    });

    return [category, refetch, isPending, isError];
};

export default useCategory;