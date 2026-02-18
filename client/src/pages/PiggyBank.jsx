import { Container, Typography, Box, Stack, Fab, Zoom } from "@mui/material";
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
        <Container maxWidth="sm">
            {/* HEADER */}
            <Box my={3}>
                <Typography variant="h4" fontWeight={900}>Mi Hucha 🐷</Typography>
                <Typography variant="body1" color="text.secondary">
                    Gestiona tus objetivos de ahorro
                </Typography>
            </Box>

            {/* RESUMEN AHORRO TOTAL */}
            <Box mb={4}>
                <PiggySummary goals={goals} />
            </Box>

            {/* LISTADO */}
            <Typography variant="h6" mb={2} fontWeight={700}>Objetivos activos</Typography>

            {loading ? (
                <Typography>Cargando metas...</Typography>
            ) : (
                <Stack spacing={1}>
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
                        <Box textAlign="center" py={5} bgcolor="background.paper" borderRadius={4}>
                            <Typography color="text.secondary">
                                No tienes metas creadas aún.
                            </Typography>
                        </Box>
                    )}
                </Stack>
            )}

            {/* BOTÓN AÑADIR META */}
            <Zoom in={true}>
                <Fab
                    color="secondary"
                    aria-label="add-goal"
                    onClick={() => setOpenModal(true)}
                    sx={{ position: 'fixed', bottom: 90, right: 20 }}
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