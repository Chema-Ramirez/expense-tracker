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
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/authService";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await registerUser(formData);
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
                            Crea tu cuenta
                        </Typography>

                        <Divider />

                        {error && <Alert severity="error">{error}</Alert>}

                        {/* FORM */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Nombre"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                />

                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                />

                                <TextField
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? "Creando cuenta..." : "Registrarse"}
                                </Button>
                            </Stack>
                        </Box>

                        {/* CTA Login */}
                        <Typography variant="body2" textAlign="center">
                            ¿Ya tienes cuenta?{" "}
                            <Link component={RouterLink} to="/login">
                                Inicia sesión
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;
