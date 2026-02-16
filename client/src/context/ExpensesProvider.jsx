import { useState } from "react";
import { ExpensesContext } from "./ExpensesContext";

export const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);

    return (
        <ExpensesContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpensesContext.Provider>
    );
};
