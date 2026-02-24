import { Typography, Paper, Stack, Box, Divider, LinearProgress } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import TargetIcon from '@mui/icons-material/Flag';

const PiggySummary = ({ goals = [] }) => {
    const totalSaved = goals.reduce((sum, g) => sum + (Number(g.currentAmount) || 0), 0);
    const totalGoal = goals.reduce((sum, g) => sum + (Number(g.targetAmount) || 0), 0);

    // CALCULAR PROGRESO TOTAL
    const progress = totalGoal > 0 ? (totalSaved / totalGoal) * 100 : 0;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 5,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                background: (theme) => theme.palette.mode === 'light'
                    ? 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)'
                    : 'rgba(255,255,255,0.02)'
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                mb={3}
            >
                <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
                        <SavingsIcon color="primary" sx={{ fontSize: 18 }} />
                        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ 积: 'uppercase', letterSpacing: 0.5 }}>
                            Ahorro Real
                        </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={900}>
                        {totalSaved.toLocaleString(undefined, { minimumFractionDigits: 2 })} €
                    </Typography>
                </Box>

                <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
                        <TargetIcon color="secondary" sx={{ fontSize: 18 }} />
                        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Meta Total
                        </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={900}>
                        {totalGoal.toLocaleString(undefined, { minimumFractionDigits: 2 })} €
                    </Typography>
                </Box>
            </Stack>

            {/* PROGRESO GLOBAL*/}
            <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                        Progreso General
                    </Typography>
                    <Typography variant="caption" fontWeight={900} color="primary">
                        {progress.toFixed(0)}%
                    </Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={progress > 100 ? 100 : progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 5
                        }
                    }}
                />
            </Box>
        </Paper>
    );
};

export default PiggySummary;