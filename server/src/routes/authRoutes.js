const express = require("express");
const router = express.Router();
const { register, login, getCurrentUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// RUTA PUBLICA
router.post("/register", register);
router.post("/login", login);

// RUTA PROTEGIDA
router.get("/me", protect, getCurrentUser);

module.exports = router;
