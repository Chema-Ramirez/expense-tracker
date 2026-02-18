import { Typography, Paper, Stack, Box, Divider } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import TargetIcon from '@mui/icons-material/Flag';

const PiggySummary = ({ goals = [] }) => {
    const totalSaved = goals.reduce((sum, g) => sum + (g.saved || 0), 0);
    const totalGoal = goals.reduce((sum, g) => sum + (g.target || 0), 0);

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
                        <SavingsIcon color="primary" fontSize="small" />
                        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                            Ahorro Real
                        </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={800}>{totalSaved.toFixed(2)} €</Typography>
                </Box>

                <Box sx={{ flex: 1, textAlign: "center" }}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
                        <TargetIcon color="secondary" fontSize="small" />
                        <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                            Meta Total
                        </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={800}>{totalGoal.toFixed(2)} €</Typography>
                </Box>
            </Stack>
        </Paper>
    );
};

export default PiggySummary;