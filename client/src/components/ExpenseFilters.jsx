import { useState } from "react";
import { Stack, Typography, Box, ButtonBase, Collapse, IconButton, Grid } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { getCategoryConfig } from "../utils/categoryHelpers";

const CATEGORIES = ["Todos", "Comida", "Transporte", "Ocio", "Sueldo", "Vivienda", "Salud", "Otros"];
const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const ExpenseFilters = ({ filter, setFilter }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCategoryClick = (category) => {
        const catLower = category.toLowerCase();
        setFilter(prev => {
            const currentCategories = Array.isArray(prev.category) ? prev.category : [];
            if (category === "Todos") return { ...prev, category: [] };
            const newCategories = currentCategories.includes(catLower)
                ? currentCategories.filter(c => c !== catLower)
                : [...currentCategories, catLower];
            return { ...prev, category: newCategories };
        });
    };

    const handleMonthClick = (index) => {
        const monthVal = index === null ? "" : index.toString();
        setFilter(prev => ({ ...prev, month: monthVal }));
    };

    return (
        <Stack spacing={0} sx={{ mb: 3, px: 1 }}>

            {/* HEADER */}
            <Box display="flex" alignItems="center" sx={{ py: 1 }}>
                <IconButton
                    onClick={() => setIsExpanded(!isExpanded)}
                    size="small"
                    sx={{
                        mr: 1.5,
                        bgcolor: isExpanded ? 'primary.main' : 'action.hover',
                        color: isExpanded ? 'white' : 'text.primary',
                        transition: '0.3s',
                        p: 1
                    }}
                >
                    <MenuIcon fontSize="small" />
                </IconButton>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
                    Filtros de Gastos
                </Typography>
            </Box>

            {/* PANEL DE CONTROL */}
            <Collapse in={isExpanded}>
                <Stack spacing={3} sx={{ pt: 2, pb: 1 }}>

                    {/* MESES*/}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                            Mes
                        </Typography>
                        <Grid container spacing={0.8}>
                            <Grid item xs={3}>
                                <ButtonBase
                                    onClick={() => handleMonthClick(null)}
                                    sx={{
                                        width: '100%', py: 0.8, borderRadius: 1.5, border: '1px solid',
                                        borderColor: !filter.month ? 'primary.main' : 'divider',
                                        bgcolor: !filter.month ? 'primary.main' : 'transparent',
                                        color: !filter.month ? 'white' : 'text.secondary',
                                        fontSize: '0.65rem', fontWeight: 800
                                    }}
                                >
                                    TODO
                                </ButtonBase>
                            </Grid>
                            {MONTHS.map((m, i) => {
                                const isSelected = filter.month === i.toString();
                                return (
                                    <Grid item xs={3} key={m}>
                                        <ButtonBase
                                            onClick={() => handleMonthClick(i)}
                                            sx={{
                                                width: '100%', py: 0.8, borderRadius: 1.5, border: '1px solid',
                                                borderColor: isSelected ? 'primary.main' : 'divider',
                                                bgcolor: isSelected ? 'primary.main' : 'transparent',
                                                color: isSelected ? 'white' : 'text.secondary',
                                                fontSize: '0.65rem', fontWeight: isSelected ? 800 : 500
                                            }}
                                        >
                                            {m}
                                        </ButtonBase>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>

                    {/* CATEGORÍAS */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                            Categorías
                        </Typography>
                        <Grid container spacing={1}>
                            {CATEGORIES.map((cat) => {
                                const catLower = cat.toLowerCase();
                                const config = getCategoryConfig(catLower);
                                const isSelected = cat === "Todos"
                                    ? (!filter.category || filter.category.length === 0)
                                    : (Array.isArray(filter.category) && filter.category.includes(catLower));

                                const categoryColor = cat === "Todos" ? "#757575" : config.color;

                                return (
                                    <Grid item xs={6} key={cat}>
                                        <ButtonBase
                                            onClick={() => handleCategoryClick(cat)}
                                            sx={{
                                                width: '100%',
                                                py: 1,
                                                px: 1.5,
                                                borderRadius: '12px',
                                                border: '1.5px solid',
                                                borderColor: isSelected ? categoryColor : 'divider',
                                                bgcolor: isSelected ? `${categoryColor}10` : 'background.paper',
                                                color: isSelected ? categoryColor : 'text.secondary',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                gap: 1,
                                                transition: '0.2s',
                                                '&:active': { transform: 'scale(0.96)' }
                                            }}
                                        >
                                            <Typography sx={{ fontSize: '1rem', display: 'flex' }}>
                                                {cat === "Todos" ? "📂" : config.icon}
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.75rem', fontWeight: isSelected ? 800 : 600 }}>
                                                {cat}
                                            </Typography>
                                        </ButtonBase>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Stack>
            </Collapse>
        </Stack>
    );
};

export default ExpenseFilters;