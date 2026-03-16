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
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const userWithPersistentAvatar = {
            ...userData,
            avatarUrl: (savedUser && savedUser.email === userData.email)
                ? savedUser.avatarUrl
                : userData.avatarUrl
        };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userWithPersistentAvatar));
        setUser(userWithPersistentAvatar);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const updateProfile = (newData) => {
        setUser((prevUser) => {
            const updatedUser = { ...prevUser, ...newData };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return updatedUser;
        });
    };

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};