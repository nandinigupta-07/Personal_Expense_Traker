const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budget.controller");
const authMiddleware = require("../middlewares/auth.middleware");


// Create Budget
router.post("/", authMiddleware, budgetController.createBudget);


// Get All Budgets
router.get("/", authMiddleware, budgetController.getBudgets);


// Update Budget
router.put("/:id", authMiddleware, budgetController.updateBudget);


// Delete Budget
router.delete("/:id", authMiddleware, budgetController.deleteBudget);


module.exports = router;