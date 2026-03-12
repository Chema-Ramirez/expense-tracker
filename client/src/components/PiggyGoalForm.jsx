import { useState } from "react";
import { TextField, Button, Stack, InputAdornment, MenuItem, Box, Typography } from "@mui/material";
import { CATEGORIES } from "../utils/categoryHelpers";

const PiggyGoalForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        category: "otros",
        targetAmount: "",
        suggestedAmount: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name: formData.name.trim(),
            category: formData.category,
            targetAmount: Number(formData.targetAmount),
            suggestedAmount: Number(formData.suggestedAmount) || 0,
            currentAmount: 0
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, pt: 1 }}>
            <Stack spacing={2.5}>
                {/* META */}
                <TextField
                    label="¿Para qué quieres ahorrar?"
                    name="name"
                    placeholder="Ej: Viaje a Japón, Coche nuevo..."
                    fullWidth
                    required
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />

                {/* SELECTOR DE CATEGORÍA */}
                <TextField
                    select
                    label="Categoría"
                    name="category"
                    fullWidth
                    required
                    value={formData.category}
                    onChange={handleChange}
                    helperText="Esto definirá el color y el icono de tu meta"
                    InputLabelProps={{ shrink: true }}
                >
                    {CATEGORIES.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <span style={{ fontSize: '1.2rem' }}>{option.icon}</span>
                                <Typography variant="body2">{option.label}</Typography>
                            </Stack>
                        </MenuItem>
                    ))}
                </TextField>

                {/* MONTOS EN FILA */}
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Meta Total"
                        name="targetAmount"
                        type="number"
                        fullWidth
                        required
                        value={formData.targetAmount}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: 0, step: "0.01" }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                    />

                    <TextField
                        label="Ahorro Mensual"
                        name="suggestedAmount"
                        type="number"
                        fullWidth
                        value={formData.suggestedAmount}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: 0, step: "0.01" }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                    />
                </Stack>

                {/* BOTONES DE ACCIÓN */}
                <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                    <Button
                        fullWidth
                        onClick={onCancel}
                        sx={{
                            fontWeight: 800,
                            color: 'text.secondary',
                            textTransform: 'none'
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            fontWeight: 800,
                            borderRadius: 3,
                            textTransform: 'none',
                            py: 1.2,
                            bgcolor: 'primary.main',
                            boxShadow: '0 4px 12px rgba(31, 191, 159, 0.25)',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            }
                        }}
                    >
                        Guardar Meta
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default PiggyGoalForm;