import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const useProducts = () => {
    const [itemPerPage, setItemPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);

    const perPageItem = (e) => {
        setItemPerPage(e.target.value);
        setCurrentPage(1)
    };

    const { data: products, isPending, refetch } = useQuery({
        queryKey: ["products", itemPerPage, currentPage],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/products?size=${itemPerPage}&page=${currentPage - 1}`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    return [products, refetch, isPending, itemPerPage, setCurrentPage, perPageItem];
};

export default useProducts;