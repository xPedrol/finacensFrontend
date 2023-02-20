import {IExpense} from "./Expense.model";

export interface IExpensesGroup {
    date: string,
    expenses: IExpense[]
}
