import { useState, useEffect } from "react";
import { getSavingsGoals, createSavingsGoal, updateSavingsGoal, deleteSavingsGoal } from "../services/savingsGoalServices";

export const useSavingsGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchGoals = async () => {
        setLoading(true);
        try {
            const data = await getSavingsGoals();
            setGoals(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addGoal = async (goalData) => {
        await createSavingsGoal(goalData);
        fetchGoals();
    };

    const editGoal = async (id, goalData) => {
        await updateSavingsGoal(id, goalData);
        fetchGoals();
    };

    const removeGoal = async (id) => {
        await deleteSavingsGoal(id);
        fetchGoals();
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return { goals, loading, addGoal, editGoal, removeGoal, fetchGoals };
};
