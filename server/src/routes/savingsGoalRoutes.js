const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
    createSavingsGoal,
    getSavingsGoals,
    updateSavingsGoal,
    deleteSavingsGoal,
} = require("../controllers/savingsGoalController");

router.post("/", protect, createSavingsGoal);
router.get("/", protect, getSavingsGoals);
router.put("/:id", protect, updateSavingsGoal);
router.delete("/:id", protect, deleteSavingsGoal);

module.exports = router;
