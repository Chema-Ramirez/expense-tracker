import { useState, useContext, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    Divider,
    Alert,
    Link,
    useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const symbols = ["€", "$", "€", "$", "€", "$", "€"];

const Login = () => {
    const { login } = useContext(AuthContext);
    const { mode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const isLandscape = useMediaQuery("(orientation: landscape)");

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
        const initialBubbles = Array.from({ length: 12 }, () => ({
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.random() * 40 + 20,
            left: Math.random() * 100,
            duration: Math.random() * 15 + 10,
            opacity: Math.random() * 0.5 + 0.3,
            rotate: Math.random() * 360,
            startBottom: -(Math.random() * 100 + 50),
            delay: Math.random() * 5,
        }));
        setBubbles(initialBubbles);
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await loginUser(form);
            login(res.user, res.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Credenciales incorrectas");
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
                flexDirection: "column",
                pt: "env(safe-area-inset-top)",
                pb: "env(safe-area-inset-bottom)",
                background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(180deg, #1FBF9F 0%, #0B3D2E 100%)"
                        : "linear-gradient(180deg, #0B1F1A 0%, #04110E 100%)",
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
                    }}
                >
                    {b.symbol}
                </Typography>
            ))}

            {/* CONTENIDO */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: isLandscape ? "flex-start" : "center",
                    overflowY: "auto",
                    px: 3,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        maxWidth: 420,
                        mx: "auto",
                        width: "100%",
                        py: isLandscape ? 2 : 0,
                    }}
                >
                    <Stack spacing={isLandscape ? 2 : 3}>
                        {/* HEADER */}
                        <Stack spacing={3} alignItems="center">
                            <Box
                                component="img"
                                src="/icons/image-app.png"
                                alt="BitOink"
                                sx={{
                                    width: isLandscape ? 72 : 120,
                                    height: isLandscape ? 72 : 120,
                                    borderRadius: 3,
                                    boxShadow: 4,
                                    backgroundColor: "white",
                                }}
                            />
                            <Typography
                                variant={isLandscape ? "h5" : "h3"}
                                fontWeight={800}
                                color="white"
                            >
                                BitOink
                            </Typography>
                            {!isLandscape && (
                                <Typography
                                    variant="body1"
                                    color="rgba(255,255,255,0.9)"
                                    textAlign="center"
                                >
                                    Gestiona tu dinero sin esfuerzo
                                </Typography>
                            )}
                        </Stack>

                        {error && <Alert severity="error">{error}</Alert>}

                        {/* FORM */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                {["email", "password"].map((field) => (
                                    <TextField
                                        key={field}
                                        label={field === "email" ? "Email" : "Contraseña"}
                                        name={field}
                                        type={field === "password" ? "password" : "text"}
                                        value={form[field]}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                borderRadius: 2,
                                                backgroundColor: mode === "light" ? "#fff" : "#222",
                                                color: mode === "light" ? "#111" : "#fff",
                                            },
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: mode === "light" ? "#555" : "#ccc",
                                                fontWeight: 600,
                                                "&.Mui-focused": { color: "#fbff00", fontWeight: 700 },
                                                transition: "0.3s",
                                            },
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                                borderColor: "#d8c72c",
                                                boxShadow: "0 0 0 2px rgba(255, 238, 0, 0.3)",
                                            },
                                        }}
                                    />
                                ))}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    sx={{
                                        borderRadius: 3,
                                        py: 1.2,
                                        backgroundColor: "white",
                                        color: "#3BBF9B",
                                        fontWeight: 800,
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Entrar"}
                                </Button>
                            </Stack>
                        </Box>

                        <Divider sx={{ color: "white", opacity: 0.8 }}>
                            o continúa con
                        </Divider>

                        <Stack spacing={1}>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    borderColor: "white",
                                    color: "white",
                                    textTransform: "none",
                                }}
                            >
                                Google
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    borderColor: "white",
                                    color: "white",
                                    textTransform: "none",
                                }}
                            >
                                GitHub
                            </Button>
                        </Stack>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            color="rgba(255,255,255,0.9)"
                        >
                            ¿No tienes cuenta?{" "}
                            <Link
                                component={RouterLink}
                                to="/register"
                                sx={{ color: "white", fontWeight: 600 }}
                            >
                                Regístrate
                            </Link>
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            {/* ANIMACIÓN BURBUJAS */}
            <style>{`
        @keyframes bubbleMove {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-50vh) rotate(180deg); opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
        </Box>
    );
};

export default Login;
