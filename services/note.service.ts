import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import {INote} from "../models/Note.model";

export const apiNotes = async (): Promise<AxiosResponse<INote[]>> => {
    return axiosClient.get<INote[]>(`/notes`);
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
export const apiToggleFavorite = async (
    id: string
): Promise<AxiosResponse<INote>> => {
    return axiosClient.put<INote>(`/notes/${id}/favorite`);
};

export const apiCountNotes = async (): Promise<AxiosResponse<{_count:number}>> => {
    return axiosClient.get<{_count:number}>(`/notes/count`);
}