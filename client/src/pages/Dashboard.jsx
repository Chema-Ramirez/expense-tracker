import {
    Container,
    Typography,
    Box,
    Paper,
    Fab,
    Zoom,
    Avatar,
    Stack,
    useTheme,
    Button,
    Skeleton,
    Divider
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HistoryIcon from '@mui/icons-material/History';
import { useState } from "react";

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
    const { expenses, addExpense, categories, loading: expensesLoading } = useExpenses();
    const [openModal, setOpenModal] = useState(false);

    const handleAddExpense = async (data) => {
        try {
            await addExpense(data);
            setOpenModal(false);
        } catch (error) {
            console.error("Error al añadir gasto:", error);
        }
    };

    const renderHeader = () => {
        if (authLoading) return <Skeleton variant="text" width={200} height={80} />;
        return (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>
                        ¡Bienvenido de nuevo!
                    </Typography>
                    <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -1 }}>
                        {user?.name?.split(" ")[0] || "Piggy Saver"} 👋
                    </Typography>
                </Box>
                <Avatar
                    sx={{
                        width: 56, height: 56,
                        bgcolor: "primary.main",
                        fontWeight: 800,
                        boxShadow: `0 4px 12px ${theme.palette.primary.main}4D`
                    }}
                >
                    {user?.name?.charAt(0).toUpperCase() || "P"}
                </Avatar>
            </Stack>
        );
    };

    return (
        <Container maxWidth="sm" sx={{ pb: 12 }}>
            {/* HEADER */}
            <Box py={4}>{renderHeader()}</Box>

            {/* RESUMEN MENSUAL */}
            <Box mb={4}>
                <MonthlySummary expenses={expenses} />
            </Box>

            {/* SECCIÓN DE GRÁFICO */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 5,
                    border: "1px solid",
                    borderColor: "divider",
                    background: theme.palette.mode === 'light'
                        ? "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)"
                        : "rgba(255,255,255,0.02)"
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                    <TrendingUpIcon color="primary" />
                    <Typography variant="h6" fontWeight={800}>Gastos por categoría</Typography>
                </Stack>

                <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {expenses.length > 0 ? (
                        <ExpensePieChart expenses={expenses} categories={categories} />
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Aún no hay gastos registrados
                        </Typography>
                    )}
                </Box>
            </Paper>

            {/* ÚLTIMOS MOVIMIENTOS */}
            <Box mb={4}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <HistoryIcon color="primary" />
                        <Typography variant="h6" fontWeight={800}>Últimos movimientos</Typography>
                    </Stack>
                    <Button
                        endIcon={<ChevronRightIcon />}
                        onClick={() => navigate("/expenses")}
                        sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
                    >
                        Ver todo
                    </Button>
                </Stack>

                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        borderRadius: 5,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    {expensesLoading ? (
                        <Box p={2}>
                            <Skeleton
                                variant="rectangular"
                                height={150}
                                sx={{ borderRadius: 5 }}
                                animation="wave"
                            />
                        </Box>
                    ) : expenses.length > 0 ? (
                        <Stack divider={<Divider variant="middle" sx={{ opacity: 0.6 }} />}>
                            {[...expenses]
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 4)
                                .map((expense) => (
                                    <ExpenseItem
                                        key={expense._id || expense.id}
                                        expense={expense}
                                        showActions={false}
                                    />
                                ))
                            }
                        </Stack>
                    ) : (
                        <Box textAlign="center" py={3}>
                            <Typography variant="body2" color="text.secondary">
                                No hay movimientos este mes.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Box>

            {/* FAB BOTÓN */}
            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setOpenModal(true)}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 30, sm: 40 },
                        right: { xs: 20, sm: 40 },
                        width: 65,
                        height: 65,
                        boxShadow: `0 10px 25px ${theme.palette.primary.main}66`,
                        '&:hover': { transform: 'scale(1.1)' },
                        transition: 'all 0.2s ease-in-out'
                    }}
                >
                    <AddIcon sx={{ fontSize: 32 }} />
                </Fab>
            </Zoom>

            {/* MODAL WRAPPER */}
            <ModalWrapper
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Nuevo Gasto"
            >
                <ExpenseForm
                    onSubmit={handleAddExpense}
                    onCancel={() => setOpenModal(false)}
                />
            </ModalWrapper>
        </Container>
    );
};

export default Dashboard;