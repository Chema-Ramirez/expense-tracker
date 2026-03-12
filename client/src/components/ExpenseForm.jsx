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
            sx={{ p: 3, pt: 1 }} // 
        >
            {/* HEADER */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Zoom key={formData.category} in={true}>
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: `${currentCategoryStyle.color}15`,
                            color: currentCategoryStyle.color,
                            fontSize: "1.5rem",
                            mb: 1,
                            border: `1px solid ${currentCategoryStyle.color}30`,
                        }}
                    >
                        {currentCategoryStyle.icon}
                    </Avatar>
                </Zoom>
                <Typography
                    variant="caption"
                    fontWeight={800}
                    sx={{ color: currentCategoryStyle.color, letterSpacing: 1, textTransform: 'uppercase' }}
                >
                    {currentCategoryStyle.label}
                </Typography>
            </Box>

            <Stack spacing={2.5}>
                <TextField
                    label="Descripción"
                    name="description"
                    required
                    fullWidth
                    size="small"
                    value={formData.description}
                    onChange={handleChange}
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    select
                    label="Categoría"
                    name="category"
                    fullWidth
                    size="small"
                    value={formData.category}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                >
                    {CATEGORIES.map((option) => {
                        const config = getCategoryConfig(option.id);
                        return (
                            <MenuItem key={option.id} value={option.id}>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <Avatar sx={{ width: 22, height: 22, bgcolor: `${config.color}10`, color: config.color, fontSize: '0.9rem' }}>
                                        {config.icon}
                                    </Avatar>
                                    <Typography variant="body2">{config.label}</Typography>
                                </Stack>
                            </MenuItem>
                        );
                    })}
                </TextField>

                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Importe"
                        name="amount"
                        type="number"
                        required
                        fullWidth
                        size="small"
                        value={formData.amount}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
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
                            py: 1.2,
                            fontWeight: 800,
                            textTransform: 'none',
                            bgcolor: currentCategoryStyle.color,
                            boxShadow: `0 4px 14px ${currentCategoryStyle.color}40`,
                            '&:hover': {
                                bgcolor: currentCategoryStyle.color,
                                filter: 'brightness(0.9)',
                                boxShadow: `0 6px 20px ${currentCategoryStyle.color}60`,
                            }
                        }}
                    >
                        {initialData ? "Actualizar" : "Guardar Gasto"}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ExpenseForm;