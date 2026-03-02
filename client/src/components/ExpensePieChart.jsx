import { Cell, PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getCategoryConfig } from '../utils/categoryHelpers';

const ExpensePieChart = ({ expenses }) => {
    const onlyExpenses = expenses.filter(e =>
        e.category?.toLowerCase() !== 'sueldo' &&
        e.category?.toLowerCase() !== 'ingreso'
    );

    const dataMap = onlyExpenses.reduce((acc, expense) => {
        const cat = expense.category || 'Otros';
        acc[cat] = (acc[cat] || 0) + Number(expense.amount);
        return acc;
    }, {});

    const chartData = Object.keys(dataMap).map(name => ({
        name,
        value: dataMap[name],
        color: getCategoryConfig(name).color
    }));

    if (chartData.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>No hay gastos para mostrar</p>
            </div>
        );
    }

    return (
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
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="transparent"
                        />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`${Number(value).toFixed(2)}€`, 'Gasto']}
                />
                <Legend iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ExpensePieChart;