import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Typography, useTheme } from "@mui/material";

const ExpensePieChart = ({ expenses = [] }) => {
    const theme = useTheme();

    // CATEGORIAS
    const chartData = expenses
        .filter(exp => exp.category !== "Sueldo")
        .reduce((acc, curr) => {
            const found = acc.find(item => item.name === curr.category);
            if (found) {
                found.value += curr.amount;
            } else {
                acc.push({ name: curr.category, value: curr.amount });
            }
            return acc;
        }, []);

    // COLORES
    const COLORS = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.error.light,
        theme.palette.warning.main,
        theme.palette.info.main,
        "#8884d8",
        "#82ca9d"
    ];

    if (chartData.length === 0) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="body2" color="text.secondary">
                    Aún no hay gastos para mostrar el gráfico
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', height: 300, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: theme.shadows[3],
                            backgroundColor: theme.palette.background.paper
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span style={{ color: theme.palette.text.primary, fontSize: '12px', fontWeight: 500 }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* TEXTO CENTRAL */}
            <Box sx={{
                position: 'absolute',
                top: '43%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
            }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>GASTOS</Typography>
            </Box>
        </Box>
    );
};

export default ExpensePieChart;