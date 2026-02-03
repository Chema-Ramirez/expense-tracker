import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    if (!expenses.length) return <p>No hay gastos registrados</p>;

    return (
        <ul className="expense-list">
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense._id}
                    expense={expense}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

export default ExpenseList;
