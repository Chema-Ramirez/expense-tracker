import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const drawerWidth = 240;

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const { mode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const drawerContent = (
        <Box sx={{ width: drawerWidth, p: 2 }}>
            <Typography variant="h6" mb={2}>
                💰 Mi Banco
            </Typography>
            <List>
                <ListItemButton component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={Link} to="/expenses">
                    <ListItemText primary="Gastos" />
                </ListItemButton>
                <ListItemButton component={Link} to="/piggybank">
                    <ListItemText primary="Hucha" />
                </ListItemButton>
                {user && (
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{ mt: 2, bgcolor: "#e74c3c", color: "#fff", borderRadius: 1 }}
                    >
                        <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                )}
            </List>


        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            {/* APPBAR */}
            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Control Gastos
                    </Typography>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* DRAWER */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* MOBILE */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>

                {/* DESKTOP */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* MAIN CONTENT */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
