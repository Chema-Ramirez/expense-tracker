import { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext";
import {
    createExpense,
    updateExpense,
    deleteExpense as apiDeleteExpense
} from "../services/expenseServices";

export const useExpenses = () => {
    const { expenses, setExpenses, loading, refreshExpenses } = useContext(ExpensesContext);

    const addExpense = async (expenseData) => {
        await createExpense(expenseData);
        await refreshExpenses();
    };

    const editExpense = async (id, expenseData) => {
        await updateExpense(id, expenseData);
        await refreshExpenses();
    };

    const removeExpense = async (id) => {
        try {
            setExpenses(prev => prev.filter(exp => exp.id !== id));

            await apiDeleteExpense(id);
        } catch (error) {
            await refreshExpenses();
            throw error;
        }
    };

    return {
        expenses,
        loading,
        addExpense,
        editExpense,
        deleteExpense: removeExpense,
        refreshExpenses
    };
};