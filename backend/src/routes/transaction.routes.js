const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, transactionController.createTransaction);

router.get("/", authMiddleware, transactionController.getTransactions);

router.put("/:id", authMiddleware, transactionController.updateTransaction);

router.delete("/:id", authMiddleware, transactionController.deleteTransaction);

module.exports = router;