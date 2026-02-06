import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Paper, Modal } from "@mui/material";

import PiggyGoalCard from "../components/PiggyGoalCard";
import PiggySummary from "../components/PiggySummary";
import PiggyGoalForm from "../components/PiggyGoalForm";

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

    // FETCH
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

    useEffect(() => {
        fetchGoals();
    }, []);

    // CREATE
    const handleCreateGoal = async (goalData) => {
        try {
            await createSavingsGoal(goalData);
            fetchGoals();
        } catch (error) {
            alert(error.message);
        }
    };

    // UPDATE
    const handleUpdateGoal = async (id, updatedData) => {
        try {
            await updateSavingsGoal(id, updatedData);
            fetchGoals();
        } catch (error) {
            alert(error.message);
        }
    };

    // DELETE 
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
            {/* HEADER */}
            <Box mb={3} textAlign="center">
                <Typography variant="h4" fontWeight={700}>
                    🐷 Hucha
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tus objetivos de ahorro
                </Typography>
            </Box>

            {/* SUMMARY */}
            <PiggySummary goals={goals} />

            {/* GOALS */}
            <Box mt={3} display="flex" flexDirection="column" gap={2}>
                {loading ? (
                    <Typography textAlign="center">Cargando objetivos...</Typography>
                ) : goals.length === 0 ? (
                    <Typography textAlign="center" color="text.secondary">
                        No hay objetivos todavía.
                    </Typography>
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

            {/* AÑADIR OBJETIVO */}
            <Box mt={4}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 3 }}
                    onClick={() => setModalOpen(true)}
                >
                    Añadir objetivo
                </Button>
            </Box>

            {/* MODAL FORM */}
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
                    <PiggyGoalForm
                        onClose={() => setModalOpen(false)}
                        onSave={handleCreateGoal}
                    />
                </Box>
            </Modal>
        </Container>
    );
};

export default PiggyBank;
