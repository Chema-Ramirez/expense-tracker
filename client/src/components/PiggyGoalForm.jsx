import { useState } from "react";
import { TextField, Button, Stack, InputAdornment } from "@mui/material";

const PiggyGoalForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        targetAmount: "",
        suggestedAmount: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            targetAmount: Number(formData.targetAmount),
            suggestedAmount: Number(formData.suggestedAmount)
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
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    label="Meta Total"
                    name="targetAmount"
                    type="number"
                    fullWidth
                    required
                    value={formData.targetAmount}
                    onChange={handleChange}
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
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                />

                <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                    <Button fullWidth variant="outlined" color="inherit" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button fullWidth variant="contained" color="primary" type="submit">
                        Guardar Meta
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};

export default PiggyGoalForm;