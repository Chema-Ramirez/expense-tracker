import { useState } from "react";

const ExpenseFilters = ({ setFilters }) => {
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const applyFilters = () => {
        setFilters({
            category, startDate, endDate
        });
    };

    return (
        <div>
            <h4>Filters</h4>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All</option>
                <option value="food">Food</option>
                <option value="rent">Rent</option>
                <option value="transport">Transport</option>
            </select>

            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            <button onClick={applyFilters}>Apply Filters</button>

        </div>
    );
};


export default ExpenseFilters