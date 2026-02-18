import { Paper, Typography, Box, LinearProgress, IconButton, Stack, Button, TextField, InputAdornment } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const PiggyGoalCard = ({ id, name, saved = 0, target = 0, suggestedAmount = 0, onUpdate, onDelete }) => {
    const progress = target > 0 ? Math.min((saved / target) * 100, 100) : 0;
    const [isEditing, setIsEditing] = useState(false);
    const [tempSuggestion, setTempSuggestion] = useState(suggestedAmount);

    const handleSave = () => {
        onUpdate?.(id, { suggestedAmount: Number(tempSuggestion) });
        setIsEditing(false);
    };

    return (
        <Paper sx={{ p: 2.5, mb: 2, borderRadius: 4, position: 'relative' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                    <Typography variant="h6" fontWeight={700}>{name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {saved} € de {target} €
                    </Typography>
                </Box>
                <IconButton size="small" onClick={() => onDelete?.(id)} sx={{ color: 'error.light' }}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>

            <Box sx={{ my: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption" fontWeight={700}>{progress.toFixed(0)}%</Typography>
                    <Typography variant="caption" color="text.secondary">Faltan {Math.max(target - saved, 0)} €</Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: 'divider',
                        '& .MuiLinearProgress-bar': { borderRadius: 5 }
                    }}
                />
            </Box>

            <Box
                sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                {isEditing ? (
                    <Stack direction="row" spacing={1} width="100%">
                        <TextField
                            size="small"
                            type="number"
                            value={tempSuggestion}
                            onChange={(e) => setTempSuggestion(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                            }}
                            autoFocus
                        />
                        <Button variant="contained" size="small" onClick={handleSave}>OK</Button>
                    </Stack>
                ) : (
                    <>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block">Objetivo mensual</Typography>
                            <Typography variant="body2" fontWeight={700}>{suggestedAmount} € / mes</Typography>
                        </Box>
                        <IconButton size="small" onClick={() => setIsEditing(true)}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </>
                )}
            </Box>
        </Paper>
    );
};

export default PiggyGoalCard;