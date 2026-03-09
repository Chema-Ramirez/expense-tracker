import {
    Container, Typography, Box, Paper, Fab, Zoom, Avatar, Stack,
    useTheme, Button, Skeleton, Snackbar, Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HistoryIcon from '@mui/icons-material/History';
import { useState } from "react";
import { getCategoryConfig } from "../utils/categoryHelpers";

// COMPONENTES & HOOKS
import MonthlySummary from "../components/MonthlySummary";
import ExpensePieChart from "../components/ExpensePieChart";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseItem from "../components/ExpenseItem";
import ModalWrapper from "../components/ModalWrapper";
import { useExpenses } from "../hooks/useExpenses";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    // HOOKS
    const { user, loading: authLoading } = useAuth();
    const {
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        loading: expensesLoading
    } = useExpenses();

    // ESTADOS
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    // HANDLERS
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };


    // CREATE
    const handleAddExpense = async (data) => {
        try {
            await addExpense(data);
            setOpenModal(false);
            setSnackbar({
                open: true,
                message: "¡Movimiento guardado!",
                severity: "success"
            });
        } catch (err) {
            console.error("Error al guardar:", err);
            setSnackbar({
                open: true,
                message: "Error al guardar el movimiento",
                severity: "error"
            });
        }
    };

    //UPDATE
    const handleUpdateExpense = async (data) => {
        const id = editingExpense?._id || editingExpense?.id;
        try {
            await updateExpense(id, data);

            setEditingExpense(null);
            setSnackbar({
                open: true,
                message: "¡Movimiento actualizado!",
                severity: "success"
            });
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.message || "Error al actualizar el movimiento",
                severity: "error"
            });
        }
    };


    //DELETE
    const handleConfirmDelete = (id) => {
        setExpenseToDelete(id);
    };

    const handleDeleteExpense = async () => {
        if (!expenseToDelete) return;

        try {
            await deleteExpense(expenseToDelete);
            setSnackbar({ open: true, message: "¡Movimiento eliminado!", severity: "success" });
            setExpenseToDelete(null);
        } catch (err) {
            console.error("Error al borrar:", err);
            setSnackbar({ open: true, message: "Error al eliminar", severity: "error" });
        }
    };

    // CATEGORIAS
    const handleToggleCategory = (catName) => {
        setSelectedCategories(prev =>
            prev.includes(catName)
                ? prev.filter(c => c !== catName)
                : [...prev, catName]
        );
    };

    // LÓGICA DE FILTRADO
    const filteredExpenses = selectedCategories.length > 0
        ? expenses.filter(e => selectedCategories.includes(getCategoryConfig(e.category).label))
        : expenses;

    // RENDERS AUXILIARES
    const renderHeader = () => {
        if (authLoading) return <Skeleton variant="text" width={200} height={80} />;
        return (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -1.5, mt: -0.5 }}>
                        Hola, {user?.name?.split(" ")[0] || "Ahorrador"} 👋
                    </Typography>
                </Box>
                <Avatar
                    src={user?.avatarUrl}
                    sx={{
                        width: 52, height: 52,
                        bgcolor: "primary.main",
                        fontWeight: 900,
                        fontSize: '1.2rem',
                        boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                        border: '2px solid #fff'
                    }}
                >
                    {user?.name?.charAt(0).toUpperCase() || "P"}
                </Avatar>
            </Stack>
        );
    };

    return (
        <Container maxWidth="sm" sx={{ pb: 2 }}>
            <Box py={3}>{renderHeader()}</Box>

            <Box mb={4}>
                <MonthlySummary expenses={expenses} />
            </Box>

            {/* SECCIÓN DE GRÁFICO */}
            <Paper
                elevation={0}
                sx={{
                    p: 4, pb: 0.5, mb: 4, borderRadius: 5, border: "1px solid", borderColor: "divider",
                    background: theme.palette.mode === 'light'
                        ? "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)"
                        : "rgba(255,255,255,0.03)",
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ height: 40, mb: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <TrendingUpIcon sx={{ color: 'primary.main' }} />
                            <Typography variant="subtitle1" fontWeight={800}>Gráfica de Gastos</Typography>
                        </Stack>

                        {selectedCategories.length > 0 && (
                            <Button
                                size="small"
                                onClick={() => setSelectedCategories([])}
                                sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
                            >
                                Limpiar ({selectedCategories.length})
                            </Button>
                        )}
                    </Stack>
                </Box>

                <Box sx={{ height: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {expensesLoading ? (
                        <Skeleton variant="circular" width={180} height={180} />
                    ) : expenses.length > 0 ? (
                        <ExpensePieChart
                            expenses={expenses}
                            activeCategories={selectedCategories}
                            onSegmentClick={handleToggleCategory}
                        />
                    ) : (
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Sin datos suficientes
                        </Typography>
                    )}
                </Box>
            </Paper>

            {/* ÚLTIMOS MOVIMIENTOS */}
            <Box mb={4}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} px={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <HistoryIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="subtitle1" fontWeight={800}>
                            {selectedCategories.length > 0 ? 'Filtrado' : 'Actividad Reciente'}
                        </Typography>
                    </Stack>
                    <Button
                        size="small"
                        endIcon={<ChevronRightIcon />}
                        onClick={() => navigate("/expenses")}
                        sx={{ textTransform: 'none', fontWeight: 800, borderRadius: 2 }}
                    >
                        Ver todo
                    </Button>
                </Stack>

                <Stack spacing={1.5}>
                    {filteredExpenses.length > 0 ? (
                        [...filteredExpenses]
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .slice(0, 4)
                            .map((expense) => (
                                <ExpenseItem
                                    key={expense._id || expense.id}
                                    expense={expense}
                                    showActions={true}
                                    onDelete={() => handleConfirmDelete(expense._id || expense.id)}
                                    onEdit={(exp) => setEditingExpense(exp)}
                                />
                            ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                            No hay movimientos registrados
                        </Typography>
                    )}
                </Stack>
            </Box>

            {/* BOTÓN FLOTANTE */}
            <Zoom in={!expensesLoading}>
                <Fab
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 100, sm: 40 },
                        right: { xs: 25, sm: 40 },
                        zIndex: 1000,
                        width: 65, height: 65,
                        boxShadow: `0 12px 24px ${theme.palette.primary.main}50`
                    }}
                >
                    <AddIcon sx={{ fontSize: 32 }} />
                </Fab>
            </Zoom>

            {/* AÑADIR */}
            <ModalWrapper open={openModal} onClose={() => setOpenModal(false)} title="Añadir Movimiento">
                <ExpenseForm onSubmit={handleAddExpense} onCancel={() => setOpenModal(false)} />
            </ModalWrapper>

            {/* EDITAR */}
            <ModalWrapper
                open={Boolean(editingExpense)}
                onClose={() => setEditingExpense(null)}
                title="Editar Movimiento"
            >
                {editingExpense && (
                    <ExpenseForm
                        initialData={editingExpense}
                        onSubmit={handleUpdateExpense}
                        onCancel={() => setEditingExpense(null)}
                    />
                )}
            </ModalWrapper>

            {/* NOTIFICACIONES */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ borderRadius: 4, fontWeight: 700, px: 3, mb: { xs: 10, sm: 0 } }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>



            {/* MODAL DE CONFIRMACIÓN DE BORRADO */}
            <ModalWrapper
                open={Boolean(expenseToDelete)}
                onClose={() => setExpenseToDelete(null)}
                title="¿Eliminar Gasto?"
            >
                <Box sx={{ p: 1 }}>
                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Esta acción no se puede deshacer. El Gasto desaparecerá de tu historial permanentemente.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setExpenseToDelete(null)}
                            sx={{ borderRadius: 3, py: 1.5, fontWeight: 800, textTransform: 'none' }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={handleDeleteExpense}
                            sx={{
                                borderRadius: 3,
                                py: 1.5,
                                fontWeight: 800,
                                textTransform: 'none',
                                boxShadow: `0 8px 20px ${theme.palette.error.main}40`
                            }}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </Box>
            </ModalWrapper>
        </Container>
    );
};

export default Dashboard;