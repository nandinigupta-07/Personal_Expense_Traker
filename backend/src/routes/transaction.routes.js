const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middleware/auth");

// ✅ CREATE
router.post("/", authMiddleware, transactionController.createTransaction);

// ✅ GET ALL
router.get("/", authMiddleware, transactionController.getTransactions);

// ✅ GET ONE (🔥 IMPORTANT ADD)
router.get("/:id", authMiddleware, transactionController.getTransactionById);

// ✅ UPDATE
router.put("/:id", authMiddleware, transactionController.updateTransaction);

// ✅ DELETE
router.delete("/:id", authMiddleware, transactionController.deleteTransaction);

module.exports = router;