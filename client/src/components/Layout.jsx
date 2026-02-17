import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Container,
} from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";

const Layout = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            {/* Top AppBar */}
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: "background.default",
                    color: "text.primary",
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        maxWidth: "md",
                        width: "100%",
                        mx: "auto",
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            component="img"
                            src="/icons/192.png"
                            alt="BitOink"
                            sx={{ width: 32, height: 32, borderRadius: 1 }}
                        />
                        <Typography variant="h6" fontWeight={700}>
                            BitOink
                        </Typography>
                    </Box>

                    {/* THEME */}
                    <IconButton onClick={toggleTheme} color="inherit">
                        {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* MAIN CONTENT */}
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    py: 3,
                }}
            >
                <Container maxWidth="md">
                    <Outlet />
                </Container>
            </Box>
        </>
    );
};

export default Layout;
