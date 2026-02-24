import { useState, useEffect, useCallback, useRef } from "react";
import { SavingsContext } from "./SavingsContext";
import {
    getSavingsGoals,
    createSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal
} from "../services/savingsGoalServices";
import { useAuth } from "../hooks/useAuth";

export const SavingsProvider = ({ children }) => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const isFetching = useRef(false);

    const fetchGoals = useCallback(async () => {
        if (!user || isFetching.current) return;
        isFetching.current = true;
        setLoading(true);
        try {
            const data = await getSavingsGoals();
            setGoals(Array.isArray(data) ? data : []);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [user]);

    const addGoal = async (goalData) => {
        const newGoal = await createSavingsGoal(goalData);
        if (newGoal) {
            setGoals((prev) => [newGoal, ...prev]);
        }
        return newGoal;
    };

    const updateGoal = async (id, goalData) => {
        const updated = await updateSavingsGoal(id, goalData);
        setGoals((prev) => prev.map((g) => (g._id === id ? updated : g)));
        return updated;
    };

    const deleteGoal = async (id) => {
        await deleteSavingsGoal(id);
        setGoals((prev) => prev.filter((g) => g._id !== id));
    };

    useEffect(() => {
        if (user) {
            fetchGoals();
        } else {
            setGoals([]);
        }
    }, [user, fetchGoals]);

    return (
        <SavingsContext.Provider value={{ goals, loading, addGoal, updateGoal, deleteGoal }}>
            {children}
        </SavingsContext.Provider>
    );
};