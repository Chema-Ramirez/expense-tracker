import { List, Typography } from "@mui/material";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    if (!expenses.length) return <Typography variant="body1" align="center" sx={{ mt: 2 }}>No hay gastos registrados</Typography>;
    return (
        <List sx={{ width: "100%", maxWidth: 500, mx: "auto", p: 0 }}>
            {expenses.map((expense) => <ExpenseItem key={expense._id} expense={expense} onEdit={onEdit} onDelete={onDelete} />)}
        </List>
    );
};

export default ExpenseList;
