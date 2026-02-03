import api from "../api/api";

export const loginUser = async (data) => {
    try {
        const res = await api.post("/auth/login", data);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || "Error al iniciar sesión";
        throw new Error(message);
    }
};

export const registerUser = async (data) => {
    try {
        const res = await api.post("/auth/register", data);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || "Error al registrar usuario";
        throw new Error(message);
    }
};
