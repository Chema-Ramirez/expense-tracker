import api from "../api/api";
import { cleanFilters, handleError } from "./apiUtils";

// GET ALL
export const getSavingsGoals = async (filters = {}) => {
    try {
        const res = await api.get("/savings", {
            params: cleanFilters(filters),
        });
        return res.data;
    } catch (err) {
        handleError(err, "No se pudieron obtener los objetivos de ahorro");
    }
};

// CREATE
export const createSavingsGoal = async (goalData) => {
    try {
        const res = await api.post("/savings", goalData);
        return res.data;
    } catch (err) {
        handleError(err, "No se pudo crear el objetivo de ahorro");
    }
};

// UPDATE
export const updateSavingsGoal = async (id, updatedData) => {
    try {
        const res = await api.put(`/savings/${id}`, updatedData);
        return res.data;
    } catch (err) {
        handleError(err, "No se pudo actualizar el objetivo de ahorro");
    }
};

// DELETE
export const deleteSavingsGoal = async (id) => {
    try {
        await api.delete(`/savings/${id}`);
        return true;
    } catch (err) {
        handleError(err, "No se pudo eliminar el objetivo de ahorro");
    }
};