import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [loading, setLoading] = useState(false);

    // LOGIN
    const login = async (userData, authToken) => {
        setLoading(true);

        try {
            setUser(userData);
            setToken(authToken);

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", authToken);
        } catch (error) {
            console.error("Error en login:", error);
        } finally {
            setLoading(false);
        }
    };

    // LOGOUT
    const logout = () => {
        setLoading(true);

        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
