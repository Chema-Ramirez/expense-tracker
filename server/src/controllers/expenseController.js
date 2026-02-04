const Expense = require("../models/Expense");

//CREATE EXPENSE
const createExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;

        if (!amount || !category) {
            return res.status(400).json({ message: "Amount and category are required" });
        }

        const expense = await Expense.create({
            amount, category, description, date, user: req.user.id
        });

        res.status(201).json({
            message: "Expense created successfully",
            expense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    };
};


//GET USER EXPENSES WITH FILTERS
const getExpenses = async (req, res) => {
    try {
        const { category, startDate, endDate } = req.query;

        const filters = { user: req.user.id }

        if (category) { filters.category = category }

        if (startDate || endDate) {
            filters.date = {};
            if (startDate) filters.date.$gte = new Date(startDate);
            if (endDate) filters.date.$lte = new Date(endDate);
        }

        const expenses = await Expense.find(filters).sort({ date: -1 });
        res.json(expenses);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    };
};


//UPDATE EXPENSE
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updateExpense = await Expense.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );

        res.json(updateExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//DELETE EXPENSE
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }
        await expense.deleteOne();

        res.json({ message: "Expense removed" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }
}


module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };