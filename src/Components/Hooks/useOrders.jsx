import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useOrders = (email = '') => {
    const axiosSecure = useAxiosSecure();
    const [itemPerPage, setItemPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const handleSearch = (text) => {
        setSearch(text);
        setCurrentPage(1);
    };

    const { data: orders, refetch, isPending, isError } = useQuery({
        queryKey: ["orders", itemPerPage, currentPage, email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?page=${currentPage - 1}&size=${itemPerPage}&email=${email}`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    return [orders, refetch, isPending, isError, itemPerPage, currentPage, setItemPerPage, setCurrentPage];
};

export default useOrders;