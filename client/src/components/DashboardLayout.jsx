import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Box, IconButton, Typography, Container } from "@mui/material";
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
        <Box sx={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.default",
            pb: { xs: "80px", sm: "90px" }
        }}>
            {/* CONTENEDOR PRINCIPAL */}
            <Container
                maxWidth="md"
                sx={{
                    flex: "0 1 auto",
                    p: 2,
                    pt: { xs: 1, sm: 2 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Outlet />
            </Container>

            {/* NAVEGACIÓN INFERIOR */}
            <Box
                component="nav"
                sx={{
                    position: "fixed",
                    bottom: { xs: 15, sm: 20 },
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "92%", sm: "400px" },
                    height: 70,
                    borderRadius: 5,
                    bgcolor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    px: 1,
                    zIndex: 1100,
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
                                width: "auto",
                                minWidth: 60,
                                gap: 0.5,
                                position: "relative",
                                transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        >
                            <Box
                                component="img"
                                src={item.icon}
                                alt={item.label}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    transition: "all 0.3s ease",
                                    transform: isActive ? "translateY(-4px) scale(1.15)" : "scale(1)",
                                    filter: isActive ? "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" : "grayscale(80%) opacity(0.6)"
                                }}
                            />

                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: "0.6rem",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5,
                                    opacity: isActive ? 1 : 0.6,
                                    transition: "0.3s"
                                }}
                            >
                                {item.label}
                            </Typography>

                            {isActive && (
                                <Box sx={{
                                    position: "absolute",
                                    bottom: 3,
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    bgcolor: "primary.main",
                                    boxShadow: "0 0 8px rgba(0,0,0,0.2)"
                                }} />
                            )}
                        </IconButton>
                    );
                })}

                {/* BOTÓN SALIR */}
                <IconButton
                    onClick={handleLogout}
                    sx={{
                        flexDirection: "column",
                        color: "error.light",
                        minWidth: 60,
                        gap: 0.5,
                        opacity: 0.7,
                        '&:hover': { opacity: 1 }
                    }}
                >
                    <Box component="img" src="/icons/cerrar-sesion.png" sx={{ width: 22, height: 22, filter: "grayscale(100%)" }} />
                    <Typography variant="caption" sx={{ fontSize: "0.6rem", fontWeight: 800 }}>Salir</Typography>
                </IconButton>
            </Box>
        </Box>
    );
};

export default DashboardLayout;