import { createContext } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    loading: false,
    categories: [],
    addExpense: async () => { },
    updateExpense: async () => { },
    deleteExpense: async () => { },
    refreshExpenses: async () => { }
});