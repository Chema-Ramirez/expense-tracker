import { useState } from "react";
import "../styles/ExpenseFilter.css";

const ExpenseFilters = ({ filters, setFilters, categories }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters({ ...localFilters, [name]: value });
    };

    const applyFilters = () => {
        setFilters(localFilters);
    };

    return (
        <div className="filters-container">
            <select name="category" value={localFilters.category || ""} onChange={handleChange}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <input
                type="date"
                name="startDate"
                value={localFilters.startDate || ""}
                onChange={handleChange}
            />
            <input
                type="date"
                name="endDate"
                value={localFilters.endDate || ""}
                onChange={handleChange}
            />

            <button className="apply-btn" onClick={applyFilters}>
                Apply
            </button>
        </div>
    );
};

export default ExpenseFilters;
