import { useState, useContext } from "react";
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
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const isLandscape = useMediaQuery("(orientation: landscape)");

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
                background: "linear-gradient(180deg, #5ED1B2 0%, #113d31 100%)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                pt: "env(safe-area-inset-top)",
                pb: "env(safe-area-inset-bottom)",
            }}
        >
            {/* Símbolo € */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            >
                <EuroSymbolIcon
                    sx={{
                        position: "absolute",
                        fontSize: isLandscape ? 260 : 420,
                        color: "rgba(0, 48, 25, 0.08)",
                        top: "-10%",
                        right: "-20%",
                        transform: "rotate(-15deg)",
                    }}
                />
            </Box>

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
                        <Stack spacing={1.2} alignItems="center">
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
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    fullWidth
                                    InputProps={{
                                        sx: {
                                            borderRadius: 2,
                                            backgroundColor: "white",
                                        },
                                    }}
                                />

                                <TextField
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    fullWidth
                                    InputProps={{
                                        sx: {
                                            borderRadius: 2,
                                            backgroundColor: "white",
                                        },
                                    }}
                                />

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
                                        fontWeight: 600,
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        "Entrar"
                                    )}
                                </Button>
                            </Stack>
                        </Box>

                        <Divider sx={{ color: "white", opacity: 0.6 }}>
                            o continúa con
                        </Divider>

                        {/* OAUTH */}
                        <Stack spacing={1}>
                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<GoogleIcon />}
                                sx={{ borderColor: "white", color: "white" }}
                            >
                                Google
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<GitHubIcon />}
                                sx={{ borderColor: "white", color: "white" }}
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
        </Box>
    );
};

export default Login;
