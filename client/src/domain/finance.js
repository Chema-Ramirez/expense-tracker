//CARCULAR INGRESO TOTAL A PARTIR DE INGRESOS
export const calculateIncome = (expenses, incomeCategory = "Sueldo") => {
    return expenses
        .filter((e) => e.category === incomeCategory)
        .reduce((sum, e) => sum + e.amount, 0);
};


//CALCULAR GASTOS TOTALES
export const calculateTotalExpenses = (expenses, incomeCategory = "Sueldo") => {
    return expenses
        .filter((e) => e.category !== incomeCategory)
        .reduce((sum, e) => sum + e.amount, 0);
};


//CALCULAR AHORRO MENSUAL
export const calculateMonthlySavings = (expenses, incomeCategory = "Sueldo") => {
    const income = calculateIncome(expenses, incomeCategory);
    const totalExpenses = calculateTotalExpenses(expenses, incomeCategory);
    return Math.max(income - totalExpenses, 0);
};


//CATEGORIAS
export const extractCategories = (expenses) => {
    return [...new Set(expenses.map((e) => e.category))];
};
