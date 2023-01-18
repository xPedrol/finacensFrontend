import {Dayjs} from "dayjs";
import {ICategory} from "./Category.model";

export interface IExpense {
    id: string;
    amount: number;
    category: ICategory;
    categoryId: string;
    createdAt: Dayjs;
}