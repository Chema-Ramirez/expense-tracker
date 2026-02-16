import { useState, useCallback, useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../services/expenseServices";

export const useExpenses = () => {
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const [loading, setLoading] = useState(false);

    const fetchExpenses = useCallback(async (filters = {}) => {
        setLoading(true);
        try {
            const data = await getExpenses(filters);
            setExpenses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [setExpenses]);

    const addExpense = async (expenseData) => {
        await createExpense(expenseData);
        fetchExpenses();
    };

    const editExpense = async (id, expenseData) => {
        await updateExpense(id, expenseData);
        fetchExpenses();
    };

    const removeExpense = async (id) => {
        await deleteExpense(id);
        fetchExpenses();
    };

    return { expenses, loading, fetchExpenses, addExpense, editExpense, removeExpense };
};
