import { useState } from "react";
import {
    Stack, Typography, Box, IconButton, Collapse,
    FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { getCategoryConfig, CATEGORIES as APP_CATEGORIES } from "../utils/categoryHelpers";

const MONTHS = [
    { id: "", label: "Todos los meses" },
    { id: "0", label: "Enero" },
    { id: "1", label: "Febrero" },
    { id: "2", label: "Marzo" },
    { id: "3", label: "Abril" },
    { id: "4", label: "Mayo" },
    { id: "5", label: "Junio" },
    { id: "6", label: "Julio" },
    { id: "7", label: "Agosto" },
    { id: "8", label: "Septiembre" },
    { id: "9", label: "Octubre" },
    { id: "10", label: "Noviembre" },
    { id: "11", label: "Diciembre" },
];

const ExpenseFilters = ({ filter, setFilter }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setFilter(prev => ({
            ...prev,
            category: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleMonthChange = (event) => {
        setFilter(prev => ({ ...prev, month: event.target.value }));
    };

    const clearFilters = () => {
        setFilter({ category: [], month: "" });
    };

    return (
        <Stack spacing={0} sx={{ mb: 3, px: 1 }}>
            {/* HEADER */}
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <IconButton
                        onClick={() => setIsExpanded(!isExpanded)}
                        size="small"
                        sx={{
                            bgcolor: isExpanded ? 'primary.main' : 'action.hover',
                            color: isExpanded ? 'white' : 'text.primary',
                            '&:hover': { bgcolor: isExpanded ? 'primary.dark' : 'action.selected' }
                        }}
                    >
                        <FilterListIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                        Filtros
                    </Typography>
                </Stack>

                {(filter.category.length > 0 || filter.month !== "") && (
                    <IconButton size="small" onClick={clearFilters} color="error">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>

            <Collapse in={isExpanded}>
                <Stack spacing={2} sx={{ pt: 2, pb: 1 }}>

                    {/* DESPLEGABLE MES */}
                    <FormControl fullWidth size="small">
                        <InputLabel id="month-select-label">Mes</InputLabel>
                        <Select
                            labelId="month-select-label"
                            value={filter.month}
                            label="Mes"
                            onChange={handleMonthChange}
                            sx={{ borderRadius: 2 }}
                        >
                            {MONTHS.map((m) => (
                                <MenuItem key={m.id} value={m.id}>
                                    {m.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* DESPLEGABLE CATEGORÍAS */}
                    <FormControl fullWidth size="small">
                        <InputLabel id="category-multiple-label">Categorías</InputLabel>
                        <Select
                            labelId="category-multiple-label"
                            multiple
                            value={filter.category}
                            onChange={handleCategoryChange}
                            input={<OutlinedInput label="Categorías" />}
                            renderValue={(selected) => {
                                if (selected.length === 0) return "Todas";
                                return selected.map(catId => getCategoryConfig(catId).label).join(', ');
                            }}
                            sx={{ borderRadius: 2 }}
                        >
                            {APP_CATEGORIES.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id.toLowerCase()}>
                                    <Checkbox checked={filter.category.indexOf(cat.id.toLowerCase()) > -1} size="small" />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography fontSize="1.1rem">{cat.icon}</Typography>
                                        <ListItemText primary={cat.label} />
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Stack>
            </Collapse>
        </Stack>
    );
};

export default ExpenseFilters;