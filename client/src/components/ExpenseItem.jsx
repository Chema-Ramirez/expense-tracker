const ExpenseItem = ({ expense, onEdit, onDelete }) => {
    return (
        <li className="expense-item">
            <div>
                <strong>{expense.description || expense.category}</strong>
                <small>{new Date(expense.date).toLocaleDateString()}</small>
            </div>

            <div>
                <span>{expense.amount} €</span>

                <button onClick={() => onEdit(expense)}>Editar</button>
                <button onClick={() => onDelete(expense._id)}>Eliminar</button>
            </div>
        </li>
    );
};

export default ExpenseItem;
