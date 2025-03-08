import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
    const axiosPublic = useAxiosPublic();
    const [itemPerPage, setItemPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const perPageItem = (e) => {
        setItemPerPage(e.target.value);
        setCurrentPage(1)
    };

    const handleSearch = (text) => {
        setTitle(text)
        setCurrentPage(1);
    };


    const handleCategory = (value) => {
        setCategory(value)
        setCurrentPage(1);
    };


    const handlePrice = (value) => {
        setPrice(value)
        setCurrentPage(1);
    };



    const { data: products, isPending, refetch, isError } = useQuery({
        queryKey: ["products", itemPerPage, currentPage, title, category, price],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?size=${itemPerPage}&page=${currentPage - 1}&category=${category}&title=${title}&price=${price}`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    return [products, refetch, isPending, isError, itemPerPage, currentPage, setCurrentPage, perPageItem, handleSearch, handleCategory, handlePrice];
};

export default useProducts;