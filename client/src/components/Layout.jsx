import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";

const Layout = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" component="div">
                        💸 Control Gastos
                    </Typography>

                    <IconButton color="inherit" onClick={toggleTheme}>
                        {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <main style={{ padding: "1rem" }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
