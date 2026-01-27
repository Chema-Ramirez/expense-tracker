import axios from "axios";

const API_URL = "http://localhost:4000/api/expenses";

const cleanFilters = (filters) =>
    Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value)
    );

// GET EXPENSES
export const getExpenses = async (filters = {}, token) => {
    try {
        const res = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
            params: cleanFilters(filters),
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
};

// CREATE EXPENSE
export const createExpense = async (expenseData, token) => {
    try {
        const res = await axios.post(API_URL, expenseData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Error creating expense:", error);
        throw error;
    }
};

// DELETE EXPENSE
export const deleteExpense = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return true;
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
    }
};

// UPDATE EXPENSE
export const updateExpense = async (id, updatedData, token) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Error updating expense:", error);
        throw error;
    }
};
