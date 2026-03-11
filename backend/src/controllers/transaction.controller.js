const Transaction = require("../models/transaction.model");
// Create Transaction
exports.createTransaction = async (req, res) => {
  try {

    const { accountId, categoryId, type, amount, description, date } = req.body;

    const transaction = await Transaction.create({
      userId: req.user.id,
      accountId,
      categoryId,
      type,
      amount,
      description,
      date
    });

    res.status(201).json({
      success: true,
      data: transaction
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
//  Get All Transactions
exports.getTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find({
      userId: req.user.id
    })
    .populate("categoryId")
    .populate("accountId");

    res.status(200).json({
      success: true,
      data: transactions
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Transaction

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
      data: transaction
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {

    const { id } = req.params;

    await Transaction.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Transaction deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};