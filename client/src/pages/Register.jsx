import { useState, useContext, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    Alert,
    Link,
    useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const symbols = ["€", "$", "€", "$", "€", "$", "€"];

const Register = () => {
    const { login } = useContext(AuthContext);
    const { mode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const isLandscape = useMediaQuery("(orientation: landscape)");

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [bubbles, setBubbles] = useState([]);

    // BURBUJAS UNA VEZ
    useEffect(() => {
        const initialBubbles = Array.from({ length: 12 }, () => ({
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.random() * 40 + 20,
            left: Math.random() * 100,
            duration: Math.random() * 15 + 10,
            opacity: Math.random() * 0.5 + 0.3,
            rotate: Math.random() * 360,
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
            const data = await registerUser(form);
            login(data.user, data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Error al crear la cuenta");
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
                        bottom: "-50px",
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
                        <Stack spacing={3} alignItems="center" sx={{ mb: 4 }}>
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
                                    Crea tu cuenta y comienza a ahorrar
                                </Typography>
                            )}
                        </Stack>

                        {error && <Alert severity="error">{error}</Alert>}

                        {/* FORM */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                {["name", "email", "password"].map((field) => (
                                    <TextField
                                        key={field}
                                        label={field === "name" ? "Nombre" : field === "email" ? "Email" : "Contraseña"}
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
                                                "&.Mui-focused": { color: field === "password" ? "#0B3D2E" : "#fbff00" },
                                                fontWeight: 600,
                                                transition: "0.3s",
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
                                    {loading ? <CircularProgress size={24} /> : "Registrarse"}
                                </Button>
                            </Stack>
                        </Box>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            color="rgba(255,255,255,0.9)"
                        >
                            ¿Ya tienes cuenta?{" "}
                            <Link component={RouterLink} to="/login" sx={{ color: "white", fontWeight: 600 }}>
                                Inicia sesión
                            </Link>
                        </Typography>
                    </Stack>
                </Box>
            </Box>

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

export default Register;
