import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme, Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses = [] }) => {
    const theme = useTheme();

    const totals = expenses.reduce((acc, curr) => {
        const cat = curr.category || 'Otros';
        acc[cat] = (acc[cat] || 0) + Number(curr.amount);
        return acc;
    }, {});

    const labels = Object.keys(totals);
    const dataValues = Object.values(totals);

    if (expenses.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="body2" color="text.secondary">No hay datos suficientes</Typography>
            </Box>
        );
    }

    const data = {
        labels,
        datasets: [{
            data: dataValues,
            backgroundColor: [
                theme.palette.primary.main,
                theme.palette.secondary.main,
                theme.palette.error.light,
                theme.palette.warning.light,
                theme.palette.info.light,
                '#A5D6A7'
            ],
            borderWidth: 2,
            borderColor: theme.palette.background.paper,
            hoverOffset: 15,
        }],
    };

    const options = {
        cutout: '75%',
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } },
        },
        maintainAspectRatio: false,
    };

    return (
        <Box sx={{ height: 280, width: '100%' }}>
            <Doughnut data={data} options={options} />
        </Box>
    );
};

export default ExpensePieChart;