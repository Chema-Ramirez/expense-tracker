import { useState, useEffect, useCallback } from "react";
import { ExpensesContext } from "./ExpensesContext";
import { getExpenses } from "../services/expenseServices";
import { useAuth } from "../hooks/useAuth";

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchExpenses = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const data = await getExpenses();
            setExpenses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error cargando gastos en el Provider:", error.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchExpenses();
        } else {
            setExpenses([]);
        }
    }, [user, fetchExpenses]);

    return (
        <ExpensesContext.Provider value={{
            expenses,
            setExpenses,
            loading,
            refreshExpenses: fetchExpenses
        }}>
            {children}
        </ExpensesContext.Provider>
    );
};