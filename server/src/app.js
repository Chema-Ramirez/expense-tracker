const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes)

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "API working" });
});

app.get("/api/private", protect, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
