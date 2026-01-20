import axios from "axios";

const API_URL = "http://localhost:4000/api/expenses";

export const getExpenses = async (filters = {}, token) => {
    try {
        const res = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: filters
        });

        return res.data;
    } catch (error) {
        throw new Error("Error fetching expenses")
    }
};