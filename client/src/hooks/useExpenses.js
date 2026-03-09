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
        if (!id) {
            console.error("Error: ID no proporcionado para actualizar");
            throw new Error("ID requerido");
        }

        try {
            await apiUpdateExpense(id, expenseData);
            setExpenses(prev =>
                prev.map(exp => (exp._id === id || exp.id === id ? { ...exp, ...expenseData } : exp))
            );
        } catch (error) {
            console.error("Error al actualizar:", error);
            await refreshExpenses();
            throw error;
        }
    };

    const deleteExpense = async (id) => {
        if (!id) {
            console.error("Error: ID no proporcionado para eliminar");
            throw new Error("ID requerido");
        }

        try {
            await apiDeleteExpense(id);
            setExpenses(prev => prev.filter(exp => exp._id !== id && exp.id !== id));
        } catch (error) {
            console.error("Error al eliminar:", error);
            await refreshExpenses();
            throw error;
        }
    };

    return {
        expenses,
        loading,
        addExpense,
        updateExpense,
        deleteExpense,
        refreshExpenses
    };
};