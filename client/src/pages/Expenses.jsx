import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseServices";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const data = await getExpenses();
                setExpenses(data);
            } catch (err) {
                setError(err.message);
            }
        };

        loadExpenses();
    }, []);

    if (error) return <p>{error}</p>;
    if (!expenses.length) return <p>No hay gastos</p>;

    return (
        <ul>
            {expenses.map((e) => (
                <li key={e._id}>
                    {e.description} – {e.amount}
                </li>
            ))}
        </ul>
    );
};

export default Expenses;
