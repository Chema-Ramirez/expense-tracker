import {
    Paper, Typography, Box, LinearProgress, IconButton,
    Stack, Button, TextField, InputAdornment, Avatar, MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { getCategoryConfig, CATEGORIES } from "../utils/categoryHelpers";
import { useState } from "react";

const PiggyGoalCard = ({ id, name, category, saved = 0, target = 0, deadline, onUpdate, onDelete }) => {
    const [isEditingFull, setIsEditingFull] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [addAmount, setAddAmount] = useState("");
    const [editData, setEditData] = useState({ name, category, targetAmount: target, deadline: deadline || "" });

    const config = getCategoryConfig(category);
    const progress = target > 0 ? Math.min((saved / target) * 100, 100) : 0;

    const formatNumber = (num) => Number(num).toLocaleString('de-DE');

    const handleQuickAdd = () => {
        const val = Number(addAmount);
        if (val > 0) {
            onUpdate?.(id, { currentAmount: saved + val });
            setAddAmount("");
        }
    };

    if (showDeleteConfirm) {
        return (
            <Paper sx={{ p: 3, borderRadius: 5, border: "2px solid", borderColor: 'error.main', textAlign: 'center' }}>
                <Typography variant="subtitle2" fontWeight={800} mb={1}>¿Eliminar "{name}"?</Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    Se perderá el Objetivo actual.
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => onDelete?.(id)}
                        sx={{ borderRadius: 3, fontWeight: 800, textTransform: 'none' }}
                    >
                        Eliminar
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="inherit"
                        onClick={() => setShowDeleteConfirm(false)}
                        sx={{ borderRadius: 3, fontWeight: 800, textTransform: 'none' }}
                    >
                        Volver
                    </Button>
                </Stack>
            </Paper>
        );
    }

    if (isEditingFull) {
        return (
            <Paper sx={{ p: 3, borderRadius: 5, border: "2px solid", borderColor: 'primary.main' }}>
                <Stack spacing={2}>
                    <Typography variant="subtitle2" fontWeight={800}>Editar Objetivo</Typography>

                    <TextField label="Nombre" size="small" fullWidth value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />

                    <TextField select label="Categoría" size="small" fullWidth value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })}>
                        {CATEGORIES.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {cat.icon} <Typography variant="body2">{cat.label}</Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField label="Meta Total" size="small" type="number" fullWidth value={editData.targetAmount} onChange={(e) => setEditData({ ...editData, targetAmount: e.target.value })} />

                    <TextField label="Fecha" size="small" type="date" fullWidth value={editData.deadline} onChange={(e) => setEditData({ ...editData, deadline: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} />

                    <Stack direction="row" spacing={1}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => { onUpdate?.(id, editData); setIsEditingFull(false); }}
                        >
                            Actualizar
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="inherit"
                            startIcon={<CloseIcon />}
                            onClick={() => setIsEditingFull(false)}
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper elevation={0} sx={{
            p: 2.5, borderRadius: 5, border: "2px solid", borderColor: `${config.color}30`,
            "&:hover": { borderColor: config.color, transform: 'translateY(-2px)', transition: '0.3s' }
        }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ bgcolor: `${config.color}15`, color: config.color, borderRadius: 3 }}>{config.icon}</Avatar>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={900}>{name}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>{config.label}</Typography>
                </Box>
                <Stack direction="row">
                    <IconButton size="small" onClick={() => setIsEditingFull(true)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => setShowDeleteConfirm(true)} sx={{ color: 'error.light' }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Stack>

            <Box sx={{ my: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption" fontWeight={900} color={config.color}>{progress.toFixed(0)}%</Typography>
                    <Typography variant="caption" fontWeight={600}>{formatNumber(saved)}€ / {formatNumber(target)}€</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5, bgcolor: `${config.color}15`, "& .MuiLinearProgress-bar": { bgcolor: config.color } }} />
            </Box>

            <Stack direction="row" spacing={1} mt={3}>
                <TextField size="small" fullWidth placeholder="Sumar..." type="number" value={addAmount} onChange={(e) => setAddAmount(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">€</InputAdornment> }} />
                <Button variant="contained" onClick={handleQuickAdd}
                    sx={{
                        bgcolor: config.color, color: '#fff', fontWeight: 800, textTransform: 'none', px: 2,
                        '&:hover': { bgcolor: config.color, filter: 'brightness(0.9)' }
                    }}>
                    Ahorrar
                </Button>
            </Stack>
        </Paper>
    );
};

export default PiggyGoalCard;