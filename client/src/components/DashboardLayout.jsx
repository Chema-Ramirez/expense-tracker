import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material";

import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const navItems = [
        { label: "Inicio", icon: "/icons/home.png", to: "/dashboard" },
        { label: "Gastos", icon: "/icons/expenses.png", to: "/expenses" },
        { label: "Hucha", icon: "/icons/192.png", to: "/piggybank" },
        { label: "Perfil", icon: "/icons/user.png", to: "/profile" },
        { label: "Ajustes", icon: "/icons/config.png", to: "/settings" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column", pb: "80px", bgcolor: "background.default" }}>
            {/* MAIN CONTENT */}
            <Box sx={{ flex: 1, p: 2 }}>
                <Outlet />
            </Box>

            {/* FOOTER NAVIGATION */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 70,
                    borderTop: "1px solid #ddd",
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    zIndex: 10,
                }}
            >
                {navItems.map((item, idx) => (
                    <IconButton
                        key={idx}
                        onClick={() => navigate(item.to)}
                        sx={{ flexDirection: "column", color: "text.primary" }}
                    >
                        <Box component="img" src={item.icon} alt={item.label} sx={{ width: 28, height: 28, mb: 0.5 }} />
                        <Typography variant="caption">{item.label}</Typography>
                    </IconButton>
                ))}

                <IconButton onClick={handleLogout} sx={{ flexDirection: "column", color: "#f44336" }}>
                    <Box component="img" src="/icons/logout.png" alt="Salir" sx={{ width: 28, height: 28, mb: 0.5 }} />
                    <Typography variant="caption">Salir</Typography>
                </IconButton>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
