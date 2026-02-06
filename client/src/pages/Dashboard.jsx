import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    Paper,
    CircularProgress,
    Divider,
    Button,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";
import {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
} from "../services/expenseServices";

import ExpenseList from "../components/ExpenseList";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseForm from "../components/ExpenseForm";
import MonthlySummary from "../components/MonthlySummary";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    // FETCH EXPENSES
    const fetchExpenses = useCallback(
        async (appliedFilters = {}) => {
            if (!user) return;

            setLoading(true);
            try {
                const data = await getExpenses(appliedFilters);
                setExpenses(data);

                const uniqueCategories = [
                    ...new Set(data.map((exp) => exp.category)),
                ];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        },
        [user]
    );

    useEffect(() => {
        fetchExpenses({});
    }, [fetchExpenses]);

    // CRUD 
    const handleEdit = (expense) => setExpenseToEdit(expense);

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            fetchExpenses(filters);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleFormSubmit = async (expenseData) => {
        try {
            if (expenseToEdit) {
                await updateExpense(expenseToEdit._id, expenseData);
            } else {
                await createExpense(expenseData);
            }

            setExpenseToEdit(null);
            fetchExpenses(filters);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        fetchExpenses(newFilters);
    };

    // FINANCIAL CALCULATION
    const income =
        expenses.find((exp) => exp.category === "Sueldo")?.amount || 0;

    const totalExpenses = expenses
        .filter((exp) => exp.category !== "Sueldo")
        .reduce((sum, exp) => sum + exp.amount, 0);

    const monthlySavings = Math.max(income - totalExpenses, 0);

    return (
        <Container maxWidth="sm" sx={{ py: 3 }}>
            {/* HEADER */}
            <Box mb={3} textAlign="center">
                <Typography variant="h4" fontWeight={700}>
                    Control de Gastos
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Bienvenido, <strong>{user?.name}</strong> 👋
                </Typography>
            </Box>

            {/* SUMMARY */}
            <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                <MonthlySummary expenses={expenses} />
            </Paper>

            {/* CTA TO PIGGY BANK */}
            <Box mb={3}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 3 }}
                    onClick={() =>
                        navigate("/piggy-bank", {
                            state: { monthlySavings },
                        })
                    }
                >
                    Ir a la hucha 🐷
                </Button>
            </Box>

            {/* FILTERS */}
            <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
                <ExpenseFilters
                    filters={filters}
                    setFilters={handleApplyFilters}
                    categories={categories}
                />
            </Paper>

            {/* FORM */}
            <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
                <Typography variant="h6" gutterBottom>
                    {expenseToEdit ? "Editar gasto" : "Nuevo gasto"}
                </Typography>

                <ExpenseForm
                    expenseToEdit={expenseToEdit}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setExpenseToEdit(null)}
                    categories={categories}
                />
            </Paper>

            {/* LIST */}
            <Paper sx={{ p: 2 }} elevation={2}>
                <Typography variant="h6" gutterBottom>
                    Gastos recientes
                </Typography>

                <Divider sx={{ mb: 2 }} />

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
        </Container>
    );
};

export default Dashboard;
