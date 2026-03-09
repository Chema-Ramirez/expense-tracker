import { useState, useMemo } from "react";
import {
    Container, Typography, Box, Fade,
    Snackbar, Alert, Skeleton, Stack, useTheme, Avatar, Button
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

// COMPONENTES
import ModalWrapper from "../components/ModalWrapper";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseList from "../components/ExpenseList";

// HOOKS
import { useExpenses } from "../hooks/useExpenses";

const Expenses = () => {
    const theme = useTheme();
    const { expenses, deleteExpense, updateExpense, loading } = useExpenses();

    // ESTADOS
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const [filter, setFilter] = useState({ category: "", month: "" });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    // FILTRADO
    const filteredExpenses = useMemo(() => {
        return expenses
            .filter(exp => {
                const expCat = exp.category?.toLowerCase().trim() || "";
                const filCat = filter.category?.toLowerCase().trim() || "";
                const matchesCategory = !filter.category || expCat === filCat;
                const expMonth = new Date(exp.date).getMonth().toString();
                const matchesMonth = !filter.month || expMonth === filter.month;

                return matchesCategory && matchesMonth;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [expenses, filter]);

    // EDIT
    const handleEditClick = (expense) => {
        setSelectedExpense(expense);
        setIsEditModalOpen(true);
    };

    // UPDATE
    const handleUpdateSubmit = async (data) => {
        try {
            const id = selectedExpense._id || selectedExpense.id;
            await updateExpense(id, data);
            setIsEditModalOpen(false);
            setSelectedExpense(null);
            setSnackbar({
                open: true,
                message: "¡Actualizado con éxito!",
                severity: "success"
            });
        } catch (err) {
            console.error("Error al actualizar:", err);
            setSnackbar({
                open: true,
                message: "No se pudo actualizar el gasto",
                severity: "error"
            });
        }
    };

    // DELETE
    const handleConfirmDelete = (id) => {
        setExpenseToDelete(id);
    };

    const handleDeleteExecute = async () => {
        if (!expenseToDelete) return;
        try {
            await deleteExpense(expenseToDelete);
            setSnackbar({
                open: true,
                message: "Movimiento eliminado correctamente",
                severity: "success"
            });
            setExpenseToDelete(null);
        } catch (err) {
            console.error("Error al borrar:", err);
            setSnackbar({
                open: true,
                message: "Error al eliminar el movimiento",
                severity: "error"
            });
        }
    };


    return (
        <Container maxWidth="sm" sx={{ py: 2, pb: 2 }}>
            {/* HEADER */}
            <Box mb={3}>
                <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: 32 }} />
                    <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -1.5 }}>
                        Movimientos
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    Gestiona y filtra tu historial financiero
                </Typography>
            </Box>

            {/* FILTROS */}
            <ExpenseFilters filter={filter} setFilter={setFilter} />

            {/* LISTA DE GASTOS */}
            <Box sx={{ mt: 2 }}>
                {loading ? (
                    [1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} variant="rounded" height={80} sx={{ mb: 2, borderRadius: 5 }} />
                    ))
                ) : filteredExpenses.length === 0 ? (
                    <Fade in={true}>
                        <Box textAlign="center" py={8} sx={{ opacity: 0.6 }}>
                            <InboxIcon sx={{ fontSize: 60, mb: 2, color: 'divider' }} />
                            <Typography variant="h6" fontWeight={700} color="text.secondary">
                                No hay resultados
                            </Typography>
                            <Typography variant="body2" color="text.disabled">
                                Prueba a cambiar los filtros de búsqueda
                            </Typography>
                        </Box>
                    </Fade>
                ) : (
                    <ExpenseList
                        expenses={filteredExpenses}
                        onEdit={handleEditClick}
                        onDelete={handleConfirmDelete}
                    />
                )}
            </Box>

            {/* MODAL */}
            <ModalWrapper open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Editar Movimiento">
                {selectedExpense && (
                    <ExpenseForm
                        initialData={selectedExpense}
                        onSubmit={handleUpdateSubmit}
                    />
                )}
            </ModalWrapper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{ bottom: { xs: 90, sm: 20 } }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ borderRadius: 3, fontWeight: 700 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* MODAL DE CONFIRMACIÓN DE BORRADO */}
            <ModalWrapper
                open={Boolean(expenseToDelete)}
                onClose={() => setExpenseToDelete(null)}
                title="¿Eliminar Gasto?"
            >
                <Box sx={{ p: 1, textAlign: 'center' }}>
                    <Avatar
                        sx={{
                            mx: 'auto', mb: 2,
                            bgcolor: `${theme.palette.error.main}15`,
                            color: 'error.main', width: 60, height: 60
                        }}
                    >
                        <WarningAmberRoundedIcon sx={{ fontSize: 35 }} />
                    </Avatar>

                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Esta acción no se puede deshacer. El Gasto desaparecerá de tu historial permanentemente.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setExpenseToDelete(null)}
                            sx={{ borderRadius: 3, py: 1.5, fontWeight: 800, textTransform: 'none' }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={handleDeleteExecute}
                            sx={{
                                borderRadius: 3, py: 1.5, fontWeight: 800, textTransform: 'none',
                                boxShadow: `0 8px 20px ${theme.palette.error.main}40`
                            }}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </Box>
            </ModalWrapper>
        </Container>
    );
};

export default Expenses;