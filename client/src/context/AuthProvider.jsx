import { useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);

    const login = async (userData, authToken) => {
        setLoading(true);
        try {
            setUser(userData);
            setToken(authToken);

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", authToken);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const value = useMemo(() => ({
        user,
        token,
        loading,
        login,
        logout,
    }), [user, token, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
