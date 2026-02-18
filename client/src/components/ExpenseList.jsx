import { List, Typography, Paper, Box } from "@mui/material";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    if (!expenses.length) {
        return (
            <Box textAlign="center" py={5}>
                <Typography variant="body1" color="text.secondary">
                    No hay movimientos registrados
                </Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
            <List sx={{ p: 0 }}>
                {expenses
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((expense) => (
                        <ExpenseItem
                            key={expense._id}
                            expense={expense}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
            </List>
        </Paper>
    );
};

export default ExpenseList;