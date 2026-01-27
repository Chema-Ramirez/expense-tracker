import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses = [], onDelete, onEdit }) => {
    if (expenses.length === 0) {
        return <p>No expenses found</p>;
    }

    return (
        <ul>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense._id || expense.id}
                    expense={expense}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
};

export default ExpenseList;
