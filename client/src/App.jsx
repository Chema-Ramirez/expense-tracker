import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";

// PAGES
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import PiggyBank from "./pages/PiggyBank";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// LAYOUTS
import DashboardLayout from "./components/DashboardLayout";

function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box sx={{
                height: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#0B1F1A"
            }}>
                <CircularProgress sx={{ color: "#1FBF9F" }} size={60} thickness={5} />
            </Box>
        );
    }

    return (
        <Routes>
            {/* RUTA RAÍZ*/}
            <Route
                path="/"
                element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
            />

            {/* RUTAS PÚBLICAS*/}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />

            {/* RUTAS PRIVADAS */}
            <Route
                element={
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/piggybank" element={<PiggyBank />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* ERROR 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;