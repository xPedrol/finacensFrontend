import axios, { AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const cookies = parseCookies();
  const tokenKey = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string;
  if (cookies[tokenKey]) {
    (config.headers as any)["Authorization"] = cookies[tokenKey];
  }
  return config;
});

export default axiosClient;
