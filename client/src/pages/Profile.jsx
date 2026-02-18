import {
    Container, Typography, Box, Paper, Stack,
    Avatar, Button, Switch, ListItem, ListItemText,
    ListItemIcon, IconButton, Badge
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Profile = () => {
    const { user, logout } = useAuth();
    const { mode, toggleColorMode } = useContext(ThemeContext);

    const handleEditPhoto = () => {
        console.log("Abrir selector de archivos...");
    };

    const handleEditData = () => {
        console.log("Abrir modal de edición de datos...");
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
            <Typography variant="h4" fontWeight={900} mb={4}>Mi Perfil</Typography>

            {/* USUARIO Y FOTO */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: "1px solid", borderColor: "divider", mb: 3 }}>
                <Stack alignItems="center" spacing={2}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <IconButton
                                onClick={handleEditPhoto}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    width: 32, height: 32
                                }}
                            >
                                <PhotoCameraIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        }
                    >
                        <Avatar
                            src={user?.avatarUrl} // URL que vendrá del backend
                            sx={{ width: 100, height: 100, bgcolor: "primary.main", fontSize: 40 }}
                        >
                            {user?.name?.charAt(0)}
                        </Avatar>
                    </Badge>

                    <Box textAlign="center">
                        <Typography variant="h6" fontWeight={800}>{user?.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={handleEditData}
                        sx={{ borderRadius: 2, textTransform: "none", mt: 1 }}
                    >
                        Editar mis datos
                    </Button>
                </Stack>
            </Paper>

            {/* PREFERENCIAS */}
            <Typography variant="subtitle2" color="text.secondary" mb={1} ml={1}>Preferencias de la App</Typography>
            <Paper elevation={0} sx={{ borderRadius: 5, border: "1px solid", borderColor: "divider", overflow: "hidden", mb: 3 }}>
                <ListItem>
                    <ListItemIcon><DarkModeIcon color="primary" /></ListItemIcon>
                    <ListItemText
                        primary="Modo Oscuro"
                        secondary={mode === 'dark' ? "Activado" : "Desactivado"}
                    />
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleColorMode}
                        color="primary"
                    />
                </ListItem>
            </Paper>

            {/* LOGOUT */}
            <Button
                fullWidth
                variant="text"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={logout}
                sx={{ py: 1.5, fontWeight: 700, textTransform: "none" }}
            >
                Cerrar Sesión
            </Button>
        </Container>
    );
};

export default Profile;