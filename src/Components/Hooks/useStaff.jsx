import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useStaff = (email = "") => {
    const axiosSecure = useAxiosSecure();

    const { data: staff, refetch, isPending } = useQuery({
        queryKey: ["staff", email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staff?email=${email}`);
            return res.data;
        },
    });

    return [staff, refetch, isPending];
};

export default useStaff;