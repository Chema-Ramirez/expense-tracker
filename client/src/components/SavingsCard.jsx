import { useState } from "react";
import { Box, Typography, LinearProgress, Paper, Stack, TextField, Button, InputAdornment } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useSavingsGoals } from "../hooks/useSavingsGoals";

const SavingsCard = ({ goal }) => {
    const { addMoneyToGoal } = useSavingsGoals();
    const [amount, setAmount] = useState("");

    const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

    const handleAhorrar = async () => {
        const numAmount = Number(amount);
        if (!amount || numAmount <= 0) return;

        const success = await addMoneyToGoal(goal, numAmount);
        if (success) setAmount("");
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3, borderRadius: 4, mb: 2, border: "1px solid", borderColor: "divider",
                transition: "0.3s", '&:hover': { boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }
            }}
        >
            <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                {goal.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 10, borderRadius: 5, bgcolor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': {
                                bgcolor: progress >= 100 ? '#ffb300' : '#2e7d32',
                                borderRadius: 5
                            }
                        }}
                    />
                </Box>
                <Typography variant="caption" fontWeight={700} color="text.secondary">
                    {Math.round(progress)}%
                </Typography>
            </Box>

            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="caption" color="text.secondary">
                    Ahorrado: <strong>{goal.currentAmount}€</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Meta: <strong>{goal.targetAmount}€</strong>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
                <TextField
                    size="small"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        },
                    }}
                    sx={{ flexGrow: 1 }}
                />
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleAhorrar}
                    startIcon={<AddIcon />}
                    sx={{
                        bgcolor: '#2e7d32', borderRadius: 2,
                        '&:hover': { bgcolor: '#1b5e20' }
                    }}
                >
                    Ahorrar
                </Button>
            </Stack>
        </Paper>
    );
};

export default SavingsCard;