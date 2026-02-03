import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Layout = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <header style={{ padding: "1rem", display: "flex", justifyContent: "space-between" }}>
                <h3>💸 Control Gastos</h3>
                <button className="secondary" onClick={toggleTheme}>
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>
            </header>

            <main style={{ padding: "1rem" }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
