import { Box, Typography, Paper, CircularProgress } from "@mui/material";

import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useExpenses } from "../hooks/useExpenses";
import { useFilters } from "../hooks/useFilters";

import ExpenseList from "../components/ExpenseList";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseForm from "../components/ExpenseForm";
import MonthlySummary from "../components/MonthlySummary";
import ExpensePieChart from "../components/ExpensePieChart";

const Dashboard = () => {
    const { user } = useAuth();
    const { mode } = useTheme();

    const {
        expenses,
        categories,
        loading,
        expenseToEdit,
        handleEdit,
        handleDelete,
        handleFormSubmit,
        setExpenseToEdit,
    } = useExpenses();

    const { filters, applyFilters } = useFilters();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                pb: 2,
            }}
        >
            {/* HEADER */}
            <Box textAlign="center" mb={1}>
                <Typography variant="h4" fontWeight={700}>
                    💰 Control de Gastos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Bienvenido, <strong>{user?.name}</strong> 👋
                </Typography>
            </Box>

            {/* MONTHLY SUMMARY */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #1FBF9F 0%, #d8c72c 100%)",
                    color: "#fff",
                }}
                elevation={4}
            >
                <MonthlySummary expenses={expenses} />
            </Paper>

            {/* PIE CHART */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: mode === "light" ? "#fff" : "#1e1e1e",
                }}
                elevation={3}
            >
                <Typography variant="h6" gutterBottom>
                    Gastos por Categoría
                </Typography>

                {expenses.length > 0 ? (
                    <ExpensePieChart expenses={expenses} categories={categories} />
                ) : (
                    <Typography textAlign="center" color="text.secondary">
                        No hay gastos registrados
                    </Typography>
                )}
            </Paper>

            {/* FILTERS */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: mode === "light" ? "#fff" : "#1e1e1e",
                }}
                elevation={2}
            >
                <ExpenseFilters filters={filters} setFilters={applyFilters} />
            </Paper>

            {/* EXPENSE FORM */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: mode === "light" ? "#fff" : "#1e1e1e",
                }}
                elevation={2}
            >
                <Typography variant="h6" gutterBottom>
                    {expenseToEdit ? "Editar Gasto" : "Nuevo Gasto"}
                </Typography>

                <ExpenseForm
                    expenseToEdit={expenseToEdit}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setExpenseToEdit(null)}
                />
            </Paper>

            {/* RECENT EXPENSES */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: mode === "light" ? "#fff" : "#1e1e1e",
                }}
                elevation={2}
            >
                <Typography variant="h6" gutterBottom>
                    Gastos Recientes
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" py={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <ExpenseList
                        expenses={expenses}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </Paper>
        </Box>
    );
};

export default Dashboard;
