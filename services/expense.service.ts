import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import {IExpense} from "../models/Expense.model";

export const apiExpenses = async (date?: string): Promise<AxiosResponse<IExpense[]>> => {
    const params: any = {};
    if (date) params['date'] = date;
    return axiosClient.get<IExpense[]>(`/expenses`, {params});
};

export const apiExpense = async (
    id: string
): Promise<AxiosResponse<IExpense>> => {
    return axiosClient.get<IExpense>(`/expenses/${id}`);
};

export const apiCreateExpense = async (
    expense: IExpense
): Promise<AxiosResponse<IExpense>> => {
    return axiosClient.post<IExpense>(`/expenses/create`, expense);
};

export const apiUpdateExpense = async (
    id: string,
    expense: IExpense
): Promise<AxiosResponse<IExpense>> => {
    return axiosClient.put<IExpense>(`/expenses/${id}`, expense);
};

export const apiDeleteExpense = async (
    id: string
): Promise<AxiosResponse<IExpense>> => {
    return axiosClient.delete<IExpense>(`/expenses/${id}`);
};
