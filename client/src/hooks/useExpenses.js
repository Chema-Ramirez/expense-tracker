import { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext";
import {
    createExpense,
    updateExpense as apiUpdateExpense,
    deleteExpense as apiDeleteExpense
} from "../services/expenseServices";

export const useExpenses = () => {
    const { expenses, setExpenses, loading, refreshExpenses } = useContext(ExpensesContext);

    const addExpense = async (expenseData) => {
        try {
            await createExpense(expenseData);
            await refreshExpenses();
        } catch (error) {
            console.error("Error al añadir:", error);
            throw error;
        }
    };

    const updateExpense = async (id, expenseData) => {
        try {
            setExpenses(prev =>
                prev.map(exp => (exp._id === id || exp.id === id ? { ...exp, ...expenseData } : exp))
            );

            await apiUpdateExpense(id, expenseData);
            await refreshExpenses();
        } catch (error) {
            await refreshExpenses();
            console.error("Error al actualizar:", error);
            throw error;
        }
    };

    const removeExpense = async (id) => {
        try {
            setExpenses(prev => prev.filter(exp => (exp._id !== id && exp.id !== id)));
            await apiDeleteExpense(id);
        } catch (error) {
            await refreshExpenses();
            console.error("Error al eliminar:", error);
            throw error;
        }
    };

    return {
        expenses,
        loading,
        addExpense,
        updateExpense,
        deleteExpense: removeExpense,
        refreshExpenses
    };
};