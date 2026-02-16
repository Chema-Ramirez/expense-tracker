import { useContext, useMemo } from "react";
import { ExpensesContext } from "../context/ExpensesContext";
import { calculateMonthlySavings } from "../domain/finance";

export const useMonthlySavings = () => {
    const { expenses } = useContext(ExpensesContext);

    const monthlySavings = useMemo(() => {
        return calculateMonthlySavings(expenses || [], "Sueldo");
    }, [expenses]);

    return monthlySavings;
};
