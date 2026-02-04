import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") => createTheme({
  palette: {
    mode,
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: mode === "dark" ? "#121212" : "#f5f5f5",
      paper: mode === "dark" ? "#1d1d1d" : "#fff",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});
