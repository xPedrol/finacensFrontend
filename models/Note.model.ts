import {Dayjs} from "dayjs";
import {INoteGroup} from "./NoteGroup.model";

export interface INote {
    id?: string;
    title: string;
    description?: string;
    createdAt: Dayjs;
    date?: Dayjs;
    color?: string;
    fixed?: boolean;
    noteGroupId?: string;

    noteGroup?: INoteGroup;
}