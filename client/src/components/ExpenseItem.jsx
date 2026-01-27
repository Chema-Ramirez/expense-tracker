const ExpenseItem = ({ expense, onDelete, onEdit }) => {
    return (
        <li>
            <strong>{expense.title}</strong> –{" "}
            {Number(expense.amount).toFixed(2)} €
            <br />

            {expense.category} |{" "}
            {expense.date
                ? new Date(expense.date).toLocaleDateString()
                : "No date"}
            <br />

            <button onClick={() => onDelete(expense._id || expense.id)}>
                Delete
            </button>

            <button onClick={() => onEdit({ ...expense })}>
                Edit
            </button>
        </li>
    );
};

export default ExpenseItem;
