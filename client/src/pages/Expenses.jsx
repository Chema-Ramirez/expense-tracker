import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext"
import { getExpenses } from "../services/expenseServices"
import ExpenseFilters from "../components/ExpenseFilters";

const Expenses = () => {
    const { token } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getExpenses(filters, token);
                setExpenses(data);
            } catch (error) {
                console.error(error)
            }
        };

        fetchExpenses();
    }, [filters, token]);

    return (
        <div>
            <h2>My expenses</h2>

            <ExpenseFilters setFilters={setFilters} />

            {expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense._id}>
                            <strong>{expense.title}</strong> – {expense.amount}€
                            <br />
                            {expense.category} | {new Date(expense.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default Expenses;