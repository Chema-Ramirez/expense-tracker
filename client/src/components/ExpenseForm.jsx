import { useState } from "react";
import {
    TextField, Button, Stack, InputAdornment,
    ToggleButton, ToggleButtonGroup, Typography, Box, CircularProgress, Avatar, Zoom
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { getCategoryConfig } from "../utils/categoryHelpers";

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

    const currentCategoryStyle = getCategoryConfig(formData.category);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (_, newCategory) => {
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

                {/* CABECERA DINÁMICA */}
                <Box display="flex" flexDirection="column" alignItems="center" py={2}>
                    <Zoom key={formData.category} in={true}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: `${currentCategoryStyle.color}15`,
                                color: currentCategoryStyle.color,
                                fontSize: "2.5rem",
                                mb: 1,
                                border: `2px solid ${currentCategoryStyle.color}30`,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {currentCategoryStyle.icon}
                        </Avatar>
                    </Zoom>
                    <Typography variant="h6" fontWeight={800} color={currentCategoryStyle.color}>
                        {formData.category}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 1.5, display: 'block', letterSpacing: 1 }}>
                        CAMBIAR CATEGORÍA
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
                                borderRadius: 3,
                                border: "1px solid !important",
                                flexGrow: 1,
                                borderColor: "divider",
                                textTransform: 'capitalize',
                                px: 2,
                                py: 1,
                                transition: 'all 0.2s ease',
                                color: 'text.secondary',
                                "&.Mui-selected": {
                                    bgcolor: `${currentCategoryStyle.color}20`,
                                    color: currentCategoryStyle.color,
                                    borderColor: `${currentCategoryStyle.color} !important`,
                                    fontWeight: 'bold',
                                    "&:hover": {
                                        bgcolor: `${currentCategoryStyle.color}30`,
                                    }
                                }
                            }
                        }}
                    >
                        {CATEGORIES.map(cat => (
                            <ToggleButton key={cat} value={cat}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ fontSize: '1.1rem', display: 'flex' }}>
                                        {getCategoryConfig(cat).icon}
                                    </Box>
                                    <Typography variant="body2">{cat}</Typography>
                                </Stack>
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
                        sx: { borderRadius: 3, fontWeight: 700, fontSize: '1.2rem' }
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
                    InputProps={{ sx: { borderRadius: 3 } }}
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
                    InputProps={{ sx: { borderRadius: 3 } }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : (initialData ? <EditIcon /> : <AddCircleOutlineIcon />)}
                    sx={{
                        py: 1.8,
                        mt: 2,
                        fontWeight: 800,
                        borderRadius: 4,
                        bgcolor: currentCategoryStyle.color,
                        '&:hover': {
                            bgcolor: currentCategoryStyle.color,
                            filter: 'brightness(0.9)'
                        },
                        boxShadow: `0 8px 20px ${currentCategoryStyle.color}40`,
                        transition: 'all 0.3s ease'
                    }}
                >
                    {loading
                        ? "Guardando..."
                        : (initialData ? "Actualizar Registro" : "Confirmar Gasto")
                    }
                </Button>
            </Stack>
        </form>
    );
};

export default ExpenseForm;