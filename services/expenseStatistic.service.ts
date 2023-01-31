import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import IExpenseStatistic from "../models/ExpenseStatistic.model";
import {IExpensesByMonth} from "../models/ExpensesByMonth.model";

export const apiExpensesStatistic = async (params?: any): Promise<AxiosResponse<IExpenseStatistic>> => {
    return axiosClient.get<IExpenseStatistic>(`/expensesStatistic`, {
        params
    });
};

export const apiMonthsBalance = async (): Promise<AxiosResponse<IExpensesByMonth[]>> => {
    return axiosClient.get<IExpensesByMonth[]>(`/expensesStatistic/monthsBalance`);
};