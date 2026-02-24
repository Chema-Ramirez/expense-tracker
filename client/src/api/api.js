import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
});

//INTERCEPTOR DE PETICION
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            const cleanToken = token.startsWith('"') && token.endsWith('"')
                ? token.slice(1, -1)
                : token;

            config.headers.Authorization = `Bearer ${cleanToken}`;
        } else {
            console.warn("Petición sin token a:", config.url);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// INTERCEPTOR DE RESPUESTA
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config.url.includes("/login")) {
            console.error("401 detectado. Motivo:", error.response.data?.message);

            const msg = error.response.data?.message;
            if (msg === "No autorizado" || msg === "Token inválido o expirado") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;