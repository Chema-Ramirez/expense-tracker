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
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
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
    console.log(`Server running on port ${PORT}`);
});
