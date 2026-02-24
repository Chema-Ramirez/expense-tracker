import { useState, useContext } from "react";
import {
    Box, Button, TextField, Typography, Stack, Alert,
    Link, Divider, Paper, IconButton, InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff, Google, GitHub } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../context/AuthContext";
import { login as loginService } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const symbols = ["€", "$", "€", "$", "€", "$", "€"];

const Login = () => {
    const { login: loginContext } = useContext(AuthContext);
    const { mode } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [bubbles] = useState(() =>
        Array.from({ length: 12 }, () => ({
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.random() * 40 + 20,
            left: Math.random() * 100,
            duration: Math.random() * 15 + 10,
            opacity: Math.random() * 0.3 + 0.1,
            rotate: Math.random() * 360,
            startBottom: -(Math.random() * 100 + 50),
            delay: Math.random() * 5,
        }))
    );

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await loginService(form);
            const userData = res.user || res.data?.user;
            const token = res.token || res.data?.token;

            if (userData && token) {
                loginContext(userData, token);
                navigate("/dashboard");
            } else {
                console.error("Respuesta inesperada del servidor:", res);
                setError("Error en la respuesta del servidor");
            }
        } catch (err) {
            const message = err.response?.data?.message || "Credenciales incorrectas";
            setError(message);
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
            {/* BURBUJAS DE FONDO */}
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
                                    BitOink
                                </Typography>
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                    Gestión financiera inteligente
                                </Typography>
                            </Box>
                        </Stack>

                        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Stack spacing={2.5}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                                <TextField
                                    label="Contraseña"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    autoComplete="current-password"
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
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar Sesión"}
                                </Button>
                            </Stack>
                        </Box>

                        <Divider sx={{ my: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ px: 1, fontWeight: 600 }}>O CONTINÚA CON</Typography>
                        </Divider>

                        <Stack direction="row" spacing={2}>
                            <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ borderRadius: 3, textTransform: "none", borderColor: 'divider' }}>
                                Google
                            </Button>
                            <Button fullWidth variant="outlined" startIcon={<GitHub />} sx={{ borderRadius: 3, textTransform: "none", borderColor: 'divider' }}>
                                GitHub
                            </Button>
                        </Stack>

                        <Typography variant="body2" textAlign="center" color="text.secondary">
                            ¿No tienes cuenta?{" "}
                            <Link component={RouterLink} to="/register" sx={{ fontWeight: 700, color: "primary.main", textDecoration: "none" }}>
                                Regístrate
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

export default Login;