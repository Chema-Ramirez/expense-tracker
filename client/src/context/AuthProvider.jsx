import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUser } from "../services/authService";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (!token) {
                setLoading(false);
                return;
            }

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            try {
                const response = await getCurrentUser();

                const userData = response.user || response;

                if (userData) {
                    setUser(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };
    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};