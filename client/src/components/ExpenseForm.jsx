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
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 0,
                pt: 4, // Despega el contenido del borde superior del móvil
                px: 1  // Un poco de aire a los lados
            }}
        >
            {/* CABECERA DINÁMICA - Muy compacta */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Zoom key={formData.category} in={true}>
                    <Avatar
                        sx={{
                            width: 45, // Reducido para ahorrar espacio vital
                            height: 45,
                            bgcolor: `${currentCategoryStyle.color}15`,
                            color: currentCategoryStyle.color,
                            fontSize: "1.2rem",
                            mb: 0.5,
                            border: `1px solid ${currentCategoryStyle.color}30`,
                        }}
                    >
                        {currentCategoryStyle.icon}
                    </Avatar>
                </Zoom>
                <Typography
                    variant="caption"
                    fontWeight={800}
                    sx={{ color: currentCategoryStyle.color, letterSpacing: 0.5, fontSize: '0.65rem' }}
                >
                    {currentCategoryStyle.label}
                </Typography>
            </Box>

            <Stack spacing={1.8}> {/* Spacing reducido para que todo suba */}
                <TextField
                    label="Descripción"
                    name="description"
                    required
                    fullWidth
                    size="small"
                    value={formData.description}
                    onChange={handleChange}
                />

                <TextField
                    select
                    label="Categoría"
                    name="category"
                    fullWidth
                    size="small"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {CATEGORIES.map((option) => {
                        const config = getCategoryConfig(option.id);
                        return (
                            <MenuItem key={option.id} value={option.id}>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <Avatar sx={{ width: 18, height: 18, bgcolor: `${config.color}15`, color: config.color, fontSize: '0.7rem' }}>
                                        {config.icon}
                                    </Avatar>
                                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                        {config.label}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        );
                    })}
                </TextField>

                <Stack direction="row" spacing={1}>
                    <TextField
                        label="Importe"
                        name="amount"
                        type="number"
                        required
                        fullWidth
                        size="small"
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
                        size="small"
                        value={formData.date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Stack>

                {/* BOTONES MÁS PEQUEÑOS Y COMPACTOS */}
                <Stack direction="row" spacing={1.5} pt={1}>
                    <Button
                        fullWidth
                        onClick={onCancel}
                        size="small" // Tamaño pequeño de MUI
                        sx={{
                            color: 'text.secondary',
                            fontWeight: 700,
                            textTransform: 'none',
                            fontSize: '0.8rem' // Fuente más pequeña
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="small" // Tamaño pequeño de MUI
                        sx={{
                            borderRadius: 2,
                            py: 0.8, // Menos relleno vertical
                            fontWeight: 800,
                            textTransform: 'none',
                            fontSize: '0.8rem', // Fuente más pequeña
                            bgcolor: currentCategoryStyle.color,
                            boxShadow: 'none', // Menos sombra para un look más limpio
                            '&:hover': { bgcolor: currentCategoryStyle.color, filter: 'brightness(0.9)' }
                        }}
                    >
                        {initialData ? "Actualizar" : "Guardar"}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ExpenseForm;