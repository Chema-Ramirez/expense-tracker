//FILTRO POR CATEGORIA
export const filterByCategory = (expenses, category) => {
    if (!category) return expenses;
    return expenses.filter(exp => exp.category === category);
};

//FILTRO POR FECHA
export const filterByDateRange = (expenses, startDate, endDate) => {
    if (!startDate && !endDate) return expenses;
    return expenses.filter(exp => {
        const date = new Date(exp.date);
        if (startDate && date < new Date(startDate)) return false;
        if (endDate && date > new Date(endDate)) return false;
        return true;
    });
};

//APLICA FILTROS
export const applyFilters = (expenses, filters) => {
    let result = [...expenses];
    if (filters.category) result = filterByCategory(result, filters.category);
    if (filters.startDate || filters.endDate) {
        result = filterByDateRange(result, filters.startDate, filters.endDate);
    }
    return result;
};
