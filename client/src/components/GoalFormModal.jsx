import { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, InputAdornment, Typography, Box, MenuItem
} from "@mui/material";
import { CATEGORIES } from "../utils/categoryHelpers";

const GoalFormModal = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        targetAmount: "",
        currentAmount: 0,
        category: "ahorro",
        deadline: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name: formData.title,
            category: formData.category,
            targetAmount: Number(formData.targetAmount),
            currentAmount: Number(formData.currentAmount) || 0,
            deadline: formData.deadline
        });
        setFormData({ title: "", targetAmount: "", currentAmount: 0, category: "ahorro", deadline: "" });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 6, p: 1 } }}>
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 1 }}>
                    <Typography variant="h6" fontWeight={800}>Nueva Meta de Ahorro</Typography>
                    <Box sx={{ width: 100, height: 4, bgcolor: 'primary.main', borderRadius: 2, margin: '12px auto 0' }} />
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={3} mt={1}>
                        <TextField label="¿Qué quieres conseguir?" name="title" fullWidth required value={formData.title} onChange={handleChange} autoFocus />

                        <TextField select label="Categoría" name="category" fullWidth value={formData.category} onChange={handleChange}>
                            {CATEGORIES.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Box sx={{ display: 'flex', fontSize: '1.2rem' }}>{option.icon}</Box>
                                        <Typography>{option.label}</Typography>
                                    </Stack>
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField label="Meta total" name="targetAmount" type="number" fullWidth required value={formData.targetAmount} onChange={handleChange}
                            InputProps={{ startAdornment: <InputAdornment position="start">€</InputAdornment> }} />

                        <TextField label="Ahorro actual (opcional)" name="currentAmount" type="number" fullWidth value={formData.currentAmount} onChange={handleChange}
                            InputProps={{ startAdornment: <InputAdornment position="start">€</InputAdornment> }} />

                        <TextField label="¿Para cuándo lo quieres?" name="deadline" type="date" fullWidth value={formData.deadline} onChange={handleChange}
                            slotProps={{ inputLabel: { shrink: true } }} helperText="Para calcular tu plan mensual" />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 3, gap: 2 }}>
                    <Button fullWidth onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 700 }}>Cancelar</Button>
                    <Button fullWidth type="submit" variant="contained" sx={{ borderRadius: 3, fontWeight: 700 }}>Crear Meta</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default GoalFormModal;