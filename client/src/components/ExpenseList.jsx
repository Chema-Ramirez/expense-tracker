import { Typography, Box, Stack } from "@mui/material";
import ExpenseItem from "./ExpenseItem";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {

    if (!expenses || !expenses.length) {
        return (
            <Box sx={{ p: 4, borderRadius: 5, border: '2px dashed', borderColor: 'divider', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    No hay movimientos registrados
                </Typography>
            </Box>
        );
    }

    // GASTOS POR FECHA
    const groupedExpenses = expenses.reduce((groups, expense) => {
        const dateObj = typeof expense.date === 'string' ? parseISO(expense.date) : new Date(expense.date);
        const dateKey = format(dateObj, 'yyyy-MM-dd');

        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(expense);
        return groups;
    }, {});

    const getDateHeader = (dateStr) => {
        const date = parseISO(dateStr);
        if (isToday(date)) return "Hoy";
        if (isYesterday(date)) return "Ayer";

        const formatted = format(date, "EEEE, d 'de' MMMM", { locale: es });
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    return (
        <Stack spacing={4}>
            {Object.keys(groupedExpenses)
                .sort((a, b) => b.localeCompare(a))
                .map((dateKey) => (
                    <Box key={dateKey}>
                        {/* HEADER */}
                        <Typography
                            variant="caption"
                            fontWeight={900}
                            color="text.disabled"
                            sx={{
                                px: 1,
                                mb: 2,
                                display: 'block',
                                textTransform: 'uppercase',
                                letterSpacing: 1.2,
                                fontSize: '0.65rem'
                            }}
                        >
                            {getDateHeader(dateKey)}
                        </Typography>

                        {/* LISTA DE ITEMS */}
                        <Stack spacing={1.5}>
                            {groupedExpenses[dateKey].map((expense) => (
                                <ExpenseItem
                                    key={expense._id || expense.id}
                                    expense={expense}
                                    showActions={true}
                                    onEdit={() => onEdit && onEdit(expense)}
                                    onDelete={() => onDelete && onDelete(expense._id || expense.id)}
                                />
                            ))}
                        </Stack>
                    </Box>
                ))}
        </Stack>
    );
};

export default ExpenseList;