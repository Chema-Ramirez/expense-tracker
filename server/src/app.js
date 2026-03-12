const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const savingsGoalRoutes = require("./routes/savingsGoalRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

connectDB();

// CONFIG CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://bitoink.netlify.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        console.log("Petición desde el origen:", origin);

        const normalizedOrigin = origin ? origin.replace(/\/$/, "") : null;

        if (!origin || allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            console.error("BLOQUEADO POR CORS:", origin);
            callback(new Error("Acceso denegado por CORS"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// MIDDLEWARE JSON
app.use(express.json());

// RUTAS
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/savings", savingsGoalRoutes);

// RUTA PUBLICA
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "API working" });
});

//RUTA PRIVADA
app.get("/api/private", protect, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user,
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});
