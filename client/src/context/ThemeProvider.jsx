import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem('bitOink_theme') || 'light';
    });

    useEffect(() => {
        localStorage.setItem('bitOink_theme', mode);
    }, [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: { main: '#1FBF9F' },
            background: {
                default: mode === 'light' ? '#F9FAFB' : '#0B1F1A',
                paper: mode === 'light' ? '#FFFFFF' : '#122B25',
            }
        },
        shape: {
            borderRadius: 12,
        },
        typography: {
            fontFamily: "'Inter', sans-serif",
        }
    }), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleColorMode }}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};