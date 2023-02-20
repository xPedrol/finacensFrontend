import {IExpensesGroup} from "../models/ExpensesGroup.model";

type ExpensesDetailedViewProps = {
    expensesGroup: IExpensesGroup[]
}
const ExpensesDetailedView = ({expensesGroup}: ExpensesDetailedViewProps) => {
    return (
        <div>
            {expensesGroup.map((group) => (
                <div key={group.date}>
                    <h3>{group.date}</h3>
                    <ul>
                        {group.expenses.map((expense) => (
                            <li key={expense.id}>
                                <>
                                    {expense.tag?.name} - {expense.amount}
                                </>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ExpensesDetailedView;