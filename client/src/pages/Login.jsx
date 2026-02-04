import { useState, useContext } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Stack,
    Divider,
    Alert,
    Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

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

    const handleOAuth = (provider) => {
        alert(`Login con ${provider} (pendiente de implementar)`);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                backgroundColor: "background.default",
            }}
        >
            <Container maxWidth="xs">
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                    <Stack spacing={2}>
                        {/* Branding */}
                        <Typography variant="h5" fontWeight={600} textAlign="center">
                            💸 Control Gastos
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                        >
                            Accede a tu cuenta
                        </Typography>

                        <Divider />

                        {error && <Alert severity="error">{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    fullWidth
                                />

                                <TextField
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    fullWidth
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? "Entrando..." : "Entrar"}
                                </Button>
                            </Stack>
                        </Box>


                        <Divider>o continúa con</Divider>

                        <Stack spacing={1}>
                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<GoogleIcon />}
                                onClick={() => handleOAuth("Google")}
                            >
                                Google
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<GitHubIcon />}
                                onClick={() => handleOAuth("GitHub")}
                            >
                                GitHub
                            </Button>
                        </Stack>


                        <Typography variant="body2" textAlign="center">
                            ¿No tienes cuenta?{" "}
                            <Link component={RouterLink} to="/register">
                                Regístrate
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
