import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import {INote} from "../models/Note.model";

export const apiNotes = async (params?: any): Promise<AxiosResponse<INote[]>> => {
    return axiosClient.get<INote[]>(`/notes`, {params});
};

export const apiNote = async (
    id: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.get<INote>(`/notes/${id}`);
};

export const apiCreateNote = async (
    note: INote
): Promise<AxiosResponse<INote>> => {
    return axiosClient.post<INote>(`/notes/create`, note);
};

export const apiUpdateNote = async (
    id: string,
    note: INote
): Promise<AxiosResponse<INote>> => {
    return axiosClient.put<INote>(`/notes/${id}`, note);
};

export const apiDeleteNote = async (
    id: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.delete<INote>(`/notes/${id}`);
};
export const apiToggleFixed = async (
    id: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.put<INote>(`/notes/${id}/fixed`);
};

export const apiCountNotes = async (): Promise<AxiosResponse<{ _count: number }>> => {
    return axiosClient.get<{ _count: number }>(`/notes/count`);
};