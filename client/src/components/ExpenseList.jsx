import { Typography, Box, Stack } from "@mui/material";
import ExpenseItem from "./ExpenseItem";
import { format, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {

    if (!expenses.length) {
        return (
            <Box sx={{ p: 4, borderRadius: 5, border: '2px dashed', borderColor: 'divider', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    No hay movimientos registrados
                </Typography>
            </Box>
        );
    }

    const groupedExpenses = expenses.reduce((groups, expense) => {
        const date = format(new Date(expense.date), 'yyyy-MM-dd');
        if (!groups[date]) groups[date] = [];
        groups[date].push(expense);
        return groups;
    }, {});

    const getDateHeader = (dateStr) => {
        const date = new Date(dateStr);
        if (isToday(date)) return "Hoy";
        if (isYesterday(date)) return "Ayer";
        return format(date, "EEEE, d 'de' MMMM", { locale: es });
    };

    return (
        <Stack spacing={3}>
            {Object.keys(groupedExpenses).sort((a, b) => b.localeCompare(a)).map((date) => (
                <Box key={date}>
                    {/* HEADER */}
                    <Typography
                        variant="caption"
                        fontWeight={900}
                        color="text.disabled"
                        sx={{ px: 1, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}
                    >
                        {getDateHeader(date)}
                    </Typography>

                    {/* LISTA DE ITEMS */}
                    <Stack spacing={1.5}>
                        {groupedExpenses[date].map((expense) => (
                            <ExpenseItem
                                key={expense._id || expense.id}
                                expense={expense}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

export default ExpenseList;