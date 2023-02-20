import {IExpense} from "../models/Expense.model";
import {IExpensesGroup} from "../models/ExpensesGroup.model";
import dayjs from "dayjs";
import {DATE_OUTPUT_FORMAT} from "../const/date.const";

export const generateExpensesGroup = (list: IExpense[]): IExpensesGroup[] => {
    const expensesGroup: IExpensesGroup[] = [];
    list.forEach((item) => {
        const date = item.date;
        if (date) {
            const formattedDate = dayjs(date).format(DATE_OUTPUT_FORMAT);
            const isDateExist = expensesGroup.some((expenseGroup) => expenseGroup.date === formattedDate);
            if(!isDateExist) {
                const expenses = list.filter((expense) => dayjs(expense.date).format(DATE_OUTPUT_FORMAT) === formattedDate);
                const expenseGroup: IExpensesGroup = {
                    date: formattedDate,
                    expenses: expenses
                };
                expensesGroup.push(expenseGroup);
            }
        }
    });
    return expensesGroup;
};