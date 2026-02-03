import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <h2>💰 Mi Banco</h2>

                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/expenses">Gastos</Link>
                </nav>
            </aside>

            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
