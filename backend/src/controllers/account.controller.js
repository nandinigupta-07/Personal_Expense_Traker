const Account = require("../models/account.model");


// CREATE ACCOUNT
exports.createAccount = async (req, res) => {
  try {

    const { name, type, balance } = req.body;

    const account = await Account.create({
      userId: req.user.id,
      name,
      type,
      balance
    });

    res.status(201).json({
      message: "Account created successfully",
      account
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


// GET ALL ACCOUNTS
exports.getAccounts = async (req, res) => {
  try {

    const accounts = await Account.find({ userId: req.user.id });

    res.status(200).json(accounts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


// DELETE ACCOUNT
exports.deleteAccount = async (req, res) => {
  try {

    const { id } = req.params;

    await Account.findByIdAndDelete(id);

    res.status(200).json({
      message: "Account deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};