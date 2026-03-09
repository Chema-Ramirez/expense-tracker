import { Container, Typography, Box, Stack, CircularProgress, Button, useTheme, Fade } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SavingsIcon from '@mui/icons-material/Savings';

// HOOKS Y COMPONENTS
import PiggySummary from "../components/PiggySummary";
import PiggyGoalCard from "../components/PiggyGoalCard";
import GoalFormModal from "../components/GoalFormModal";
import { useSavingsGoals } from "../hooks/useSavingsGoals";

const PiggyBank = () => {
    const theme = useTheme();
    const { goals, addGoal, updateGoal, deleteGoal, loading } = useSavingsGoals();
    const [openModal, setOpenModal] = useState(false);

    const handleAddGoal = async (data) => {
        try {
            await addGoal(data);
            setOpenModal(false);
        } catch (err) {
            console.error("Error al añadir meta:", err);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 2, pb: 2 }}>
            {/* HEADER */}
            <Box mb={4}>
                <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                    <SavingsIcon color="primary" sx={{ fontSize: 32 }} />
                    <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -1.5 }}>
                        Mi Hucha
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    Agrega nuevos Objetivos y ahorra para alcanzar todas tus metas.
                </Typography>
            </Box>

            {/* RESUMEN AHORRO TOTAL */}
            <Box mb={4}>
                <PiggySummary goals={goals} />
            </Box>

            {/* BOTÓN CREAR OBJETIVO */}
            <Button
                fullWidth
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setOpenModal(true)}
                sx={{
                    mb: 4,
                    py: 1.8,
                    borderRadius: 4,
                    fontWeight: 800,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: `0 8px 20px ${theme.palette.primary.main}30`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 25px ${theme.palette.primary.main}50`,
                    }
                }}
            >
                Crear nuevo objetivo
            </Button>

            {/* LISTADO */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} px={1}>
                <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                    Objetivos activos
                </Typography>
                <Chip
                    label={`${goals.length} ${goals.length === 1 ? 'meta' : 'metas'}`}
                    sx={{ fontWeight: 800, bgcolor: 'action.hover', color: 'text.secondary' }}
                />
            </Stack>

            {/* RENDERIZADO */}
            {loading && goals.length === 0 ? (
                <Box textAlign="center" py={10}>
                    <CircularProgress size={40} thickness={5} sx={{ mb: 2, borderRadius: 10 }} />
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                        Sincronizando tus ahorros...
                    </Typography>
                </Box>
            ) : (
                <Stack spacing={2.5}>
                    {goals.length > 0 ? (
                        goals.map((goal, index) => (
                            <Fade in={true} timeout={300 + (index * 100)} key={goal._id || goal.id}>
                                <Box>
                                    <PiggyGoalCard
                                        id={goal._id || goal.id}
                                        name={goal.name}
                                        category={goal.category}
                                        saved={goal.currentAmount || 0}
                                        target={goal.targetAmount || 0}
                                        suggestedAmount={goal.suggestedAmount || 0}
                                        onUpdate={updateGoal}
                                        onDelete={deleteGoal}
                                    />
                                </Box>
                            </Fade>
                        ))
                    ) : (
                        <Fade in={true}>
                            <Box
                                textAlign="center"
                                py={6}
                                px={3}
                                sx={{
                                    bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                                    borderRadius: 6,
                                    border: "2px dashed",
                                    borderColor: "divider",
                                }}
                            >
                                <Typography variant="h6" fontWeight={800} color="text.secondary" gutterBottom>
                                    Hucha vacía
                                </Typography>
                                <Typography variant="body2" color="text.disabled" fontWeight={500}>
                                    Aún no tienes metas. ¡Define un objetivo para empezar a ahorrar hoy mismo!
                                </Typography>
                            </Box>
                        </Fade>
                    )}
                </Stack>
            )}

            {/* MODAL NUEVA META */}
            <GoalFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleAddGoal}
            />
        </Container>
    );
};

// CHIP
const Chip = ({ label, sx }) => (
    <Box
        sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            fontSize: '0.75rem',
            borderRadius: 2,
            ...sx
        }}
    >
        {label}
    </Box>
);

export default PiggyBank;