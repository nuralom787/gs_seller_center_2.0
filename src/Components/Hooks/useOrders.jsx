import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useOrders = (email = '') => {
    const axiosSecure = useAxiosSecure();
    const [itemPerPage, setItemPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const handleSearch = (text) => {
        setSearch(text);
        setCurrentPage(1);
    };

    const handleStatus = (text) => {
        setStatus(text);
        setCurrentPage(1);
    };

    const handleDate = (text) => {
        setDate(text);
        setCurrentPage(1);
    };

    const { data: orders, refetch, isPending, isError } = useQuery({
        queryKey: ["orders", itemPerPage, currentPage, email, search, status, date],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?page=${currentPage - 1}&size=${itemPerPage}&email=${email}&search=${search}&status=${status}&date=${date}`);
            return res.data;
        }
    });

    return [orders, refetch, isPending, isError, itemPerPage, currentPage, setItemPerPage, setCurrentPage, handleSearch, handleStatus, handleDate];
};

export default useOrders;