import { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";

const categoriesList = ["Todos", "Sueldo", "Transporte", "Entretenimiento", "Salud", "Comida", "Otros"];

const ExpenseFilters = ({ filters, setFilters }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const cleaned = { ...localFilters };
        if (cleaned.category === "Todos") cleaned.category = "";
        setFilters(cleaned);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
                select
                label="Categoría"
                name="category"
                value={localFilters.category || "Todos"}
                onChange={handleChange}
                fullWidth
            >
                {categoriesList.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                        {cat}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label="Desde"
                type="date"
                name="startDate"
                value={localFilters.startDate || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
            />

            <TextField
                label="Hasta"
                type="date"
                name="endDate"
                value={localFilters.endDate || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
            />

            <Button variant="contained" color="primary" onClick={applyFilters}>
                Aplicar filtros
            </Button>
        </Box>
    );
};

export default ExpenseFilters;
