import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import IExpenseStatistic from "../models/ExpenseStatistic.model";
import {IExpensesByMonth} from "../models/ExpensesByMonth.model";

export const apiExpensesStatistic = async (date?: string): Promise<AxiosResponse<IExpenseStatistic>> => {
    const params:any = {}
    if(date) params['date'] = date;
    return axiosClient.get<IExpenseStatistic>(`/expensesStatistic`,{
        params
    });
};

export const apiMonthsBalance = async (): Promise<AxiosResponse<IExpensesByMonth[]>> => {
    return axiosClient.get<IExpensesByMonth[]>(`/expensesStatistic/monthsBalance`);
};