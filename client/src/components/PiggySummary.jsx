import { Typography, Paper, Stack, Box, LinearProgress, useTheme } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import FlagIcon from '@mui/icons-material/Flag';

const PiggySummary = ({ goals = [] }) => {
    const theme = useTheme();

    const totalSaved = goals.reduce((sum, g) => sum + (Number(g.currentAmount) || 0), 0);
    const totalGoal = goals.reduce((sum, g) => sum + (Number(g.targetAmount) || 0), 0);
    const progress = totalGoal > 0 ? (totalSaved / totalGoal) * 100 : 0;

    const formatMoney = (amount) => {
        const numericAmount = Number(amount) || 0;

        return new Intl.NumberFormat('de-DE', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numericAmount) + " €";
    };

    return (
        <Paper elevation={0} sx={{
            p: 3, borderRadius: 4, position: 'relative', overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white', boxShadow: '0 20px 40px -10px rgba(31, 191, 159, 0.4)',
        }}>
            <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                <Stack direction="row" spacing={1}>
                    <Box sx={{ flex: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={0.8} mb={0.5} sx={{ opacity: 0.85 }}>
                            <SavingsIcon sx={{ fontSize: 14 }} />
                            <Typography variant="caption" fontWeight={700}>AHORRO ACTUAL</Typography>
                        </Stack>
                        <Typography variant="h5" fontWeight={900}>{formatMoney(totalSaved)}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'right' }}>
                        <Stack direction="row" alignItems="center" spacing={0.8} mb={0.5} justifyContent="flex-end" sx={{ opacity: 0.85 }}>
                            <FlagIcon sx={{ fontSize: 14 }} />
                            <Typography variant="caption" fontWeight={700}>META FINAL</Typography>
                        </Stack>
                        <Typography variant="h5" fontWeight={900}>{formatMoney(totalGoal)}</Typography>
                    </Box>
                </Stack>

                <Box>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                        <Typography variant="caption" sx={{ fontWeight: 800 }}>PROGRESO GENERAL</Typography>
                        <Typography variant="subtitle2" fontWeight={900}>{progress.toFixed(0)}%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={Math.min(progress, 100)} sx={{
                        height: 10, borderRadius: 5, bgcolor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': { bgcolor: 'white', borderRadius: 5 }
                    }} />
                </Box>
            </Stack>
        </Paper>
    );
};

export default PiggySummary;