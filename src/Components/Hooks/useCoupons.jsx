import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useState } from "react";

const useCoupons = () => {
    const axiosPublic = useAxiosPublic();
    const [itemPerPage, setItemPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const perPageItem = (e) => {
        setItemPerPage(e.target.value);
        setCurrentPage(1)
    };

    const handleSearch = (text) => {
        setSearch(text)
        setCurrentPage(1);
    };


    const { data: coupons, refetch, isPending, isError } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/coupons?page=${currentPage - 1}&size=${itemPerPage}&search=${search}`);
            return res.data;
        },
        placeholderData: keepPreviousData
    });

    return [coupons, refetch, isPending, isError, currentPage, setCurrentPage, itemPerPage, perPageItem, handleSearch];
};

export default useCoupons;