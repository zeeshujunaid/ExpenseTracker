const User = require("../models/User");
const Income = require("../models/income");

exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, amount, category, date } = req.body;

    if (!icon || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newincome = new Income({
      userId,
      icon,
      amount,
      category,
      date: new Date(date),
    });

    await newincome.save();
    res
      .status(201)
      .json({ message: "Income added successfully", income: newincome });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllIncomes = async (req, res) => {
  const userId = req.user.id; 

  try{
    const income = await Income.find({userId}).sort({date: -1});
    res.status(200).json(income);
  }catch(error){
    console.error("Error fetching incomes:", error);
    res.status(500).json({message: "Server error"});
  }
};

exports.deleteIncome = async (req, res) => {
  try{
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Income deleted successfully"});
  }catch(error){
    console.error("Error deleting income:", error);
    res.status(500).json({message: "Server error"});
  }
};

exports.downloadincomeexcel = async (req, res) => {
  try {
    res.status(200).json({ message: "Coming Soon" });
  } catch (error) {
    console.error("Error in downloadExpenseExcel:", error);
    res.status(500).json({ message: "coming" });
  }
};
