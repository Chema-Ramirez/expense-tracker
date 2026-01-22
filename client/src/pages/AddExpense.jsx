import { useEffect, useState } from "react";

const AddExpense = ({ initialData = null, onSubmit, submitText }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setAmount(initialData.amount);
            setCategory(initialData.category);
            setDate(initialData.date?.slice(0, 10));
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            title,
            amount,
            category,
            date
        });

        if (!initialData) {
            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>{submitText}</h4>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Category</option>
                <option value="food">Food</option>
                <option value="rent">Rent</option>
                <option value="transport">Transport</option>
            </select>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <button type="submit">{submitText}</button>
        </form>
    );
};

export default AddExpense;
