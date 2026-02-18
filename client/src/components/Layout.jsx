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
    const { mode, toggleMode } = useContext(ThemeContext);

    return (
        <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    borderBottom: "1px solid",
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
                        <Typography variant="h6" fontWeight={800} color="primary">
                            BitOink
                        </Typography>
                    </Box>

                    <IconButton onClick={toggleMode} color="inherit">
                        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="md" sx={{ py: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;