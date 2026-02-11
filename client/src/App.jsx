import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import PiggyBank from "./pages/PiggyBank";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./components/DashboardLayout";

function App() {
    return (
        <Routes>
            {/* LOGIN Y REGISTER  */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PÚBLICO */}
            <Route element={<Layout />}>
                <Route index element={<Home />} />
            </Route>

            {/* PRIVADO */}
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
            </Route>

            {/* ERROR 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
