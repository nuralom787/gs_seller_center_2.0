import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProducts = () => {

    const { data, isPending, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get("https://daily-bazar-95aq.onrender.com/products")
            return res.data;
        }
    });

    return [data, refetch, isPending];
};

export default useProducts;