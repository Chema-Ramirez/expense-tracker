import { useState, useEffect, useCallback, useRef } from "react";
import { ExpensesContext } from "./ExpensesContext";
import {
    getExpenses,
    createExpense,
    updateExpense as updateService,
    deleteExpense as deleteService
} from "../services/expenseServices";
import { useAuth } from "../hooks/useAuth";

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const initialized = useRef(false);

    const categories = ["Comida", "Transporte", "Vivienda", "Salud", "Ocio", "Otros"];

    const fetchExpenses = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const data = await getExpenses();
            setExpenses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error cargando gastos:", error.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // ADD
    const addExpense = async (expenseData) => {
        try {
            const response = await createExpense(expenseData);
            const newExpense = response.expense || response;
            setExpenses((prev) => [newExpense, ...prev]);
            return newExpense;
        } catch (error) {
            console.error("Error al añadir gasto:", error);
            throw error;
        }
    };

    // UPDATE
    const updateExpense = async (id, updatedData) => {
        try {
            const response = await updateService(id, updatedData);
            const updatedExpense = response.expense || response;
            setExpenses((prev) =>
                prev.map((exp) => (exp._id === id ? updatedExpense : exp))
            );
            return updatedExpense;
        } catch (error) {
            console.error("Error al actualizar gasto:", error);
            throw error;
        }
    };

    // DELETE
    const deleteExpense = async (id) => {
        try {
            await deleteService(id);
            setExpenses((prev) => prev.filter((exp) => exp._id !== id));
        } catch (error) {
            console.error("Error al eliminar gasto:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (user) {
            fetchExpenses();
        } else {
            setExpenses([]);
            initialized.current = false;
        }
    }, [user, fetchExpenses]);

    return (
        <ExpensesContext.Provider value={{
            expenses,
            setExpenses,
            loading,
            categories,
            addExpense,
            updateExpense,
            deleteExpense,
            refreshExpenses: fetchExpenses
        }}>
            {children}
        </ExpensesContext.Provider>
    );
};