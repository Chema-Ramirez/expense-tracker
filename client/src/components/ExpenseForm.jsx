import React, { useState } from "react";

const ExpenseForm = ({ onSubmit, expenseToEdit, onCancel }) => {
    const [amount, setAmount] = useState(expenseToEdit?.amount || "");
    const [category, setCategory] = useState(expenseToEdit?.category || "");
    const [description, setDescription] = useState(expenseToEdit?.description || "");
    const [date, setDate] = useState(expenseToEdit ? expenseToEdit.date.slice(0, 10) : "");
    const [error, setError] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !category) {
            setError("Por favor, ingresa un monto y una categoría.");
            return;
        }

        onSubmit({
            amount: parseFloat(amount),
            category,
            description,
            date,
        });

        if (!expenseToEdit) {
            setAmount("");
            setCategory("");
            setDescription("");
            setDate("");
        }

        setError("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="expense-form"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                padding: "1rem",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
            }}
        >
            {error && (
                <p style={{ color: "red", fontSize: "0.9rem", margin: 0 }}>{error}</p>
            )}

            <input
                type="number"
                placeholder="Monto (€)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                style={{
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                }}
            />

            <input
                type="text"
                placeholder="Categoría"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
                style={{
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                }}
            />

            <input
                type="text"
                placeholder="Descripción (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
                style={{
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                }}
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
                style={{
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                }}
            />

            <div
                style={{
                    display: "flex",
                    justifyContent: expenseToEdit ? "space-between" : "flex-end",
                    gap: "0.5rem",
                }}
            >
                {expenseToEdit && (
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: "0.8rem 1rem",
                            borderRadius: "8px",
                            border: "none",
                            background: "#ccc",
                            color: "#000",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Cancelar
                    </button>
                )}

                <button
                    type="submit"
                    style={{
                        padding: "0.8rem 1rem",
                        borderRadius: "8px",
                        border: "none",
                        background: "#007bff",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    {expenseToEdit ? "Actualizar" : "Agregar"}
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
