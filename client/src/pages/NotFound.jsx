import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NotFound = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const isLogged = Boolean(user);

    return (
        <Box
            sx={{
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: 3,
                background: "linear-gradient(180deg, #1FBF9F 0%, #0B3D2E 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* LOGO */}
            <Box
                component="img"
                src="/icons/hucharota.png"
                alt="BitOink Pig"
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 4,
                    boxShadow: 4,
                    backgroundColor: "white",
                    mb: 3,
                    animation: "float 3s ease-in-out infinite",
                }}
            />

            {/* 404 */}
            <Typography
                variant="h1"
                fontWeight={900}
                sx={{ opacity: 0.95 }}
            >
                404
            </Typography>

            <Typography variant="h5" fontWeight={700} mt={1}>
                Página no encontrada
            </Typography>

            <Typography
                variant="body1"
                sx={{ mt: 2, maxWidth: 380, opacity: 0.9 }}
            >
                Nuestro cerdito no ha encontrado esta página.
                Pero podemos llevarte de vuelta a un lugar seguro.
            </Typography>

            {/* BOTONES */}
            <Stack spacing={2} mt={4} width="100%" maxWidth={300}>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 3,
                        backgroundColor: "white",
                        color: "#1FBF9F",
                        fontWeight: 700,
                    }}
                    onClick={() =>
                        navigate(isLogged ? "/dashboard" : "/login")
                    }
                >
                    {isLogged ? "Ir al Dashboard" : "Iniciar sesión"}
                </Button>

                <Button
                    variant="outlined"
                    size="large"
                    sx={{
                        borderRadius: 3,
                        borderColor: "white",
                        color: "white",
                        fontWeight: 700,
                    }}
                    onClick={() => navigate("/")}
                >
                    Volver al Inicio
                </Button>
            </Stack>

            {/* BURBUJAS */}
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                `}
            </style>
        </Box>
    );
};

export default NotFound;
