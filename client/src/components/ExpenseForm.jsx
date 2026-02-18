import { useState } from "react";
import {
    TextField, Button, Stack, InputAdornment,
    ToggleButton, ToggleButtonGroup, Typography, Box
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CATEGORIES = [
    "Comida", "Transporte", "Ocio", "Sueldo", "Vivienda", "Salud", "Otros"
];

const ExpenseForm = ({ onSubmit, initialData = null }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
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
                        sx={{
                            flexWrap: "wrap",
                            gap: 1,
                            "& .MuiToggleButton-root": {
                                borderRadius: 2,
                                border: "1px solid !important",
                                flexGrow: 1
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
                    value={formData.description}
                    onChange={handleChange}
                />

                <TextField
                    label="Fecha"
                    name="date"
                    type="date"
                    fullWidth
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
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ py: 1.5, mt: 2 }}
                >
                    {initialData ? "Actualizar Registro" : "Añadir Registro"}
                </Button>
            </Stack>
        </form>
    );
};

export default ExpenseForm;