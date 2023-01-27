import axios, {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import {
    ILoginResponse,
    ILoginUser,
    IRegisterUser,
    IUser,
} from "../models/User.model";

export const apiLogin = async (
    data: ILoginUser
): Promise<AxiosResponse<ILoginResponse>> => {
    return axiosClient.post<ILoginResponse>(`/login`, data);
};

export const apiRegister = async (
    data: IRegisterUser
): Promise<AxiosResponse<IUser>> => {
    return axiosClient.post<IUser>(`/register`, data);
};

export const apiUpdateUser = async (
    userId: string,
    data: IUser
): Promise<AxiosResponse<IUser>> => {
    return axiosClient.put<IUser>(`/${userId}`, data);
};