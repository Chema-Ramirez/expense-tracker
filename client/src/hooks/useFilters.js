import { useState } from "react";

export const useFilters = () => {
    const [filters, setFilters] = useState({});

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return { filters, setFilters, applyFilters };
};
