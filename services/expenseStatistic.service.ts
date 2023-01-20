import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import IExpenseStatistic from "../models/ExpenseStatistic.model";

export const apiExpensesStatistic = async (): Promise<AxiosResponse<IExpenseStatistic>> => {
    return axiosClient.get<IExpenseStatistic>(`/expensesStatistic`);
};