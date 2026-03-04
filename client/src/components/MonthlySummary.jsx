import { Paper, Stack, Typography, Box, Divider } from "@mui/material";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SavingsIcon from '@mui/icons-material/Savings';

const MonthlySummary = ({ expenses }) => {
    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const budget = 2000;
    const remaining = budget - totalSpent;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 1.5,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: 'background.paper'
            }}
        >
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />}
                spacing={1}
            >
                {/* GASTADO */}
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <TrendingDownIcon sx={{ color: 'error.main', fontSize: 18 }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                Gastado
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={800} color="error.main" sx={{ lineHeight: 1.2 }}>
                                {totalSpent.toLocaleString()}€
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* Acumulado */}
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <SavingsIcon sx={{ color: 'success.main', fontSize: 18 }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                Acumulado
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={800} color="success.main" sx={{ lineHeight: 1.2 }}>
                                {remaining.toLocaleString()}€
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    );
};

export default MonthlySummary;