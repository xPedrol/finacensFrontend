import {Dayjs} from "dayjs";
import {ITag} from "./Tag.model";
import {EnumCategory} from "../enum/Category.enum";

export interface IExpense {
    id?: string;
    amount: number;
    tag?: ITag;
    tagId: string;
    createdAt?: Dayjs;
    date?: Dayjs;
    description?: string;
    category: EnumCategory;
}
