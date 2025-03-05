import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
    const axiosPublic = useAxiosPublic();
    const [itemPerPage, setItemPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState(null);

    const perPageItem = (e) => {
        setItemPerPage(e.target.value);
        setCurrentPage(1)
    };

    const { data: products, isPending, refetch } = useQuery({
        queryKey: ["products", itemPerPage, currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`http://localhost:5000/products?size=${itemPerPage}&page=${currentPage - 1}&category=${category}&title=${title}&price=${price}`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    return [products, refetch, isPending, itemPerPage, setCurrentPage, perPageItem];
};

export default useProducts;