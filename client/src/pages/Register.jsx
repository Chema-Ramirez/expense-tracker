import { useState, useContext, useMemo } from "react";
import {
    Box, Button, TextField, Typography, Stack, Alert,
    Link, Paper, IconButton, InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { register } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const symbols = ["€", "$", "€", "$", "€", "$", "€"];

const Register = () => {
    const { mode } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const bubbles = useMemo(() => Array.from({ length: 12 }, () => ({
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.random() * 40 + 20,
        left: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        opacity: Math.random() * 0.3 + 0.1,
        rotate: Math.random() * 360,
        startBottom: -(Math.random() * 100 + 50),
        delay: Math.random() * 5,
    })), []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register(form);
            navigate("/login", { state: { message: "Registro exitoso, ya puedes acceder" } });
        } catch (err) {
            setError(err.message || "Error al crear la cuenta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100dvh",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #1FBF9F 0%, #0B3D2E 100%)"
                        : "linear-gradient(135deg, #0B1F1A 0%, #04110E 100%)",
            }}
        >
            {/* BURBUJAS */}
            {bubbles.map((b, i) => (
                <Typography
                    key={i}
                    component="span"
                    sx={{
                        position: "absolute",
                        left: `${b.left}%`,
                        bottom: `${b.startBottom}px`,
                        fontSize: b.size,
                        color: `rgba(255,255,255,${b.opacity})`,
                        transform: `rotate(${b.rotate}deg)`,
                        animation: `bubbleMove ${b.duration}s linear infinite`,
                        animationDelay: `${b.delay}s`,
                        userSelect: "none",
                        zIndex: 1,
                    }}
                >
                    {b.symbol}
                </Typography>
            ))}

            <Box sx={{ zIndex: 2, width: "100%", maxWidth: 420, px: 3 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 6,
                        backdropFilter: "blur(12px)",
                        background: mode === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(10, 25, 22, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }}
                >
                    <Stack spacing={3}>
                        {/* HEADER */}
                        <Stack alignItems="center" spacing={2}>
                            <Box
                                component="img"
                                src="/icons/image-app.png"
                                alt="BitOink"
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 3,
                                    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                                    backgroundColor: "white",
                                    p: 0.5
                                }}
                            />
                            <Box textAlign="center">
                                <Typography variant="h4" fontWeight={900} color={mode === 'light' ? 'primary.dark' : 'white'} sx={{ letterSpacing: -1 }}>
                                    Únete a BitOink
                                </Typography>
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                    Empieza a ahorrar de forma inteligente
                                </Typography>
                            </Box>
                        </Stack>

                        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <TextField
                                    label="Nombre Completo"
                                    name="name"
                                    fullWidth
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                                <TextField
                                    label="Contraseña"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        sx: { borderRadius: 3 },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    sx={{
                                        borderRadius: 3,
                                        py: 1.5,
                                        fontSize: "1rem",
                                        fontWeight: 800,
                                        textTransform: "none",
                                        boxShadow: "0 8px 20px rgba(31,191,159,0.3)",
                                        background: mode === 'light' ? undefined : 'linear-gradient(45deg, #1FBF9F 30%, #3BBF9B 90%)'
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Crear mi cuenta"}
                                </Button>
                            </Stack>
                        </Box>

                        <Typography variant="body2" textAlign="center" color="text.secondary">
                            ¿Ya tienes una cuenta?{" "}
                            <Link
                                component={RouterLink}
                                to="/login"
                                sx={{ fontWeight: 700, color: "primary.main", textDecoration: "none" }}
                            >
                                Inicia sesión
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>

            <style>{`
                @keyframes bubbleMove {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: ${mode === 'light' ? 0.3 : 0.15}; }
                    90% { opacity: ${mode === 'light' ? 0.3 : 0.15}; }
                    100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
                }
            `}</style>
        </Box>
    );
};

export default Register;