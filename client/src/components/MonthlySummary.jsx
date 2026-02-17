import { Box, Typography } from "@mui/material";

const MonthlySummary = ({ expenses = [] }) => {
    const sueldoEntry = expenses.find((exp) => exp.category === "Sueldo");
    const sueldo = sueldoEntry?.amount || 0;
    const gastos = expenses.filter((exp) => exp.category !== "Sueldo").reduce((sum, exp) => sum + exp.amount, 0);
    const ahorro = sueldo - gastos;

    return (
        <Box sx={{ p: 2, borderRadius: 3, textAlign: "center", background: "linear-gradient(135deg, #1FBF9F 0%, #d8c72c 100%)", color: "#fff" }}>
            <Typography variant="body1">Sueldo: <strong>{sueldo.toFixed(2)} €</strong></Typography>
            <Typography variant="body1">Gastos: <strong>{gastos.toFixed(2)} €</strong></Typography>
            <Typography variant="body1" color={ahorro < 0 ? "error.main" : "inherit"}>Ahorro mensual: <strong>{ahorro.toFixed(2)} €</strong></Typography>
        </Box>
    );
};

export default MonthlySummary;
