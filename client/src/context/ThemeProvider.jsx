import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");

    const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
