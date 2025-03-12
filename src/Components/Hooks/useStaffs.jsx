import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useStaffs = () => {
    const axiosSecure = useAxiosSecure();
    const [itemPerPage, setItemPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");


    const handleSearch = (text) => {
        setSearch(text)
        setCurrentPage(1);
    };

    const handleRole = (text) => {
        setRole(text);
        setCurrentPage(1);
    };

    const { data: staffs, refetch, isPending, isError } = useQuery({
        queryKey: ["staffs", currentPage, itemPerPage, email, search, role],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staffs?page=${currentPage - 1}&size=${itemPerPage}&email=${email}&search=${search}&role=${role}`);
            return res.data;
        },
        placeholderData: keepPreviousData
    })

    return [staffs, refetch, isPending, isError, currentPage, setCurrentPage, itemPerPage, handleSearch, handleRole];
};

export default useStaffs;