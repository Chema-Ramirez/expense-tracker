import api from "../api/api";

// LOGIN
export const login = async (credentials) => {
    try {
        const res = await api.post("/auth/login", credentials);
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || "Error al iniciar sesión";
        throw new Error(message);
    }
};

// REGISTER
export const register = async (data) => {
    try {
        const res = await api.post("/auth/register", data);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || "Error al registrar usuario";
        throw new Error(message);
    }
};

// GET CURRENT USER
export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const res = await api.get("/auth/me");
        return res.data.user;
    } catch (err) {
        console.error("Error fetching current user:", err);
        return null;
    }
};

// LOGOUT
export const logout = async () => {
    try {
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
