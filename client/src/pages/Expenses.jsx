import { useState, useMemo } from "react";
import {
    Container, Typography, Box, Fade,
    Snackbar, Alert, Skeleton
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';

// COMPONENTES
import ModalWrapper from "../components/ModalWrapper";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseList from "../components/ExpenseList";

// HOOKS
import { useExpenses } from "../hooks/useExpenses";

const Expenses = () => {
    const { expenses, deleteExpense, updateExpense, loading } = useExpenses();

    // ESTADOS
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [filter, setFilter] = useState({ category: "", month: "" });
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    // FILTRADO
    const filteredExpenses = useMemo(() => {
        return expenses
            .filter(exp => {
                const noCategoryFilter = !filter.category || filter.category.length === 0;
                const matchesCategory = noCategoryFilter || filter.category.includes(exp.category?.toLowerCase());
                const matchesMonth = !filter.month || new Date(exp.date).getMonth().toString() === filter.month;
                return matchesCategory && matchesMonth;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [expenses, filter]);

    // HANDLERS
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este movimiento?")) {
            try {
                await deleteExpense(id);
                setSnackbar({ open: true, message: "Movimiento eliminado correctamente" });
            } catch (err) {
                console.error("Error al borrar:", err);
            }
        }
    };

    const handleEditClick = (expense) => {
        setSelectedExpense(expense);
        setIsEditModalOpen(true);
    };

    const handleUpdateSubmit = async (data) => {
        try {
            await updateExpense(selectedExpense._id || selectedExpense.id, data);
            setIsEditModalOpen(false);
            setSelectedExpense(null);
            setSnackbar({ open: true, message: "¡Actualizado con éxito! 🐷" });
        } catch (err) {
            console.error("Error al actualizar:", err);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 2, pb: 12 }}>
            {/* HEADER */}
            <Box mb={3}>
                <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -1.5 }}>
                    Movimientos
                </Typography>
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
                        onDelete={handleDelete}
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
                <Alert severity="success" variant="filled" sx={{ borderRadius: 3, fontWeight: 700 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Expenses;