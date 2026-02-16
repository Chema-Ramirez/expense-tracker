import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Paper, CircularProgress, Divider, IconButton } from "@mui/material";

import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useExpenses } from "../hooks/useExpenses";
import { useFilters } from "../hooks/useFilters";
import { useMonthlySavings } from "../hooks/useMonthlySavings";

import ExpenseList from "../components/ExpenseList";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseForm from "../components/ExpenseForm";
import MonthlySummary from "../components/MonthlySummary";

const Dashboard = () => {
    const { user } = useAuth();
    const { mode } = useTheme();
    const navigate = useNavigate();

    const { expenses, categories, loading, expenseToEdit, handleEdit, handleDelete, handleFormSubmit, setExpenseToEdit } = useExpenses();
    const { filters, applyFilters } = useFilters();
    const monthlySavings = useMonthlySavings(expenses);

    const navItems = [
        { label: "Inicio", icon: "/icons/home.png", action: () => navigate("/dashboard") },
        { label: "Hucha", icon: "/icons/192.png", action: () => navigate("/piggybank", { state: { monthlySavings } }) },
        { label: "Perfil", icon: "/icons/user.png", action: () => navigate("/profile") },
        { label: "Ajustes", icon: "/icons/config.png", action: () => navigate("/settings") },
    ];

    return (
        <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: mode === "light" ? "#f5f5f5" : "#121212", color: mode === "light" ? "#111" : "#fff", pb: "70px" }}>
            <Container maxWidth="sm" sx={{ py: 3, flex: 1 }}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h4" fontWeight={700}>Control de Gastos</Typography>
                    <Typography variant="body1" color={mode === "light" ? "text.secondary" : "#ccc"}>Bienvenido, <strong>{user?.name}</strong> 👋</Typography>
                </Box>

                <Paper sx={{ p: 2, mb: 3, backgroundColor: mode === "light" ? "#fff" : "#1e1e1e" }} elevation={3}>
                    <MonthlySummary expenses={expenses} />
                </Paper>

                <Paper sx={{ p: 2, mb: 3, backgroundColor: mode === "light" ? "#fff" : "#1e1e1e" }} elevation={2}>
                    <ExpenseFilters filters={filters} setFilters={applyFilters} categories={categories} />
                </Paper>

                <Paper sx={{ p: 2, mb: 3, backgroundColor: mode === "light" ? "#fff" : "#1e1e1e" }} elevation={2}>
                    <Typography variant="h6" gutterBottom>{expenseToEdit ? "Editar gasto" : "Nuevo gasto"}</Typography>
                    <ExpenseForm expenseToEdit={expenseToEdit} onSubmit={handleFormSubmit} onCancel={() => setExpenseToEdit(null)} categories={categories} />
                </Paper>

                <Paper sx={{ p: 2, backgroundColor: mode === "light" ? "#fff" : "#1e1e1e" }} elevation={2}>
                    <Typography variant="h6" gutterBottom>Gastos recientes</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {loading ? <Box display="flex" justifyContent="center" py={3}><CircularProgress /></Box>
                        : <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />}
                </Paper>
            </Container>

            <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%", height: 70, backgroundColor: mode === "light" ? "#fff" : "#1e1e1e", borderTop: `1px solid ${mode === "light" ? "#ddd" : "#333"}`, display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 10 }}>
                {navItems.map((item, idx) => (
                    <IconButton key={idx} onClick={item.action} sx={{ flexDirection: "column", color: mode === "light" ? "#111" : "#fff" }}>
                        <Box component="img" src={item.icon} alt={item.label} sx={{ width: 24, height: 24, mb: 0.5 }} />
                        <Typography variant="caption">{item.label}</Typography>
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default Dashboard;
