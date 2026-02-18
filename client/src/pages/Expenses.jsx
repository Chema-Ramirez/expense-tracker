import {
    Container, Typography, Box, Paper, List, ListItem,
    ListItemText, IconButton, Stack, Avatar, Chip,
    useTheme, Fade
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

// HOOKS
import { useExpenses } from "../hooks/useExpenses";

const Expenses = () => {
    const theme = useTheme();
    const { expenses, deleteExpense, loading } = useExpenses();

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este gasto?")) {
            await deleteExpense(id);
        }
    };

    const handleEdit = (expense) => {
        console.log("Editar gasto:", expense);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
            {/* HEADER */}
            <Box mb={4}>
                <Typography variant="h4" fontWeight={900} gutterBottom>
                    Mis Gastos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Historial detallado de tus movimientos recientes
                </Typography>
            </Box>

            {/* LISTA DE GASTOS */}
            <List sx={{ p: 0 }}>
                {expenses.length === 0 && !loading ? (
                    <Typography textAlign="center" py={10} color="text.secondary">
                        No hay gastos registrados aún. 🐷
                    </Typography>
                ) : (
                    expenses.map((expense, index) => (
                        <Fade in={true} timeout={300 + index * 100} key={expense.id || index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    mb: 2,
                                    p: 1,
                                    borderRadius: 4,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    transition: "0.2s",
                                    '&:hover': {
                                        borderColor: "primary.main",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                                    }
                                }}
                            >
                                <ListItem
                                    secondaryAction={
                                        <Stack direction="row" spacing={0.5}>
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                onClick={() => handleEdit(expense)}
                                                sx={{ color: "text.secondary" }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleDelete(expense.id)}
                                                sx={{ color: theme.palette.error.main }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: theme.palette.mode === 'light' ? 'primary.light' : 'rgba(31,191,159,0.2)',
                                                color: 'primary.main',
                                                width: 48,
                                                height: 48
                                            }}
                                        >
                                            <ReceiptLongIcon />
                                        </Avatar>

                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" fontWeight={700}>
                                                    {expense.description}
                                                </Typography>
                                            }
                                            secondary={
                                                <Stack direction="row" spacing={1} mt={0.5} alignItems="center">
                                                    <Chip
                                                        label={expense.category}
                                                        size="small"
                                                        sx={{ fontSize: '0.7rem', height: 20 }}
                                                    />
                                                    <Typography variant="caption">
                                                        {new Date(expense.date).toLocaleDateString()}
                                                    </Typography>
                                                </Stack>
                                            }
                                        />

                                        <Typography
                                            variant="body1"
                                            fontWeight={900}
                                            color="error.main"
                                            sx={{ mr: 2 }}
                                        >
                                            -{expense.amount}€
                                        </Typography>
                                    </Stack>
                                </ListItem>
                            </Paper>
                        </Fade>
                    ))
                )}
            </List>
        </Container>
    );
};

export default Expenses;