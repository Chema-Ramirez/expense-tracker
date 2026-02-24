import { Grid, Paper, Typography, Stack, Box } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const MonthlySummary = ({ expenses = [] }) => {
    const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    const estimatedIncome = 2500;

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <TrendingDownIcon sx={{ color: 'error.main', fontSize: 20 }} />
                        <Typography variant="caption" fontWeight={800} color="text.secondary">GASTADO</Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={900}>{totalSpent.toLocaleString()}€</Typography>
                </Paper>
            </Grid>

            <Grid item xs={6}>
                <Paper elevation={0} sx={{
                    p: 2,
                    borderRadius: 4,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText'
                }}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <AccountBalanceIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                        <Typography variant="caption" fontWeight={800} sx={{ opacity: 0.8 }}>BALANCE</Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={900}>
                        {(estimatedIncome - totalSpent).toLocaleString()}€
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MonthlySummary;