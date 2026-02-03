import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";

import ExpenseList from "../components/ExpenseList";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseForm from "../components/ExpenseForm";
import MonthlySummary from "../components/MonthlySummary";

import { getExpenses } from "../services/expenseServices";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [expenseToEdit, setExpenseToEdit] = useState(null);

    const fetchExpenses = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const data = await getExpenses(filters);
            setExpenses(data);

            const uniqueCategories = [
                ...new Set(data.map((exp) => exp.category)),
            ];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [filters, user]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const totalExpenses = expenses.reduce(
        (sum, exp) => sum + exp.amount,
        0
    );

    const handleEdit = (expense) => {
        setExpenseToEdit(expense);
    };

    const handleDelete = async (id) => {
        console.log("Eliminar gasto:", id);
    };

    const handleFormSubmit = () => {
        setExpenseToEdit(null);
        fetchExpenses();
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <h1>Control de Gastos</h1>
                <p>
                    Bienvenido, <strong>{user.name}</strong> 👋
                </p>
            </header>

            {/* SUMMARY */}
            <MonthlySummary
                totalExpenses={totalExpenses}
                totalIncome={0}
            />

            {/* FILTERS */}
            <ExpenseFilters
                filters={filters}
                setFilters={setFilters}
                categories={categories}
            />

            {/* FORM */}
            <section className="dashboard-section">
                <h2>
                    {expenseToEdit ? "Editar gasto" : "Nuevo gasto"}
                </h2>

                <ExpenseForm
                    expenseToEdit={expenseToEdit}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setExpenseToEdit(null)}
                />
            </section>

            {/* LIST */}
            <section className="dashboard-section">
                <h2>Gastos recientes</h2>

                {loading ? (
                    <p>Cargando gastos...</p>
                ) : (
                    <ExpenseList
                        expenses={expenses}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </section>
        </div>
    );
};

export default Dashboard;
