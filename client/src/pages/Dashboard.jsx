import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Fab,
    Zoom,
    Avatar,
    Stack,
    useTheme,
    IconButton,
    Button
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

// COMPONENTES & HOOKS
import MonthlySummary from "../components/MonthlySummary";
import ExpensePieChart from "../components/ExpensePieChart";
import ExpenseForm from "../components/ExpenseForm";
import ModalWrapper from "../components/ModalWrapper";
import { useExpenses } from "../hooks/useExpenses";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { expenses, addExpense, categories } = useExpenses();
    const [openModal, setOpenModal] = useState(false);

    const handleAddExpense = async (data) => {
        await addExpense(data);
        setOpenModal(false);
    };

    return (
        <Container maxWidth="sm" sx={{ pb: 12 }}>
            {/* HEADER */}
            <Box py={4}>
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
                            boxShadow: "0 4px 12px rgba(31,191,159,0.3)"
                        }}
                    >
                        {user?.name?.charAt(0) || "P"}
                    </Avatar>
                </Stack>
            </Box>

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
                    <ExpensePieChart expenses={expenses} categories={categories} />
                </Box>
            </Paper>

            {/* ESTADO DE CUENTA */}
            <Box mb={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={800}>Estado de la cuenta</Typography>
                    <Button
                        endIcon={<ChevronRightIcon />}
                        onClick={() => navigate("/expenses")}
                        sx={{ textTransform: 'none', fontWeight: 700 }}
                    >
                        Ver todo
                    </Button>
                </Stack>

                {/* MINI TARJETA */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.5,
                        borderRadius: 4,
                        bgcolor: theme.palette.mode === 'light' ? "#f0fdf4" : "rgba(31,191,159,0.1)",
                        border: "1px dashed",
                        borderColor: "primary.main"
                    }}
                >
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        Has registrado <b>{expenses.length} movimientos</b> este mes.
                        ¡Sigue así para optimizar tus ahorros!
                    </Typography>
                </Paper>
            </Box>

            {/* BOTÓN*/}
            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setOpenModal(true)}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 80, sm: 40 },
                        right: { xs: 20, sm: 40 },
                        width: 65,
                        height: 65,
                        boxShadow: "0 10px 25px rgba(31,191,159,0.4)",
                        '&:hover': { transform: 'scale(1.1)' },
                        transition: 'all 0.2s ease-in-out'
                    }}
                >
                    <AddIcon sx={{ fontSize: 32 }} />
                </Fab>
            </Zoom>

            {/* MODAL Wrapper estilizado */}
            <ModalWrapper
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Añadir nuevo registro"
            >
                <ExpenseForm onSubmit={handleAddExpense} />
            </ModalWrapper>
        </Container>
    );
};

export default Dashboard;