import {AxiosResponse} from "axios";
import axiosClient from "../configs/httpRequest.config";
import {INoteGroup} from "../models/NoteGroup.model";

export const apiNoteGroups = async (params?: any): Promise<AxiosResponse<INoteGroup[]>> => {
    return axiosClient.get<INoteGroup[]>(`/noteGroups`, {params});
};

export const apiNoteGroup = async (
    id: string
): Promise<AxiosResponse<INoteGroup>> => {
    return axiosClient.get<INoteGroup>(`/noteGroups/${id}`);
};

export const apiCreateNoteGroup = async (
    noteGroup: INoteGroup
): Promise<AxiosResponse<INoteGroup>> => {
    return axiosClient.post<INoteGroup>(`/noteGroups/create`, noteGroup);
};

export const apiUpdateNoteGroup = async (
    id: string,
    noteGroup: INoteGroup
): Promise<AxiosResponse<INoteGroup>> => {
    return axiosClient.put<INoteGroup>(`/noteGroups/${id}`, noteGroup);
};

export const apiDeleteNoteGroup = async (
    id: string
): Promise<AxiosResponse<INoteGroup>> => {
    return axiosClient.delete<INoteGroup>(`/noteGroups/${id}`);
};
export const apiToggleFixed = async (
    id: string
): Promise<AxiosResponse<INoteGroup>> => {
    return axiosClient.put<INoteGroup>(`/noteGroups/${id}/fixed`);
};

export const apiNoteGroupsCount = async (): Promise<AxiosResponse<number>> => {
    return axiosClient.get<number>(`/noteGroups/count`);
};

export const apiRemoveFromNoteGroupGroup = async (
    id: string
): Promise<AxiosResponse<INoteGroup>> => {
    return axiosClient.put<INoteGroup>(`/noteGroups/${id}/group`);
};