import axios from "axios";

const API_URL = "http://localhost:4000/api/expenses";

// GET EXPENSES
export const getExpenses = async (filters = {}, token) => {
    const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
    });
    return res.data;
};

// CREATE EXPENSE
export const createExpense = async (expenseData, token) => {
    const res = await axios.post(API_URL, expenseData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// DELETE EXPENSE
export const deleteExpense = async (id, token) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// UPDATE EXPENSE
export const updateExpense = async (id, updatedData, token) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};
