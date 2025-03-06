import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {
    const axiosPublic = useAxiosPublic();
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data: categories, isPending, refetch } = useQuery({
        queryKey: ["categories", itemPerPage, currentPage, search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/categories?page=${currentPage - 1}&size=${itemPerPage}&search=${search}`)
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    return [categories, refetch, isPending, itemPerPage, setItemPerPage, setCurrentPage, setSearch];
};

export default useCategories;