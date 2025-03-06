import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const useCategories = () => {
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data: categories, isPending, refetch } = useQuery({
        queryKey: ["categories", itemPerPage, currentPage, search],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/categories?page=${currentPage - 1}&size=${itemPerPage}&search=${search}`)
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    return [categories, refetch, isPending, itemPerPage, setItemPerPage, setCurrentPage, setSearch];
};

export default useCategories;