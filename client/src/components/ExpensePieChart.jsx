import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Box, Typography, Stack } from '@mui/material';
import { getCategoryConfig, CATEGORIES } from "../utils/categoryHelpers";

const CustomLegend = (props) => {
    const { payload } = props;
    if (!payload) return null;

    return (
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2} mt={3} sx={{ px: 2 }}>
            {payload.map((entry, index) => (
                <Stack key={`item-${index}`} direction="row" alignItems="center" spacing={0.6}>
                    <Box sx={{
                        color: entry.payload.color,
                        display: "flex",
                        fontSize: "1.1rem"
                    }}>
                        {entry.payload.icon}
                    </Box>
                    <Typography variant="caption" fontWeight={800} color="text.secondary">
                        {entry.value}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    );
};

const ExpensePieChart = ({ expenses }) => {
    const validExpenseIds = CATEGORIES.map(cat => cat.id.toLowerCase());

    const onlyExpenses = expenses.filter(item => {
        const catId = item.category?.toLowerCase().trim() || '';
        return validExpenseIds.includes(catId) &&
            catId !== 'ingreso' &&
            catId !== 'nomina' &&
            catId !== 'ingresos';
    });

    const dataObj = onlyExpenses.reduce((acc, curr) => {
        const catKey = curr.category?.toLowerCase().trim() || 'otros';
        const val = Math.abs(Number(curr.amount)) || 0;
        acc[catKey] = (acc[catKey] || 0) + val;
        return acc;
    }, {});

    const data = Object.keys(dataObj).map(key => {
        const config = getCategoryConfig(key);
        return {
            name: config.label,
            value: dataObj[key],
            color: config.color,
            icon: config.icon
        };
    });

    if (data.length === 0) {
        return (
            <Box sx={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.disabled" fontWeight={600}>
                    No hay gastos para mostrar
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', height: 320, mt: 1 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={6}
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                style={{ outline: 'none' }}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name, props) => {
                            const finalName = name === 'value' ? props.payload.name : name;
                            return [`${value.toLocaleString('es-ES')} €`, finalName];
                        }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                    />
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ExpensePieChart;