import api from "../api/api";

// LIMPIA FILTROS
const cleanFilters = (filters = {}) =>
    Object.fromEntries(
        Object.entries(filters).filter(
            ([, value]) => value !== null && value !== ""
        )
    );

// GET
export const getExpenses = async (filters = {}) => {
    try {
        const res = await api.get("/expenses", {
            params: cleanFilters(filters),
        });
        return res.data;
    } catch (err) {
        handleError(err, "No se pudieron obtener los gastos");
    }
};

// CREATE
export const createExpense = async (expenseData) => {
    try {
        const res = await api.post("/expenses", expenseData);
        return res.data.expense;
    } catch (err) {
        handleError(err, "No se pudo crear el gasto");
    }
};

// UPDATE
export const updateExpense = async (id, updatedData) => {
    try {
        const res = await api.put(`/expenses/${id}`, updatedData);
        return res.data;
    } catch (err) {
        handleError(err, "No se pudo actualizar el gasto");
    }
};

// DELETE
export const deleteExpense = async (id) => {
    try {
        await api.delete(`/expenses/${id}`);
        return true;
    } catch (err) {
        handleError(err, "No se pudo eliminar el gasto");
    }
};

// ERROR HANDLER
const handleError = (err, defaultMessage) => {
    if (err.response?.status === 401) {
        throw new Error("No autorizado. Token inválido o expirado.");
    }

    throw new Error(err.response?.data?.message || defaultMessage);
};
