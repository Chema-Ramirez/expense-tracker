import { Paper, Typography, Box, LinearProgress, IconButton, Stack, Button, TextField, InputAdornment } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from "react";

const PiggyGoalCard = ({ id, name, saved = 0, target = 0, suggestedAmount = 0, onUpdate, onDelete }) => {
    const progress = target > 0 ? Math.min((saved / target) * 100, 100) : 0;
    const [isEditing, setIsEditing] = useState(false);
    const [tempSuggestion, setTempSuggestion] = useState(suggestedAmount);

    useEffect(() => {
        setTempSuggestion(suggestedAmount);
    }, [suggestedAmount]);

    const handleSave = () => {
        const val = Number(tempSuggestion);
        if (!isNaN(val)) {
            onUpdate?.(id, { suggestedAmount: val });
        }
        setIsEditing(false);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                mb: 2,
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    borderColor: 'primary.light'
                }
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1" fontWeight={800}>{name}</Typography>
                        {progress === 100 && <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {saved.toLocaleString()} € <span style={{ opacity: 0.5 }}>de</span> {target.toLocaleString()} €
                    </Typography>
                </Box>
                <IconButton
                    size="small"
                    onClick={() => onDelete?.(id)}
                    sx={{
                        color: 'error.light',
                        bgcolor: 'error.lightest',
                        '&:hover': { bgcolor: '#ffebee' }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>

            <Box sx={{ my: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption" fontWeight={900} color={progress === 100 ? "success.main" : "primary"}>
                        {progress.toFixed(0)}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        {target - saved > 0 ? `Faltan ${(target - saved).toLocaleString()} €` : '¡Objetivo logrado!'}
                    </Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: progress === 100 ? '#4caf50' : ''
                        }
                    }}
                />
            </Box>

            <Box
                sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: (theme) => theme.palette.mode === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid transparent',
                    borderColor: isEditing ? 'primary.main' : 'transparent'
                }}
            >
                {isEditing ? (
                    <Stack direction="row" spacing={1} width="100%">
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            variant="standard"
                            value={tempSuggestion}
                            onChange={(e) => setTempSuggestion(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                disableUnderline: true,
                                sx: { fontWeight: 700 }
                            }}
                            autoFocus
                        />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleSave}
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
                        >
                            Guardar
                        </Button>
                    </Stack>
                ) : (
                    <>
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.65rem' }}>
                                Ahorro mensual sugerido
                            </Typography>
                            <Typography variant="body2" fontWeight={800} color="primary.main">
                                {suggestedAmount.toLocaleString()} € / mes
                            </Typography>
                        </Box>
                        <IconButton
                            size="small"
                            onClick={() => setIsEditing(true)}
                            sx={{ color: 'primary.main', bgcolor: 'rgba(31,191,159,0.1)' }}
                        >
                            <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </>
                )}
            </Box>
        </Paper>
    );
};

export default PiggyGoalCard;