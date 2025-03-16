import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { LogoutUser } = useContext(AuthContext);

    // Request Interceptor
    // axiosSecure.interceptors.request.use(function (config) {
    //     // console.log("stop by axios interceptor", token);
    //     const token = localStorage.getItem('access-token');
    //     config.headers.authorization = `Bearer ${token}`;
    //     return config;
    // }, function (error) {
    //     // Do something with request error
    //     return Promise.reject(error);
    // });


    // Response Interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (err) => {
        // console.log(err.response);
        const status = err.response.status;
        if (status === 401 || status === 403) {
            await LogoutUser();
            navigate('/user/login')
        }
        return Promise.reject(err);
    });

    return axiosSecure;
};

export default useAxiosSecure;