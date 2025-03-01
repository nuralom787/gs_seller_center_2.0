import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategories = () => {

    const { data: categories, isPending, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/categories")
            return res.data;
        }
    });

    return [categories, refetch, isPending];
};

export default useCategories;