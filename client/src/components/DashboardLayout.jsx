import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: "Inicio", icon: "/icons/home.png", to: "/dashboard" },
        { label: "Gastos", icon: "/icons/gasto.png", to: "/expenses" },
        { label: "Hucha", icon: "/icons/192.png", to: "/piggybank" },
        { label: "Perfil", icon: "/icons/user.png", to: "/profile" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column", pb: "80px", bgcolor: "background.default" }}>
            <Box sx={{ flex: 1, p: 2 }}>
                <Outlet />
            </Box>

            <Box
                component="nav"
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 70,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "space-between",
                    px: 1,
                    alignItems: "center",
                    zIndex: 1000,
                }}
            >
                {navItems.map((item, idx) => {
                    const isActive = location.pathname === item.to;
                    return (
                        <IconButton
                            key={idx}
                            onClick={() => navigate(item.to)}
                            disableRipple
                            sx={{
                                flexDirection: "column",
                                color: isActive ? "primary.main" : "text.secondary",
                                width: "20%",
                                borderRadius: 0,
                                gap: 0.5
                            }}
                        >
                            <Box
                                component="img"
                                src={item.icon}
                                alt={item.label}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    transition: "transform 0.2s",
                                    transform: isActive ? "scale(1.1)" : "scale(1)",
                                    filter: isActive ? "none" : "grayscale(100%) opacity(0.5)"
                                }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: "0.65rem",
                                    fontWeight: 600,
                                    color: isActive ? "primary.main" : "text.secondary"
                                }}
                            >
                                {item.label}
                            </Typography>
                        </IconButton>
                    );
                })}

                <IconButton
                    onClick={handleLogout}
                    sx={{ flexDirection: "column", color: "#f44336", width: "20%", gap: 0.5 }}
                >
                    <Box component="img" src="/icons/cerrar-sesion.png" sx={{ width: 24, height: 24, opacity: 0.7 }} />
                    <Typography variant="caption" sx={{ fontSize: "0.65rem", fontWeight: 600 }}>Salir</Typography>
                </IconButton>
            </Box>
        </Box>
    );
};

export default DashboardLayout;