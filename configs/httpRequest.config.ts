import axios, {AxiosRequestConfig} from "axios";
import {parseCookies} from "nookies";

const axiosClient = axios.create({
    baseURL: process.env.PUBLIC_REACT_API_URL,
    timeout: 1000
});
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const cookies = parseCookies();
    if (cookies.token) {
        (config.headers as any)['Authorization'] = `Bearer ${cookies.token}`;
    }
    return config;
});

export default axiosClient;