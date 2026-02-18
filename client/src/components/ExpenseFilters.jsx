import { Stack, Chip, Typography, Box, TextField, MenuItem } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

const CATEGORIES = ["Todos", "Comida", "Transporte", "Ocio", "Sueldo", "Vivienda", "Salud", "Otros"];

const ExpenseFilters = ({ filter, setFilter }) => {

    const handleCategoryClick = (category) => {
        setFilter(prev => ({ ...prev, category: category === "Todos" ? "" : category }));
    };

    const handleMonthChange = (e) => {
        setFilter(prev => ({ ...prev, month: e.target.value }));
    };

    return (
        <Stack spacing={2} sx={{ mb: 3 }}>
            {/* SELECTOR MES */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                    <FilterListIcon fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight={700}>Filtrar por mes</Typography>
                </Stack>
                <TextField
                    select
                    size="small"
                    value={filter.month || ""}
                    onChange={handleMonthChange}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    sx={{ minWidth: 120, textAlign: 'right', fontWeight: 600 }}
                >
                    <MenuItem value="">Todos los meses</MenuItem>
                    <MenuItem value="0">Enero</MenuItem>
                    <MenuItem value="1">Febrero</MenuItem>
                    <MenuItem value="2">Marzo</MenuItem>
                    <MenuItem value="3">Abril</MenuItem>
                    <MenuItem value="4">Mayo</MenuItem>
                    <MenuItem value="5">Junio</MenuItem>
                    <MenuItem value="6">Julio</MenuItem>
                    <MenuItem value="7">Agosto</MenuItem>
                    <MenuItem value="8">Septiembre</MenuItem>
                    <MenuItem value="9">Octubre</MenuItem>
                    <MenuItem value="10">Noviembre</MenuItem>
                    <MenuItem value="11">Diciembre</MenuItem>
                </TextField>
            </Box>

            {/* SELECTOR DE CATEGORÍAS */}
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: 1,
                    pb: 1,
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {CATEGORIES.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        clickable
                        color={
                            (filter.category === cat) || (cat === "Todos" && !filter.category)
                                ? "primary"
                                : "default"
                        }
                        onClick={() => handleCategoryClick(cat)}
                        sx={{
                            fontWeight: 600,
                            borderRadius: '8px',
                            transition: 'all 0.2s',
                            '&:active': { transform: 'scale(0.95)' }
                        }}
                    />
                ))}
            </Box>
        </Stack>
    );
};

export default ExpenseFilters;