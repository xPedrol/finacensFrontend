import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import {IGoal} from "../models/Goal.model";

export const apiGoals = async (): Promise<AxiosResponse<IGoal[]>> => {
    return axiosClient.get<IGoal[]>(`/goals`);
};

export const apiGoal = async (
    id: string
): Promise<AxiosResponse<IGoal>> => {
    return axiosClient.get<IGoal>(`/goals/${id}`);
};

export const apiCreateGoal = async (
    goal: IGoal
): Promise<AxiosResponse<IGoal>> => {
    return axiosClient.post<IGoal>(`/goals/create`, goal);
};

export const apiUpdateGoal = async (
    id: string,
    goal: IGoal
): Promise<AxiosResponse<IGoal>> => {
    return axiosClient.put<IGoal>(`/goals/${id}`, goal);
};

export const apiDeleteGoal = async (
    id: string
): Promise<AxiosResponse<IGoal>> => {
    return axiosClient.delete<IGoal>(`/goals/${id}`);
};

export const apiGoalByDate = async (
    date: string
): Promise<AxiosResponse<IGoal>> => {
    return axiosClient.get<IGoal>(`/goals/date?date=${date}`);
};
