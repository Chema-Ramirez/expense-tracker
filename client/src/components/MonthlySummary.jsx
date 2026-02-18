import { Box, Typography, Paper, Divider, Stack } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const MonthlySummary = ({ expenses = [] }) => {
    const sueldo = expenses
        .filter((exp) => exp.category === "Sueldo")
        .reduce((sum, exp) => sum + exp.amount, 0);

    const gastos = expenses
        .filter((exp) => exp.category !== "Sueldo")
        .reduce((sum, exp) => sum + exp.amount, 0);

    const ahorro = sueldo - gastos;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 5,
                background: "linear-gradient(135deg, #1FBF9F 0%, #148F76 100%)",
                color: "#fff",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* FONDO */}
            <AccountBalanceWalletIcon
                sx={{
                    position: "absolute",
                    right: -20,
                    top: -20,
                    fontSize: 140,
                    opacity: 0.1
                }}
            />

            <Typography variant="overline" sx={{ opacity: 0.8, fontWeight: 700 }}>
                Balance Mensual
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
                {ahorro.toFixed(2)} €
            </Typography>

            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />

            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <TrendingUpIcon sx={{ fontSize: 18, color: "#d8c72c" }} />
                        <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600 }}>
                            Ingresos
                        </Typography>
                    </Stack>
                    <Typography variant="h6" fontWeight={700}>
                        {sueldo.toFixed(2)} €
                    </Typography>
                </Box>

                <Box textAlign="right">
                    <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="flex-end">
                        <TrendingDownIcon sx={{ fontSize: 18, color: "#ff8a80" }} />
                        <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600 }}>
                            Gastos
                        </Typography>
                    </Stack>
                    <Typography variant="h6" fontWeight={700}>
                        {gastos.toFixed(2)} €
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );
};

export default MonthlySummary;