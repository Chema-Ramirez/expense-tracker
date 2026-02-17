import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Modal } from "@mui/material";

import PiggyGoalCard from "../components/PiggyGoalCard";
import PiggySummary from "../components/PiggySummary";

import {
    getSavingsGoals,
    createSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
} from "../services/savingsGoalServices";

const PiggyBank = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newGoalData, setNewGoalData] = useState({ name: "", target: 0, suggestedAmount: 0 });

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        setLoading(true);
        try {
            const data = await getSavingsGoals();
            setGoals(data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGoal = async (goalData) => {
        try {
            await createSavingsGoal(goalData);
            setModalOpen(false);
            fetchGoals();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdateGoal = async (id, updatedData) => {
        try {
            await updateSavingsGoal(id, updatedData);
            fetchGoals();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteGoal = async (id) => {
        try {
            await deleteSavingsGoal(id);
            fetchGoals();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 3 }}>
            <Box mb={3} textAlign="center">
                <Typography variant="h4" fontWeight={700}>🐷 Hucha</Typography>
                <Typography variant="body2" color="text.secondary">Tus objetivos de ahorro</Typography>
            </Box>

            <PiggySummary goals={goals} />

            <Box mt={3} display="flex" flexDirection="column" gap={2}>
                {loading ? (
                    <Typography textAlign="center">Cargando objetivos...</Typography>
                ) : goals.length === 0 ? (
                    <Typography textAlign="center" color="text.secondary">No hay objetivos todavía.</Typography>
                ) : (
                    goals.map((goal) => (
                        <PiggyGoalCard
                            key={goal._id}
                            id={goal._id}
                            name={goal.name}
                            saved={goal.currentAmount}
                            target={goal.targetAmount}
                            suggestedAmount={goal.suggestedAmount}
                            onUpdate={handleUpdateGoal}
                            onDelete={handleDeleteGoal}
                        />
                    ))
                )}
            </Box>

            <Box mt={4}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 3 }}
                    onClick={() => {
                        setNewGoalData({ name: "", target: 0, suggestedAmount: 0 });
                        setModalOpen(true);
                    }}
                >
                    Añadir objetivo
                </Button>
            </Box>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 350,
                        bgcolor: "background.paper",
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    <PiggyGoalCard
                        {...newGoalData}
                        onUpdate={() => { }}
                        onDelete={null}
                        onSave={handleCreateGoal}
                    />
                </Box>
            </Modal>
        </Container>
    );
};

export default PiggyBank;
