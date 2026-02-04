import { useState, useMemo, useCallback } from "react";
import {
    ThemeProvider as MuiThemeProvider,
    CssBaseline,
} from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import { getTheme } from "../theme/theme";

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    const toggleTheme = useCallback(() => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    }, []);

    useMemo(() => {
        localStorage.setItem("theme", mode);
    }, [mode]);

    const muiTheme = useMemo(() => getTheme(mode), [mode]);

    const contextValue = useMemo(
        () => ({
            mode,
            toggleTheme,
        }),
        [mode, toggleTheme]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
