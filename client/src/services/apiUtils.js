export const cleanFilters = (filters = {}) =>
    Object.fromEntries(
        Object.entries(filters).filter(
            ([, value]) => value !== null && value !== "" && value !== undefined
        )
    );

export const handleError = (err, defaultMessage) => {
    console.error("Error capturado:", err);

    if (err.response) {
        if (err.response.status === 401) {
            return "Sesión expirada";
        }
        throw new Error(err.response.data?.message || defaultMessage);
    }
    throw new Error(err.message || "Error de conexión con el servidor");
};