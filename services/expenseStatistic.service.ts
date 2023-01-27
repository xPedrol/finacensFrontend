import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import IExpenseStatistic from "../models/ExpenseStatistic.model";
import {IGoal} from "../models/Goal.model";

export const apiExpensesStatistic = async (): Promise<AxiosResponse<IExpenseStatistic>> => {
    return axiosClient.get<IExpenseStatistic>(`/expensesStatistic`);
};

export const apiMonthsBalance = async (): Promise<AxiosResponse<IGoal[]>> => {
    return axiosClient.get<IGoal[]>(`/expensesStatistic/monthsBalance`);
};