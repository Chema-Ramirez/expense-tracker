import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#1FBF9F",
      light: "#4CE0C3",
      dark: "#148F76",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#d8c72c",
    },
    background: {
      default: mode === "light" ? "#F5F7FA" : "#121212",
      paper: mode === "light" ? "#FFFFFF" : "#1E1E1E",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.01em" },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600, fontSize: "1rem" },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          padding: "12px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: mode === "light"
            ? "0px 4px 20px rgba(0, 0, 0, 0.04)"
            : "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    // MODALES REDONDEADOS
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "24px",
          padding: "8px",
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));