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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {/* CABECERA */}
            <Box display="flex" flexDirection="column" alignItems="center" py={1} mb={1}>
                <Zoom key={formData.category} in={true}>
                    <Avatar
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: `${currentCategoryStyle.color}15`,
                            color: currentCategoryStyle.color,
                            fontSize: "1.8rem",
                            mb: 1,
                            border: `2px solid ${currentCategoryStyle.color}30`,
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {currentCategoryStyle.icon}
                    </Avatar>
                </Zoom>
                <Typography
                    variant="button"
                    fontWeight={800}
                    sx={{ color: currentCategoryStyle.color, letterSpacing: 1, fontSize: '0.75rem' }}
                >
                    {currentCategoryStyle.label}
                </Typography>
            </Box>

            <Stack spacing={2}>
                <TextField
                    label="Descripción"
                    name="description"
                    required
                    fullWidth
                    size="small"
                    value={formData.description}
                    onChange={handleChange}
                    autoFocus
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
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar sx={{ width: 20, height: 20, bgcolor: `${config.color}15`, color: config.color, fontSize: '0.8rem' }}>
                                        {config.icon}
                                    </Avatar>
                                    <Typography variant="body2">{config.label}</Typography>
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

                {/* BOTONES */}
                <Stack direction="row" spacing={2} pt={2}>
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
                            py: 1,
                            fontWeight: 800,
                            textTransform: 'none',
                            bgcolor: currentCategoryStyle.color,
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