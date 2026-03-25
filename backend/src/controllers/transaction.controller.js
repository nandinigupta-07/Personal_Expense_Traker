const Transaction = require("../models/transaction.model");

// ✅ CREATE TRANSACTION
exports.createTransaction = async (req, res) => {
  try {
    const { categoryId, type, amount, description, date } = req.body;

    if (!categoryId || !type || !amount) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const transaction = new Transaction({
      categoryId,
      type,
      amount: Number(amount),
      description,
      date: date ? new Date(date) : new Date(),
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      data: transaction,
    });

  } catch (error) {
    console.log("❌ CREATE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET ALL TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("categoryId");

    res.status(200).json({
      success: true,
      data: transactions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET SINGLE TRANSACTION (🔥 IMPORTANT FIX)
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id)
      .populate("categoryId");

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ UPDATE
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ DELETE
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await Transaction.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Transaction deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};