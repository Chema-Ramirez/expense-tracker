import { Typography, Paper, Grid } from "@mui/material";

const PiggySummary = ({ goals }) => {
    const totalSaved = goals.reduce((sum, g) => sum + (g.currentAmount || 0), 0);
    const totalGoal = goals.reduce((sum, g) => sum + (g.suggestedAmount || 0), 0);

    return (
        <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Grid container spacing={2} textAlign="center">
                <Grid xs={6}>
                    <Typography variant="subtitle2">Ahorro real</Typography>
                    <Typography variant="h6" fontWeight={700}>{totalSaved} €</Typography>
                </Grid>
                <Grid xs={6}>
                    <Typography variant="subtitle2">Objetivo mensual</Typography>
                    <Typography variant="h6" fontWeight={700}>{totalGoal} €</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PiggySummary;
