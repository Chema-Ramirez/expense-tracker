import { useState } from "react";
import {
    ListItem, Stack, Avatar, Box, Typography,
    Collapse, Divider, Button, Paper, useTheme
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCategoryConfig } from "../utils/categoryHelpers";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    const categoryName = expense.category?.toLowerCase().trim() || "otros";
    const config = getCategoryConfig(categoryName);
    const isIngreso = categoryName === 'sueldo' || categoryName === 'ingreso';

    return (
        <Paper
            elevation={0}
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
                mb: 1.5,
                borderRadius: 4,
                border: "1px solid",
                borderColor: isExpanded ? config.color : "divider",
                transition: "all 0.2s ease-in-out",
                cursor: 'pointer',
                overflow: 'hidden',
                bgcolor: isExpanded
                    ? (theme.palette.mode === 'light' ? `${config.color}05` : `${config.color}15`)
                    : 'background.paper',
                '&:hover': {
                    borderColor: config.color,
                    transform: isExpanded ? 'none' : 'translateY(-2px)'
                }
            }}
        >
            <ListItem disablePadding sx={{ px: 2, py: 1.8 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                    {/* AVATAR */}
                    <Avatar sx={{
                        bgcolor: `${config.color}15`,
                        color: config.color,
                        width: 42, height: 42, borderRadius: 2.5,
                        fontSize: '1.2rem'
                    }}>
                        {config.icon}
                    </Avatar>

                    {/* TEXTO PRINCIPAL */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body1" fontWeight={800} noWrap={!isExpanded} sx={{ fontSize: '0.95rem' }}>
                            {expense.description}
                        </Typography>
                        {!isExpanded && (
                            <Typography variant="caption" color="text.disabled" fontWeight={600}>
                                {new Date(expense.date).toLocaleDateString()} • {expense.category}
                            </Typography>
                        )}
                    </Box>

                    {/* IMPORTE */}
                    <Typography
                        variant="body1"
                        fontWeight={900}
                        sx={{
                            whiteSpace: "nowrap",
                            ml: 1,
                            color: isIngreso ? "success.main" : "error.main"
                        }}
                    >
                        {isIngreso ? "+" : "-"} {Number(expense.amount).toLocaleString('es-ES')}€
                    </Typography>

                    {/* ICONO DE FLECHA */}
                    <ExpandMoreIcon sx={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: '0.3s',
                        color: 'text.disabled',
                        fontSize: '1.1rem'
                    }} />
                </Stack>
            </ListItem>

            {/* SECCIÓN EXPANDIBLE */}
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Divider sx={{ mx: 2, opacity: 0.5 }} />
                <Box sx={{ p: 2, bgcolor: `${config.color}05` }}>
                    <Stack spacing={2}>
                        <Box>
                            <Stack direction="row" justifyContent="space-between" mb={1}>
                                <Typography variant="caption" color="text.secondary" fontWeight={800}>DETALLES</Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight={800}>
                                    {new Date(expense.date).toLocaleDateString('es-ES', { dateStyle: 'long' })}
                                </Typography>
                            </Stack>
                            <Typography variant="body2" sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                                {expense.description || "Sin descripción adicional"}
                            </Typography>
                        </Box>

                        {/* BOTONES DE ACCIÓN */}
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(expense);
                                }}
                                sx={{ borderRadius: 2, fontWeight: 800 }}
                            >
                                Editar
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(expense._id || expense.id);
                                }}
                                sx={{ borderRadius: 2, fontWeight: 800 }}
                            >
                                Borrar
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Collapse>
        </Paper>
    );
};

export default ExpenseItem;