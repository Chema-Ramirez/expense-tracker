import { useState } from "react";
import { TextField, Button, Stack, InputAdornment, MenuItem } from "@mui/material";
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
        <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                <TextField
                    label="¿Para qué quieres ahorrar?"
                    name="name"
                    placeholder="Ej: Viaje a Japón, Coche nuevo..."
                    fullWidth
                    required
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
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
                >
                    {CATEGORIES.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <span>{option.icon}</span>
                                <span>{option.label}</span>
                            </Stack>
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Meta Total"
                    name="targetAmount"
                    type="number"
                    fullWidth
                    required
                    value={formData.targetAmount}
                    onChange={handleChange}
                    inputProps={{ min: 0, step: "0.01" }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                />

                <TextField
                    label="Ahorro mensual deseado"
                    name="suggestedAmount"
                    type="number"
                    fullWidth
                    value={formData.suggestedAmount}
                    onChange={handleChange}
                    inputProps={{ min: 0, step: "0.01" }}
                    helperText="Opcional: ¿Cuánto quieres apartar cada mes?"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                />

                <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={onCancel}
                        sx={{
                            fontWeight: 700,
                            borderRadius: 3,
                            textTransform: 'none',
                            bgcolor: 'error.main',
                            boxShadow: '0 4px 12px rgba(221, 21, 21, 0.2)',
                            '&:hover': {
                                bgcolor: 'error.dark',
                                boxShadow: '0 6px 15px rgba(156, 15, 15, 0.3)',
                            }
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            fontWeight: 700,
                            borderRadius: 3,
                            textTransform: 'none',
                            bgcolor: 'primary.main',
                            boxShadow: '0 4px 12px rgba(31, 191, 159, 0.25)',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                                boxShadow: '0 6px 15px rgba(31, 191, 159, 0.35)',
                            }
                        }}
                    >
                        Guardar
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};

export default PiggyGoalForm;