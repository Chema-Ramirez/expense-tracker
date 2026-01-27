import { Routes, Route } from "react-router-dom";
import Expenses from "./pages/Expenses.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Expenses />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
