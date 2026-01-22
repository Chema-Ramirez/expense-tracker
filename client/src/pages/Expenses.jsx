import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
    getExpenses,
    createExpense,
    deleteExpense,
    updateExpense
} from "../services/expenseServices";
import ExpenseFilters from "../components/ExpenseFilters";
import AddExpense from "../components/AddExpense";

const Expenses = () => {
    const { token } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({});
    const [editingExpense, setEditingExpense] = useState(null);


    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getExpenses(filters, token);
                setExpenses(data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        if (token) {
            fetchExpenses();
        }
    }, [filters, token]);


    // CREATE
    const handleCreateExpense = async (expenseData) => {
        try {
            const newExpense = await createExpense(expenseData, token);
            setExpenses((prev) => [newExpense, ...prev]);
        } catch (error) {
            console.error("Error creating expense:", error);
            alert("Error creating expense");
        }
    };


    // DELETE
    const handleDelete = async (id) => {
        try {
            await deleteExpense(id, token);
            setExpenses((prev) => prev.filter((e) => e._id !== id));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };


    //UPDATE
    const handleUpdateExpense = async (updatedData) => {
        try {
            const updatedExpense = await updateExpense(
                editingExpense._id,
                updatedData,
                token
            );

            setExpenses((prev) =>
                prev.map((e) =>
                    e._id === updatedExpense._id ? updatedExpense : e
                )
            );

            setEditingExpense(null);
        } catch (error) {
            console.error("Error updating expense:", error);
            alert("Error updating expense");
        }
    };


    return (
        <div>
            <h2>My expenses</h2>

            <ExpenseFilters setFilters={setFilters} />

            {editingExpense ? (
                <AddExpense
                    initialData={editingExpense}
                    submitText="Update Expense"
                    onSubmit={handleUpdateExpense}
                />
            ) : (
                <AddExpense
                    submitText="Add Expense"
                    onSubmit={handleCreateExpense}
                />
            )}

            {expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense._id}>
                            <strong>{expense.title}</strong> – {expense.amount}€
                            <br />
                            {expense.category} |{" "}
                            {new Date(expense.date).toLocaleDateString()}
                            <br />

                            <button
                                onClick={() => handleDelete(expense._id)}
                            >
                                Delete
                            </button>

                            <button onClick={() => setEditingExpense(expense)}>
                                Edit
                            </button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Expenses;
