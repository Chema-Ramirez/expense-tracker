import "../styles/MonthlySummary.css";

const MonthlySummary = ({ totalExpenses, totalIncome }) => {
    const balance = totalIncome - totalExpenses;

    return (
        <div className="summary-card">
            <div className="summary-item">
                <span>Total Income</span>
                <strong>${totalIncome.toFixed(2)}</strong>
            </div>
            <div className="summary-item">
                <span>Total Expenses</span>
                <strong>${totalExpenses.toFixed(2)}</strong>
            </div>
            <div className="summary-item balance">
                <span>Balance</span>
                <strong>${balance.toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default MonthlySummary;
