import api from "../api/api";
import { cleanFilters, handleError } from "./apiUtils";


// GET
export const getExpenses = async (filters = {}) => {
    try {
        const res = await api.get("/expenses", {
            params: cleanFilters(filters),
        });
        return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
        handleError(err, "No se pudieron obtener los gastos");
        return [];
    }
};

// CREATE
export const createExpense = async (expenseData) => {
    try {
        const payload = {
            ...expenseData,
            amount: Number(expenseData.amount)
        };
        const res = await api.post("/expenses", payload);
        return res.data.expense || res.data;
    } catch (err) {
        handleError(err, "No se pudo crear el gasto");
        throw err;
    }
};

// UPDATE 
export const updateExpense = async (id, updatedData) => {
    try {
        const res = await api.put(`/expenses/${id}`, updatedData);
        return res.data.expense || res.data;
    } catch (err) {
        handleError(err, "No se pudo actualizar el gasto");
        throw err;
    }
};

// DELETE 
export const deleteExpense = async (id) => {
    try {
        await api.delete(`/expenses/${id}`);
        return true;
    } catch (err) {
        handleError(err, "No se pudo eliminar el gasto");
        return false;
    }
};