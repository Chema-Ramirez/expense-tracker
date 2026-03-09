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
    useTheme
} from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";

const Layout = () => {
    const { mode, toggleMode } = useContext(ThemeContext);
    const theme = useTheme();

    return (
        <Box sx={{
            minHeight: "100dvh",
            bgcolor: "background.default",
            transition: "background-color 0.3s ease"
        }}>
            {/* APPBAR */}
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(12px)",
                    color: "text.primary",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    ...(mode === 'dark' && {
                        bgcolor: "rgba(18, 18, 18, 0.8)",
                    })
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        maxWidth: "md",
                        width: "100%",
                        mx: "auto",
                        px: { xs: 2, sm: 3 }
                    }}
                >
                    {/* LOGO */}
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box
                            component="img"
                            src="/icons/192.png"
                            alt="BitOink"
                            sx={{
                                width: 34,
                                height: 34,
                                borderRadius: 2,
                                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                            }}
                        />
                        <Typography
                            variant="h6"
                            fontWeight={900}
                            sx={{
                                letterSpacing: '-0.03em',
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            BitOink
                        </Typography>
                    </Box>

                    {/* BOTÓN MODO NOCHE */}
                    <IconButton
                        onClick={toggleMode}
                        sx={{
                            bgcolor: 'action.hover',
                            borderRadius: 3,
                            transition: '0.3s',
                            '&:hover': { transform: 'rotate(15deg)' }
                        }}
                        color="inherit"
                    >
                        {mode === "dark" ?
                            <Brightness7 sx={{ fontSize: 20, color: '#ffb300' }} /> :
                            <Brightness4 sx={{ fontSize: 20, color: 'primary.main' }} />
                        }
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* CONTENIDO PRINCIPAL */}
            <Container
                component="main"
                maxWidth="md"
                sx={{
                    py: { xs: 4, sm: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;