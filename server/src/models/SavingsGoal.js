const mongoose = require("mongoose");

const savingsGoalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            default: "otros",
            required: true
        },
        targetAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        currentAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        suggestedAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SavingsGoal", savingsGoalSchema);
