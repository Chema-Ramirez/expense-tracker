import { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const categoriesList = ["Sueldo", "Transporte", "Entretenimiento", "Salud", "Comida", "Otros"];

const ExpenseForm = ({ onSubmit, expenseToEdit, onCancel }) => {
    const [form, setForm] = useState(() => ({
        amount: expenseToEdit?.amount || "",
        category: expenseToEdit?.category || "",
        description: expenseToEdit?.description || "",
        date: expenseToEdit?.date?.slice(0, 10) || "",
    }));

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.amount || !form.category) {
            setError("Por favor, ingresa un monto y una categoría.");
            return;
        }

        onSubmit({ ...form, amount: parseFloat(form.amount) });

        if (!expenseToEdit) {
            setForm({ amount: "", category: "", description: "", date: "" });
        }

        setError("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {error && <Box sx={{ color: "error.main", fontSize: 0.9 }}>{error}</Box>}

            <TextField
                label="Monto (€)"
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                fullWidth
            />

            <TextField select label="Categoría" name="category" value={form.category} onChange={handleChange} fullWidth>
                {categoriesList.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                        {cat}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label="Descripción (opcional)"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Fecha"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                {expenseToEdit && (
                    <Button onClick={onCancel} variant="outlined" color="inherit">
                        Cancelar
                    </Button>
                )}
                <Button type="submit" variant="contained" color="primary">
                    {expenseToEdit ? "Actualizar" : "Agregar"}
                </Button>
            </Box>
        </Box>
    );
};

export default ExpenseForm;
