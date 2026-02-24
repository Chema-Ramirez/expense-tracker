import { createContext } from "react";

export const SavingsContext = createContext({
    goals: [],
    loading: false,
    addGoal: async () => { },
    updateGoal: async () => { },
    deleteGoal: async () => { }
});