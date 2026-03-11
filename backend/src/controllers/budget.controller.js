const Budget = require("../models/budget.model");

// Create Budget
exports.createBudget = async (req, res) => {
  try {

    const { categoryId, monthlyLimit, month, year } = req.body;

    const budget = await Budget.create({
      userId: req.user.id,
      categoryId,
      monthlyLimit,
      month,
      year
    });

    res.status(201).json({
      success: true,
      data: budget
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Get All Budgets
exports.getBudgets = async (req, res) => {
  try {

    const budgets = await Budget.find({
      userId: req.user.id
    }).populate("categoryId");

    res.status(200).json({
      success: true,
      data: budgets
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Update Budget
exports.updateBudget = async (req, res) => {
  try {

    const { id } = req.params;

    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found"
      });
    }

    res.status(200).json({
      success: true,
      data: budget
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Delete Budget
exports.deleteBudget = async (req, res) => {
  try {

    const { id } = req.params;

    const budget = await Budget.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};