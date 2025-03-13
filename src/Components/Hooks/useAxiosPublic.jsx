import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://gs-dashboard-4864dwebapp.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;