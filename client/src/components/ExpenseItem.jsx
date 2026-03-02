import { ListItem, ListItemText, Typography, IconButton, Stack, Box, ListItemAvatar, Avatar } from "@mui/material";
import { getCategoryConfig } from "../utils/categoryHelpers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseItem = ({ expense, onEdit, onDelete, showActions = false }) => {
    const { icon, color } = getCategoryConfig(expense.category);

    const isIngreso = expense.category === "Sueldo";

    return (
        <ListItem
            sx={{
                px: showActions ? 2 : 0,
                py: 1.5,
                borderBottom: showActions ? "1px solid" : "none",
                borderColor: "divider",
                "&:last-child": { borderBottom: "none" },
            }}
            secondaryAction={
                showActions && (
                    <Stack direction="row" spacing={0.5}>
                        <IconButton edge="end" size="small" onClick={() => onEdit?.(expense)}>
                            <EditIcon fontSize="small" sx={{ color: "text.secondary" }} />
                        </IconButton>
                        <IconButton edge="end" size="small" onClick={() => onDelete?.(expense._id)}>
                            <DeleteIcon fontSize="small" sx={{ color: "error.light" }} />
                        </IconButton>
                    </Stack>
                )
            }
        >
            {/* FECHA ESTILO CALENDARIO */}
            <Box sx={{ mr: 2, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 40 }}>
                <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ lineHeight: 1 }}>
                    {new Date(expense.date).getDate()}
                </Typography>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontSize: '0.6rem', fontWeight: 700, opacity: 0.7 }}>
                    {new Date(expense.date).toLocaleString('es-ES', { month: 'short' }).replace('.', '')}
                </Typography>
            </Box>

            {/* AVATAR DINÁMICO */}
            {!showActions && (
                <ListItemAvatar sx={{ minWidth: 45 }}>
                    <Avatar sx={{
                        width: 38,
                        height: 38,
                        bgcolor: `${color}20`,
                        color: color,
                        border: `1px solid ${color}40`,
                    }}>
                        {icon}
                    </Avatar>
                </ListItemAvatar>
            )}

            <ListItemText
                primary={
                    <Typography variant="body2" fontWeight={700}>
                        {expense.description || expense.category}
                    </Typography>
                }
                secondary={expense.description ? (
                    <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                        {expense.category}
                    </Typography>
                ) : null}
            />

            <Typography
                variant="body2"
                fontWeight={900}
                sx={{
                    mr: showActions ? 2 : 0,
                    color: isIngreso ? "primary.main" : "text.primary"
                }}
            >
                {isIngreso ? "+" : "-"}{Number(expense.amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
            </Typography>
        </ListItem>
    );
};

export default ExpenseItem;