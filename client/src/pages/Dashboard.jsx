import {
    Container, Typography, Box, Paper, Fab, Zoom, Avatar, Stack,
    useTheme, Button, Skeleton, Divider, Snackbar, Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HistoryIcon from '@mui/icons-material/History';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
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

    const { user, loading: authLoading } = useAuth();
    const { expenses, addExpense, loading: expensesLoading } = useExpenses();

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleAddExpense = async (data) => {
        try {
            await addExpense(data);
            setOpenModal(false);
            setSnackbar({
                open: true,
                message: "¡Movimiento guardado! 🐷",
                severity: "success"
            });
        } catch (err) {
            console.error("Detalle técnico:", err);
            setSnackbar({
                open: true,
                message: "Error al guardar el movimiento",
                severity: "error"
            });
        }
    };

    const handleToggleCategory = (catName) => {
        setSelectedCategories(prev =>
            prev.includes(catName)
                ? prev.filter(c => c !== catName)
                : [...prev, catName]
        );
    };

    const filteredExpenses = selectedCategories.length > 0
        ? expenses.filter(e => selectedCategories.includes(getCategoryConfig(e.category).label))
        : expenses;

    const renderHeader = () => {
        if (authLoading) return <Skeleton variant="text" width={200} height={80} />;
        return (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        Inicio
                    </Typography>
                    <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -1.5, mt: -0.5 }}>
                        Hola, {user?.name?.split(" ")[0] || "Ahorrador"} 👋
                    </Typography>
                </Box>
                <Avatar
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
        <Container maxWidth="sm" sx={{ pb: 15 }}>
            <Box py={3}>{renderHeader()}</Box>

            <Box mb={4}>
                <MonthlySummary expenses={expenses} />
            </Box>

            {/* SECCIÓN DE GRÁFICO */}
            <Paper
                elevation={0}
                sx={{
                    p: 3, mb: 4, borderRadius: 5, border: "1px solid", borderColor: "divider",
                    background: theme.palette.mode === 'light'
                        ? "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)"
                        : "rgba(255,255,255,0.03)",
                    overflow: 'hidden',
                    position: 'relative',
                    '&:focus-within': { outline: 'none' },
                    '& .recharts-surface:focus': { outline: 'none' }
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

                <Box sx={{
                    minHeight: 45,
                    mt: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    maxHeight: 90,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': { display: 'none' }
                }}>
                    {selectedCategories.map(cat => (
                        <Zoom key={cat} in={true}>
                            <Box
                                onClick={() => handleToggleCategory(cat)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    transition: '0.2s',
                                    '&:hover': { transform: 'scale(0.95)', opacity: 0.9 }
                                }}
                            >
                                {cat} <CloseIcon sx={{ fontSize: 14 }} />
                            </Box>
                        </Zoom>
                    ))}
                </Box>
            </Paper>

            {/* ÚLTIMOS MOVIMIENTOS */}
            <Box mb={4}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} px={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <HistoryIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="subtitle1" fontWeight={800}>
                            {selectedCategories.length === 1
                                ? `Gastos en ${selectedCategories[0]}`
                                : selectedCategories.length > 1
                                    ? 'Filtro múltiple activo'
                                    : 'Actividad Reciente'}
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
                                <ExpenseItem key={expense._id || expense.id} expense={expense} showActions={false} />
                            ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                            No hay movimientos que coincidan
                        </Typography>
                    )}
                </Stack>
            </Box>

            {/* FAB BOTÓN */}
            <Zoom in={!expensesLoading}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setOpenModal(true)}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 100, sm: 40 },
                        right: { xs: 25, sm: 40 },
                        zIndex: 1000,
                        width: 65,
                        height: 65,
                        boxShadow: `0 12px 24px ${theme.palette.primary.main}50`,
                        '&:hover': { transform: 'scale(1.1) rotate(90deg)', transition: '0.3s' }
                    }}
                >
                    <AddIcon sx={{ fontSize: 32 }} />
                </Fab>
            </Zoom>

            {/* MODAL & NOTIFICACIONES */}
            <ModalWrapper open={openModal} onClose={() => setOpenModal(false)} title="Añadir Movimiento">
                <ExpenseForm onSubmit={handleAddExpense} onCancel={() => setOpenModal(false)} />
            </ModalWrapper>

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
        </Container>
    );
};

export default Dashboard;