const Transaction = require("../models/transaction.model");


// DASHBOARD SUMMARY
exports.getDashboardData = async (req, res) => {
  try {

    const userId = req.user.id;

    const transactions = await Transaction.find({ userId });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    const recentTransactions = await Transaction
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalIncome,
      totalExpense,
      balance,
      recentTransactions
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// MONTHLY EXPENSES (for chart)
exports.getMonthlyExpenses = async (req, res) => {
  try {

    const userId = req.user.id;

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          type: "expense"
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// EXPENSE BY CATEGORY (for pie chart)
exports.getExpenseByCategory = async (req, res) => {
  try {

    const userId = req.user.id;

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          type: "expense"
        }
      },
      {
        $group: {
          _id: "$categoryId",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};