import { AxiosResponse } from "axios";
import axiosClient from "../configs/httpRequest.config";
import { ICategory } from "../models/Category.model";

export const apiCategories = async (): Promise<AxiosResponse<ICategory[]>> => {
  return axiosClient.get<ICategory[]>(`/categories`);
};

export const apiCategory = async (
  id: string
): Promise<AxiosResponse<ICategory>> => {
  return axiosClient.get<ICategory>(`/categories/${id}`);
};

export const apiCreateCategory = async (
  expense: ICategory
): Promise<AxiosResponse<ICategory>> => {
  return axiosClient.post<ICategory>(`/categories/create`, expense);
};

export const apiUpdateCategory = async (
  id: string,
  expense: ICategory
): Promise<AxiosResponse<ICategory>> => {
  return axiosClient.put<ICategory>(`/categories/${id}`, expense);
};

export const apiDeleteCategory = async (
  id: string
): Promise<AxiosResponse<ICategory>> => {
  return axiosClient.delete<ICategory>(`/categories/${id}`);
};
