import { useState, useEffect, useCallback } from "react";
import {
    getSavingsGoals,
    createSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal
} from "../services/savingsGoalServices";

export const useSavingsGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchGoals = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getSavingsGoals();
            setGoals(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al obtener metas:", error.message);
        } finally {
            setLoading(false);
        }
    }, []);


    const addGoal = async (goalData) => {
        try {
            await createSavingsGoal(goalData);
            await fetchGoals();
        } catch (error) {
            console.error("Error al crear meta:", error.message);
        }
    };


    const updateGoal = async (id, goalData) => {
        try {
            await updateSavingsGoal(id, goalData);
            await fetchGoals();
        } catch (error) {
            console.error("Error al actualizar meta:", error.message);
        }
    };


    const deleteGoal = async (id) => {
        try {
            await deleteSavingsGoal(id);
            await fetchGoals();
        } catch (error) {
            console.error("Error al eliminar meta:", error.message);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    const addMoneyToGoal = async (goal, amountToAdd) => {
        try {
            const newAmount = Number(goal.currentAmount || 0) + Number(amountToAdd);
            await updateGoal(goal._id || goal.id, {
                ...goal,
                currentAmount: newAmount
            });

            return true;
        } catch (error) {
            console.error("Error al añadir dinero a la hucha:", error);
            return false;
        }
    };

    return {
        goals,
        loading,
        addGoal,
        updateGoal,
        deleteGoal,
        fetchGoals,
        addMoneyToGoal
    };
};