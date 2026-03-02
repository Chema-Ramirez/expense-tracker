import { useState } from "react";
import {
    Container, Typography, Box, Paper, List, ListItem,
    ListItemText, IconButton, Stack, Avatar, Chip,
    useTheme, Fade, Snackbar, Alert, Collapse, Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// COMPONENTES
import ModalWrapper from "../components/ModalWrapper";
import ExpenseForm from "../components/ExpenseForm";

// HOOKS & UTILS
import { useExpenses } from "../hooks/useExpenses";
import { getCategoryConfig } from "../utils/categoryHelpers";

const Expenses = () => {
    const theme = useTheme();
    const { expenses, deleteExpense, updateExpense, loading } = useExpenses();

    // ESTADOS
    const [expandedId, setExpandedId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    // HANDLERS
    const handleExpandClick = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Evita que se cierre/abra el acordeón al pulsar borrar
        if (window.confirm("¿Estás seguro de que quieres eliminar este gasto?")) {
            await deleteExpense(id);
            setSnackbar({ open: true, message: "Gasto eliminado correctamente" });
        }
    };

    const handleEditClick = (e, expense) => {
        e.stopPropagation();
        setSelectedExpense(expense);
        setIsEditModalOpen(true);
    };

    const handleUpdateSubmit = async (data) => {
        try {
            await updateExpense(selectedExpense._id || selectedExpense.id, data);
            setIsEditModalOpen(false);
            setSelectedExpense(null);
            setSnackbar({ open: true, message: "¡Gasto actualizado con éxito! 🐷" });
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
            {/* HEADER */}
            <Box mb={4}>
                <Typography variant="h4" fontWeight={900} gutterBottom sx={{ letterSpacing: -1 }}>
                    Mis Gastos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Historial detallado. Toca un gasto para ver más detalles.
                </Typography>
            </Box>

            {/* LISTA DE GASTOS */}
            <List sx={{ p: 0 }}>
                {sortedExpenses.length === 0 && !loading ? (
                    <Box textAlign="center" py={10}>
                        <Typography color="text.secondary">No hay gastos registrados aún. 🐷</Typography>
                    </Box>
                ) : (
                    sortedExpenses.map((expense, index) => {
                        const categoryName = expense.category?.toLowerCase().trim() || "";
                        const config = getCategoryConfig(categoryName);
                        const isSueldo = categoryName === 'sueldo' || categoryName === 'ingreso';
                        const isExpanded = expandedId === (expense._id || expense.id);

                        return (
                            <Fade in={true} timeout={300 + (index % 10) * 50} key={expense._id || expense.id || index}>
                                <Paper
                                    elevation={0}
                                    onClick={() => handleExpandClick(expense._id || expense.id)}
                                    sx={{
                                        mb: 2, borderRadius: 5, border: "1px solid",
                                        borderColor: isExpanded ? config.color : "divider",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        bgcolor: isExpanded
                                            ? (theme.palette.mode === 'light' ? `${config.color}05` : `${config.color}15`)
                                            : 'background.paper',
                                        '&:hover': { borderColor: config.color }
                                    }}
                                >
                                    <ListItem disablePadding sx={{ px: 2, py: 1.5 }}>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>

                                            {/* ICONO */}
                                            <Avatar sx={{
                                                bgcolor: `${config.color}15`,
                                                color: config.color,
                                                width: 44, height: 44, borderRadius: 3,
                                                flexShrink: 0
                                            }}>
                                                {config.icon}
                                            </Avatar>

                                            {/* TEXTO PRINCIPAL */}
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight={700}
                                                    noWrap={!isExpanded}
                                                    sx={{ transition: 'all 0.3s' }}
                                                >
                                                    {expense.description}
                                                </Typography>
                                                {!isExpanded && (
                                                    <Typography variant="caption" color="text.disabled">
                                                        {new Date(expense.date).toLocaleDateString()}
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* CANTIDAD */}
                                            <Typography
                                                variant="body1"
                                                fontWeight={900}
                                                color={isSueldo ? "success.main" : "error.main"}
                                                sx={{ whiteSpace: "nowrap", flexShrink: 0, ml: 1 }}
                                            >
                                                {isSueldo ? "+" : "-"} {Number(expense.amount).toLocaleString('es-ES')}€
                                            </Typography>

                                            <ExpandMoreIcon
                                                sx={{
                                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    transition: '0.3s',
                                                    color: 'text.disabled',
                                                    fontSize: '1.2rem'
                                                }}
                                            />
                                        </Stack>
                                    </ListItem>

                                    {/* DETALLES EXPANDIBLES */}
                                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                        <Divider sx={{ mx: 2, opacity: 0.5 }} />
                                        <Box sx={{ p: 2, bgcolor: `${config.color}08` }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" fontWeight={700}>
                                                        CATEGORÍA Y FECHA
                                                    </Typography>
                                                    <Stack direction="row" spacing={1} mt={0.5} mb={1}>
                                                        <Chip
                                                            label={expense.category}
                                                            size="small"
                                                            sx={{ bgcolor: config.color, color: '#fff', fontWeight: 800 }}
                                                        />
                                                    </Stack>
                                                    <Typography variant="body2" color="text.primary">
                                                        📅 {new Date(expense.date).toLocaleDateString('es-ES', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </Typography>
                                                </Box>

                                                {/* ACCIONES */}
                                                <Stack direction="row" spacing={1}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => handleEditClick(e, expense)}
                                                        sx={{ bgcolor: 'background.paper', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                                    >
                                                        <EditIcon fontSize="small" color="primary" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => handleDelete(e, expense._id || expense.id)}
                                                        sx={{ bgcolor: 'background.paper', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                                    >
                                                        <DeleteIcon fontSize="small" color="error" />
                                                    </IconButton>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </Collapse>
                                </Paper>
                            </Fade>
                        );
                    })
                )}
            </List>

            {/* MODAL DE EDICIÓN */}
            <ModalWrapper
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Editar Movimiento"
            >
                {selectedExpense && (
                    <ExpenseForm
                        initialData={selectedExpense}
                        onSubmit={handleUpdateSubmit}
                        onCancel={() => setIsEditModalOpen(false)}
                    />
                )}
            </ModalWrapper>

            {/* FEEDBACK SNACKBAR */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled" sx={{ borderRadius: 3, fontWeight: 600 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Expenses;