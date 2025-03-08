import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useCustomers = () => {
    const axiosSecure = useAxiosSecure();
    const [itemPerPage, setItemPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const handleSearch = (text) => {
        setSearch(text);
        setCurrentPage(1)
    };

    const { data: customers, refetch, isPending, isError } = useQuery({
        queryKey: ["customers", currentPage, itemPerPage, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customers?page=${currentPage - 1}&size=${itemPerPage}&search=${search}`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    return [customers, refetch, isPending, isError, currentPage, setCurrentPage, itemPerPage, handleSearch];
};

export default useCustomers;