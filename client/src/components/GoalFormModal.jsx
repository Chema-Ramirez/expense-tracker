import { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, InputAdornment, Typography
} from "@mui/material";
import TargetIcon from '@mui/icons-material/Flag';

const GoalFormModal = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        targetAmount: "",
        currentAmount: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.targetAmount) return;

        onSubmit({
            ...formData,
            targetAmount: Number(formData.targetAmount),
            currentAmount: Number(formData.currentAmount) || 0
        });

        setFormData({ title: "", targetAmount: "", currentAmount: 0 });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TargetIcon color="primary" /> Nueva Meta de Ahorro
                </DialogTitle>

                <DialogContent>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Define tu próximo objetivo y empieza a ahorrar paso a paso. 🐷
                    </Typography>

                    <Stack spacing={3}>
                        <TextField
                            label="¿Qué quieres conseguir?"
                            name="title"
                            placeholder="Ej: Viaje a Japón, Coche nuevo..."
                            fullWidth
                            required
                            value={formData.title}
                            onChange={handleChange}
                            autoFocus
                        />

                        <TextField
                            label="Meta total"
                            name="targetAmount"
                            type="number"
                            fullWidth
                            required
                            value={formData.targetAmount}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                }
                            }}
                        />

                        <TextField
                            label="Ahorro actual (opcional)"
                            name="currentAmount"
                            type="number"
                            fullWidth
                            value={formData.currentAmount}
                            onChange={handleChange}
                            helperText="¿Ya tienes algo ahorrado para esto?"
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                }
                            }}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={onClose} color="inherit" sx={{ fontWeight: 700 }}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        sx={{ bgcolor: '#2e7d32', fontWeight: 700, borderRadius: 2, px: 4 }}
                    >
                        Crear Hucha
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default GoalFormModal;