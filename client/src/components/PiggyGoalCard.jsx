import { Paper, Typography, Box, LinearProgress, Button, TextField } from "@mui/material";
import { useState } from "react";

const PiggyGoalCard = ({ id, name, saved = 0, target = 0, suggestedAmount = 0, onUpdate, onDelete }) => {
    const progress = target > 0 ? Math.min((saved / target) * 100, 100) : 0;
    const [tempSuggestion, setTempSuggestion] = useState(0);

    const handleSaveSuggestion = () => {
        const value = Number(tempSuggestion);
        if (value < 0) return alert("La sugerencia no puede ser negativa");
        onUpdate?.(id, { suggestedAmount: value });
        setTempSuggestion(0);
    };

    return (
        <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography fontWeight={600}>{name}</Typography>
            <Typography variant="body2" color="text.secondary">{saved} € / {target} €</Typography>

            <Box mt={1}>
                <LinearProgress value={progress} variant="determinate" />
                <Typography variant="caption">{progress.toFixed(0)}% completado</Typography>
            </Box>

            {suggestedAmount > 0 && (
                <Box mt={2} p={1} bgcolor="grey.100" borderRadius={2} textAlign="center">
                    <Typography variant="body2" color="text.secondary">Objetivo mensual guardado</Typography>
                    <Typography fontWeight={600}>{suggestedAmount} €</Typography>
                </Box>
            )}

            <Box mt={2} display="flex" gap={1} alignItems="center">
                <TextField label="Sugerencia mensual" type="number" size="small" value={tempSuggestion} onChange={(e) => setTempSuggestion(e.target.value)} />
                <Button variant="contained" onClick={handleSaveSuggestion}>Guardar</Button>
            </Box>

            {onDelete && (
                <Box mt={2}>
                    <Button size="small" color="error" onClick={() => onDelete(id)}>Eliminar</Button>
                </Box>
            )}
        </Paper>
    );
};

export default PiggyGoalCard;
