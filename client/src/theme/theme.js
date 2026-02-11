import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) => {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: { main: isLight ? "#1FBF9F" : "#2AE6C1" },
      background: { default: isLight ? "#f4fbf9" : "#0B1F1A", paper: isLight ? "#ffffff" : "#132B25" },
      text: { primary: isLight ? "#0B3D2E" : "#E6FFFA", secondary: isLight ? "#3a6b5f" : "#9ED8CC" },
      divider: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h3: { fontFamily: "'Rubik', sans-serif", fontWeight: 800 },
      h4: { fontFamily: "'Rubik', sans-serif", fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: { styleOverrides: { body: { transition: "background-color 0.3s ease, color 0.3s ease" } } },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: isLight ? "1px solid rgba(0,0,0,0.04)" : "1px solid rgba(255,255,255,0.05)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            boxShadow: isLight ? "0 6px 16px rgba(31,191,159,0.25)" : "0 6px 16px rgba(0,0,0,0.4)",
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: isLight ? "#ffffff" : "#0F2A23",
              borderRadius: 12,
              "&.Mui-focused fieldset": { borderColor: "#3BBF9B" },
            },
            "& label.Mui-focused": { color: "#3BBF9B" },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#ffffff" : "#132B25",
            color: isLight ? "#0B3D2E" : "#E6FFFA",
            boxShadow: "none",
            borderBottom: isLight ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.06)",
          },
        },
      },
    },
  });
};
