import { ListItem, ListItemText, Typography, IconButton, Stack, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
    const isIngreso = expense.category === "Sueldo";

    return (
        <ListItem
            sx={{
                px: 2,
                py: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": { borderBottom: "none" },
            }}
            secondaryAction={
                <Stack direction="row" spacing={0.5}>
                    <IconButton edge="end" size="small" onClick={() => onEdit(expense)}>
                        <EditIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <IconButton edge="end" size="small" onClick={() => onDelete(expense._id)}>
                        <DeleteIcon fontSize="small" sx={{ color: "error.light" }} />
                    </IconButton>
                </Stack>
            }
        >
            <Box sx={{ mr: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="caption" fontWeight={700} color="text.secondary">
                    {new Date(expense.date).getDate()}
                </Typography>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
                    {new Date(expense.date).toLocaleString('default', { month: 'short' })}
                </Typography>
            </Box>

            <ListItemText
                primary={
                    <Typography variant="body1" fontWeight={600}>
                        {expense.description || expense.category}
                    </Typography>
                }
                secondary={expense.description ? expense.category : null}
            />

            <Typography
                variant="body1"
                fontWeight={800}
                sx={{
                    mr: 2,
                    color: isIngreso ? "primary.main" : "text.primary"
                }}
            >
                {isIngreso ? "+" : "-"}{expense.amount.toFixed(2)} €
            </Typography>
        </ListItem>
    );
};

export default ExpenseItem;