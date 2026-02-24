import { Container, Typography, Box, Stack, Fab, Zoom, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

// HOOKS Y COMPONENTS
import PiggySummary from "../components/PiggySummary";
import PiggyGoalCard from "../components/PiggyGoalCard";
import ModalWrapper from "../components/ModalWrapper";
import PiggyGoalForm from "../components/PiggyGoalForm";
import { useSavingsGoals } from "../hooks/useSavingsGoals";

const PiggyBank = () => {
    const { goals, addGoal, updateGoal, deleteGoal, loading } = useSavingsGoals();
    const [openModal, setOpenModal] = useState(false);

    const handleAddGoal = async (data) => {
        await addGoal(data);
        setOpenModal(false);
    };

    return (
        <Container maxWidth="sm" sx={{ pb: 12 }}>
            {/* HEADER */}
            <Box my={4}>
                <Typography variant="h4" fontWeight={900} gutterBottom>
                    Mi Hucha 🐷
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight={500}>
                    Gestiona tus objetivos de ahorro y visualiza tu progreso.
                </Typography>
            </Box>

            {/* RESUMEN AHORRO TOTAL */}
            <Box mb={5}>
                <PiggySummary goals={goals} />
            </Box>

            {/* LISTADO */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={800}>
                    Objetivos activos
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    {goals.length} {goals.length === 1 ? 'META' : 'METAS'}
                </Typography>
            </Stack>

            {loading && goals.length === 0 ? (
                <Box textAlign="center" py={10}>
                    <CircularProgress size={30} thickness={5} />
                    <Typography sx={{ mt: 2 }} color="text.secondary">Actualizando tu hucha...</Typography>
                </Box>
            ) : (
                <Stack spacing={0.5}>
                    {goals.length > 0 ? (
                        goals.map((goal) => (
                            <PiggyGoalCard
                                key={goal._id}
                                id={goal._id}
                                name={goal.name}
                                saved={goal.currentAmount || 0}
                                target={goal.targetAmount || 0}
                                suggestedAmount={goal.suggestedAmount || 0}
                                onUpdate={updateGoal}
                                onDelete={deleteGoal}
                            />
                        ))
                    ) : (
                        <Box
                            textAlign="center"
                            py={8}
                            px={3}
                            bgcolor="action.hover"
                            borderRadius={6}
                            border="2px dashed"
                            borderColor="divider"
                        >
                            <Typography variant="h6" fontWeight={700} color="text.secondary" gutterBottom>
                                ¿Tienes un nuevo sueño?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Haz clic en el botón + para empezar a ahorrar para ese viaje o capricho.
                            </Typography>
                        </Box>
                    )}
                </Stack>
            )}

            {/* BOTÓN AÑADIR META */}
            <Zoom in={!loading}>
                <Fab
                    color="primary"
                    aria-label="add-goal"
                    onClick={() => setOpenModal(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 30,
                        right: 20,
                        boxShadow: (theme) => `0 10px 25px ${theme.palette.primary.light}80`
                    }}
                >
                    <AddIcon />
                </Fab>
            </Zoom>

            {/* MODAL NUEVA META */}
            <ModalWrapper
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Nueva Meta de Ahorro"
            >
                <PiggyGoalForm
                    onSubmit={handleAddGoal}
                    onCancel={() => setOpenModal(false)}
                />
            </ModalWrapper>
        </Container>
    );
};

export default PiggyBank;