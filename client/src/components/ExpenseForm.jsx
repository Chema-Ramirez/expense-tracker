import { useState } from "react";
import {
    TextField, Button, Stack, InputAdornment,
    ToggleButton, ToggleButtonGroup, Typography, Box, CircularProgress
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CATEGORIES = [
    "Comida", "Transporte", "Ocio", "Sueldo", "Vivienda", "Salud", "Otros"
];

const ExpenseForm = ({ onSubmit, initialData = null }) => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(() => {
        if (initialData) {
            return {
                ...initialData,
                date: new Date(initialData.date).toISOString().split('T')[0]
            };
        }
        return {
            description: "",
            amount: "",
            category: "Otros",
            date: new Date().toISOString().split('T')[0]
        };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (event, newCategory) => {
        if (newCategory !== null) {
            setFormData(prev => ({ ...prev, category: newCategory }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        try {
            await onSubmit({
                ...formData,
                amount: Number(formData.amount)
            });

            if (!initialData) {
                setFormData({
                    description: "",
                    amount: "",
                    category: "Otros",
                    date: new Date().toISOString().split('T')[0]
                });
            }
        } catch (error) {
            console.error("Error en el formulario:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        CATEGORÍA
                    </Typography>
                    <ToggleButtonGroup
                        value={formData.category}
                        exclusive
                        onChange={handleCategoryChange}
                        fullWidth
                        size="small"
                        disabled={loading}
                        sx={{
                            flexWrap: "wrap",
                            gap: 1,
                            "& .MuiToggleButton-root": {
                                borderRadius: 2,
                                border: "1px solid !important",
                                flexGrow: 1,
                                borderColor: "divider"
                            }
                        }}
                    >
                        {CATEGORIES.map(cat => (
                            <ToggleButton key={cat} value={cat} sx={{ px: 2, py: 0.5 }}>
                                {cat}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>

                <TextField
                    label="Cantidad"
                    name="amount"
                    type="number"
                    fullWidth
                    required
                    disabled={loading}
                    value={formData.amount}
                    onChange={handleChange}
                    inputProps={{ step: "0.01" }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                />

                <TextField
                    label="Concepto / Descripción"
                    name="description"
                    placeholder="Ej: Cena con amigos"
                    fullWidth
                    disabled={loading}
                    value={formData.description}
                    onChange={handleChange}
                />

                <TextField
                    label="Fecha"
                    name="date"
                    type="date"
                    fullWidth
                    disabled={loading}
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineIcon />}
                    sx={{ py: 1.5, mt: 2, fontWeight: 'bold' }}
                >
                    {loading
                        ? "Guardando..."
                        : (initialData ? "Actualizar Registro" : "Añadir Registro")
                    }
                </Button>
            </Stack>
        </form>
    );
};

export default ExpenseForm;