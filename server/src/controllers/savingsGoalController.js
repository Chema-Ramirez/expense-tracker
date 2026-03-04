const SavingsGoal = require("../models/SavingsGoal");

// CREATE
const createSavingsGoal = async (req, res) => {
    try {
        const { name, targetAmount, category, suggestedAmount } = req.body;

        if (!name || !targetAmount) {
            return res.status(400).json({ message: "Se requiere Nombre y Cantidad Objetivo" });
        }

        const goal = await SavingsGoal.create({
            name,
            targetAmount,
            category: category || "otros",
            suggestedAmount: suggestedAmount || 0,
            currentAmount: 0,
            user: req.user.id,
        });

        res.status(201).json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET ALL 
const getSavingsGoals = async (req, res) => {
    try {
        const goals = await SavingsGoal.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE
const updateSavingsGoal = async (req, res) => {
    try {
        const goal = await SavingsGoal.findById(req.params.id);

        if (!goal) return res.status(404).json({ message: "Objetivo de ahorro no encontrado" });
        if (goal.user.toString() !== req.user.id)
            return res.status(403).json({ message: "No autorizado" });

        if (req.body.suggestedAmount !== undefined) {
            req.body.suggestedAmount = Math.max(req.body.suggestedAmount, 0);
        }

        const updated = await SavingsGoal.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// DELETE
const deleteSavingsGoal = async (req, res) => {
    try {
        const goal = await SavingsGoal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: "Objetivo de ahorro no encontrado" });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "No Autorizado" });
        }

        await goal.deleteOne();
        res.json({ message: "Objetivo de ahorro eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createSavingsGoal,
    getSavingsGoals,
    updateSavingsGoal,
    deleteSavingsGoal,
};
