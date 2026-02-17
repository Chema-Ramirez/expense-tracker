import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#1FBF9F", "#d8c72c", "#3BBF9B", "#f4d35e", "#72d6c9", "#ffb400", "#8fd694"];

const ExpensePieChart = ({ expenses, categories }) => {
    const data = categories
        .map((cat) => ({ name: cat, value: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0) }))
        .filter(item => item.value > 0);

    if (!data.length) return <Typography textAlign="center">No hay gastos para mostrar</Typography>;

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ExpensePieChart;
