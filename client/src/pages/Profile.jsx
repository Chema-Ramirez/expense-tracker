import {
    Container, Typography, Box, Paper, Stack,
    Avatar, Button, Switch, ListItem, ListItemText,
    ListItemIcon, IconButton, Badge, TextField, LinearProgress
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from "../hooks/useAuth";
import { useContext, useState, useRef, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ModalWrapper from "../components/ModalWrapper";
import { useExpenses } from "../hooks/useExpenses";
import { getCategoryConfig, CATEGORIES } from "../utils/categoryHelpers";

const Profile = () => {
    const { user, logout } = useAuth();
    const { mode, toggleColorMode } = useContext(ThemeContext);
    const { expenses } = useExpenses();
    const fileInputRef = useRef(null);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openPassModal, setOpenPassModal] = useState(false);
    const [notifications, setNotifications] = useState(true);

    // LÓGICA DE DATOS 
    const { topExpenses, categoryStats } = useMemo(() => {
        const lowCaseCategories = CATEGORIES.map(cat => cat.id.toLowerCase());
        const incomeKeywords = ['ingreso', 'nomina', 'ingresos', 'salary'];

        const onlyExpenses = expenses.filter(e => {
            const catId = e.category?.toLowerCase().trim() || '';
            const isIncome = incomeKeywords.includes(catId);
            return lowCaseCategories.includes(catId) && !isIncome;
        });

        const top = [...onlyExpenses]
            .sort((a, b) => Math.abs(Number(b.amount)) - Math.abs(Number(a.amount)))
            .slice(0, 3);

        const grouped = onlyExpenses.reduce((acc, curr) => {
            const catId = curr.category?.toLowerCase().trim() || 'otros';
            const config = getCategoryConfig(catId);
            const amount = Math.abs(Number(curr.amount));

            if (!acc[config.label]) {
                acc[config.label] = { amount: 0, color: config.color };
            }
            acc[config.label].amount += amount;
            return acc;
        }, {});

        const maxVal = Math.max(...Object.values(grouped).map(g => g.amount), 1);

        const stats = Object.entries(grouped).map(([name, data]) => ({
            name,
            color: data.color,
            amount: data.amount,
            percentage: (data.amount / maxVal) * 100
        })).sort((a, b) => b.amount - a.amount);

        return { topExpenses: top, categoryStats: stats };
    }, [expenses]);

    return (
        <Container maxWidth="sm" sx={{ py: 2, pb: 2 }}>
            <Box mb={3}>
                <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                    <PersonIcon color="primary" sx={{ fontSize: 32 }} />
                    <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -1.5 }}>
                        Mi Perfil
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    Edita tu información personal y revisa tus estadísticas de gastos
                </Typography>
            </Box>

            {/* HEADER */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 4 }}>
                <Stack alignItems="center" spacing={2}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <IconButton onClick={() => fileInputRef.current.click()} sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, width: 32, height: 32 }}>
                                <PhotoCameraIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        }
                    >
                        <Avatar src={user?.avatarUrl} sx={{ width: 100, height: 100, bgcolor: "primary.main", fontSize: 40, fontWeight: 900 }}>
                            {user?.name?.charAt(0)}
                        </Avatar>
                    </Badge>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
                    <Box textAlign="center">
                        <Typography variant="h6" fontWeight={900}>{user?.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                    </Box>
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setOpenEditModal(true)} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}>
                        Editar Perfil
                    </Button>
                </Stack>
            </Paper>

            {/* MAYORES GASTOS */}
            <Typography variant="subtitle2" color="text.secondary" mb={1} ml={3} fontWeight={800}>Mayores Gastos </Typography>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 4 }}>
                {topExpenses.length > 0 ? (
                    <Stack spacing={2}>
                        {topExpenses.map((exp, i) => {
                            const config = getCategoryConfig(exp.category);
                            return (
                                <Stack key={exp.id || i} direction="row" justifyContent="space-between" alignItems="center">
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar sx={{ bgcolor: `${config.color}15`, color: config.color, width: 40, height: 40 }}>
                                            {config.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" fontWeight={800}>{exp.description || config.label}</Typography>
                                        </Box>
                                    </Stack>
                                    <Typography variant="body2" fontWeight={900} color="error.main">
                                        -{Math.abs(exp.amount).toLocaleString()} €
                                    </Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                ) : (
                    <Typography variant="body2" color="text.disabled" sx={{ p: 2, textAlign: 'center' }}>No hay gastos registrados</Typography>
                )}
            </Paper>

            {/* GRÁFICA DE BARRAS */}
            <Typography variant="subtitle2" color="text.secondary" mb={1} ml={3} fontWeight={800}>Gasto por Categoría</Typography>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 4 }}>
                {categoryStats.length > 0 ? (
                    <Stack spacing={2.5}>
                        {categoryStats.slice(0, 5).map((cat) => (
                            <Box key={cat.name}>
                                <Stack direction="row" justifyContent="space-between" mb={0.5}>
                                    <Typography variant="caption" fontWeight={800}>{cat.name}</Typography>
                                    <Typography variant="caption" fontWeight={800}>{cat.amount.toLocaleString()} €</Typography>
                                </Stack>
                                <LinearProgress
                                    variant="determinate"
                                    value={cat.percentage}
                                    sx={{
                                        height: 8,
                                        borderRadius: 5,
                                        bgcolor: `${cat.color}15`,
                                        '& .MuiLinearProgress-bar': { bgcolor: cat.color, borderRadius: 5 }
                                    }}
                                />
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center' }}>Sin datos de categorías</Typography>
                )}
            </Paper>

            {/* AJUSTES */}
            <Typography variant="subtitle2" color="text.secondary" mb={1} ml={3} fontWeight={800}>Preferencias</Typography>
            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", overflow: "hidden", mb: 4 }}>
                <ListItem divider>
                    <ListItemIcon><DarkModeIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={<Typography fontWeight={700}>Modo Oscuro</Typography>} secondary="Cambiar apariencia" />
                    <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
                </ListItem>
                <ListItem divider>
                    <ListItemIcon><NotificationsIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={<Typography fontWeight={700}>Notificaciones</Typography>} secondary="Recibir notificaciones" />
                    <Switch checked={notifications} onChange={() => setNotifications(!notifications)} />
                </ListItem>
                <ListItem button onClick={() => setOpenPassModal(true)}>
                    <ListItemIcon><SecurityIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={<Typography fontWeight={700}>Seguridad</Typography>} secondary="Cambiar contraseña" />
                    <EditIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                </ListItem>
            </Paper>

            <Button fullWidth variant="text" color="error" startIcon={<LogoutIcon />} onClick={logout} sx={{ py: 1.5, fontWeight: 700, textTransform: "none" }}>
                Cerrar Sesión
            </Button>

            {/* MODALES */}
            <ModalWrapper open={openEditModal} onClose={() => setOpenEditModal(false)} title="Editar Datos">
                <Stack spacing={2} pt={1}>
                    <TextField fullWidth label="Nombre" defaultValue={user?.name} variant="filled" />
                    <TextField fullWidth label="Email" defaultValue={user?.email} variant="filled" />
                    <Button variant="contained" fullWidth sx={{ py: 1.5, borderRadius: 3, fontWeight: 800 }}>Guardar Cambios</Button>
                </Stack>
            </ModalWrapper>

            <ModalWrapper open={openPassModal} onClose={() => setOpenPassModal(false)} title="Seguridad">
                <Stack spacing={2} pt={1}>
                    <TextField fullWidth type="password" label="Contraseña Actual" variant="filled" />
                    <TextField fullWidth type="password" label="Nueva Contraseña" variant="filled" />
                    <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, borderRadius: 3, fontWeight: 800 }}>Actualizar Contraseña</Button>
                </Stack>
            </ModalWrapper>
        </Container>
    );
};

export default Profile;