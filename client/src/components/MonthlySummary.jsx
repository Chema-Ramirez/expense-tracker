import { Box, Typography } from "@mui/material";

const MonthlySummary = ({ expenses = [] }) => {
    // Separar el sueldo del resto de gastos
    const sueldoEntry = expenses.find((exp) => exp.category === "Sueldo");
    const sueldo = sueldoEntry?.amount || 0;

    const gastos = expenses
        .filter((exp) => exp.category !== "Sueldo")
        .reduce((sum, exp) => sum + exp.amount, 0);

    const ahorro = sueldo - gastos;

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{
                p: 2,
                background: "#f5f5f5",
                borderRadius: 2,
                textAlign: "center",
            }}
        >
            <Typography variant="body1">
                Sueldo: <strong>{sueldo.toFixed(2)} €</strong>
            </Typography>
            <Typography variant="body1">
                Gastos: <strong>{gastos.toFixed(2)} €</strong>
            </Typography>
            <Typography variant="body1" color={ahorro < 0 ? "error.main" : "success.main"}>
                Ahorro mensual: <strong>{ahorro.toFixed(2)} €</strong>
            </Typography>
        </Box>
    );
};

export default MonthlySummary;
