const User = require("../models/User");
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, amount, category, date } = req.body;

    if (!icon || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      amount,
      category,
      date: new Date(date),
    });

    await newExpense.save();
   res.status(201).json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    console.error("Error adding Expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  
    try{
      const expense = await Expense.find({ userId }).sort({ date: -1 });
      res.status(200).json(expense);
    }catch(error){
      console.error("Error fetching expenses:", error);
      res.status(500).json({message: "Server error"});
    }
};

exports.deleteExpense = async (req, res) => {
  try{
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Expense deleted successfully"});
  }catch(error){
    console.error("Error deleting expense:", error);
    res.status(500).json({message: "Server error"});
  }
};

exports.downloadincomeexcel = async (req, res) => {};
