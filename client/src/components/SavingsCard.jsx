import { useState } from "react";
import { Box, Typography, LinearProgress, Paper, Stack, TextField, Button, InputAdornment, Avatar } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSavingsGoals } from "../hooks/useSavingsGoals";
import { getCategoryConfig } from "../utils/categoryHelpers";

const SavingsCard = ({ goal }) => {
    const { addMoneyToGoal } = useSavingsGoals();
    const [amount, setAmount] = useState("");

    const config = getCategoryConfig(goal.category);
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
                p: 2.5,
                borderRadius: 5,
                mb: 2,
                border: "2px solid",
                borderColor: `${config.color}20`,
                transition: "0.3s",
                '&:hover': {
                    borderColor: config.color,
                    boxShadow: `0 12px 24px ${config.color}15`,
                    transform: 'translateY(-2px)'
                }
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ bgcolor: `${config.color}15`, color: config.color, borderRadius: 3, width: 40, height: 40 }}>
                    {config.icon}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={900} sx={{ lineHeight: 1.2 }}>
                        {goal.title || goal.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
                        {config.label}
                    </Typography>
                </Box>
                <Typography variant="caption" fontWeight={900} color={config.color} sx={{ fontSize: '0.9rem' }}>
                    {Math.round(progress)}%
                </Typography>
            </Stack>

            <Box sx={{ mb: 2 }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 8,
                        borderRadius: 5,
                        bgcolor: `${config.color}10`,
                        '& .MuiLinearProgress-bar': {
                            bgcolor: config.color,
                            borderRadius: 5
                        }
                    }}
                />
                <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                        {goal.currentAmount.toLocaleString()}€ ahorrados
                    </Typography>
                    <Typography variant="caption" fontWeight={600} color="text.primary">
                        objetivo: {goal.targetAmount.toLocaleString()}€
                    </Typography>
                </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
                <TextField
                    size="small"
                    type="number"
                    placeholder="Cantidad..."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                    sx={{
                        flexGrow: 1,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            bgcolor: 'action.hover'
                        }
                    }}
                />
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleAhorrar}
                    startIcon={<AddCircleIcon />}
                    sx={{
                        bgcolor: config.color,
                        color: '#fff',
                        borderRadius: 3,
                        fontWeight: 800,
                        textTransform: 'none',
                        px: 3,
                        '&:hover': {
                            bgcolor: config.color,
                            filter: 'brightness(0.9)'
                        }
                    }}
                >
                    Ahorrar
                </Button>
            </Stack>
        </Paper>
    );
};

export default SavingsCard;