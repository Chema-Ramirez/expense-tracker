import { useState } from "react";
import {
    TextField, Button, Stack, MenuItem,
    Box, Typography, InputAdornment, Avatar, Zoom
} from "@mui/material";
import { CATEGORIES, getCategoryConfig } from "../utils/categoryHelpers";

const ExpenseForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState(() => ({
        description: initialData?.description || "",
        amount: initialData?.amount ? Math.abs(initialData.amount) : "",
        category: initialData?.category || "COMIDA",
        date: initialData?.date
            ? new Date(initialData.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }));

    const currentCategoryStyle = getCategoryConfig(formData.category);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.description.trim()) return;

        onSubmit({
            ...formData,
            amount: Number(formData.amount)
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {/* CABECERA DINÁMICA */}
            <Box display="flex" flexDirection="column" alignItems="center" py={2} mb={1}>
                <Zoom key={formData.category} in={true}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: `${currentCategoryStyle.color}15`,
                            color: currentCategoryStyle.color,
                            fontSize: "2.5rem",
                            mb: 2,
                            border: `2px solid ${currentCategoryStyle.color}30`,
                            transition: 'all 0.3s ease',
                            boxShadow: `0 8px 20px ${currentCategoryStyle.color}20`
                        }}
                    >
                        {currentCategoryStyle.icon}
                    </Avatar>
                </Zoom>
                <Typography
                    variant="button"
                    fontWeight={800}
                    sx={{ color: currentCategoryStyle.color, letterSpacing: 1 }}
                >
                    {currentCategoryStyle.label}
                </Typography>
            </Box>

            <Stack spacing={3}>
                {/* CONCEPTO OBLIGATORIO */}
                <TextField
                    label="Nombre/Descripción del Gasto"
                    name="description"
                    required
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ej. Cena con amigos"
                    autoFocus
                />

                {/* SELECTOR CATEGORIA */}
                <TextField
                    select
                    label="Categoría"
                    name="category"
                    fullWidth
                    value={formData.category}
                    onChange={handleChange}
                >
                    {CATEGORIES.map((option) => {
                        const config = getCategoryConfig(option.id);
                        return (
                            <MenuItem key={option.id} value={option.id}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        sx={{
                                            width: 24, height: 24,
                                            bgcolor: `${config.color}15`,
                                            color: config.color,
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {config.icon}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight={600}>
                                        {config.label}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        );
                    })}
                </TextField>

                <Stack direction="row" spacing={0.5}>
                    <TextField
                        label="Importe"
                        name="amount"
                        type="number"
                        required
                        fullWidth
                        value={formData.amount}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Fecha"
                        name="date"
                        type="date"
                        required
                        fullWidth
                        value={formData.date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Stack>

                <Stack direction="row" spacing={2} pt={10}>
                    <Button
                        fullWidth
                        onClick={onCancel}
                        sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'none' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: 3,
                            py: 1.5,
                            fontWeight: 800,
                            textTransform: 'none',
                            boxShadow: `0 8px 16px ${currentCategoryStyle.color}40`,
                            bgcolor: currentCategoryStyle.color,
                            '&:hover': {
                                bgcolor: currentCategoryStyle.color,
                                filter: 'brightness(0.9)'
                            }
                        }}
                    >
                        {initialData ? "Actualizar" : "Añadir Movimiento"}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ExpenseForm;