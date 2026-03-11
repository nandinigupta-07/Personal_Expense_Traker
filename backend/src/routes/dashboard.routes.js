const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, dashboardController.getDashboardData);

router.get("/monthly-expenses",
 authMiddleware,
 dashboardController.getMonthlyExpenses
);

router.get("/category-expenses",
 authMiddleware,
 dashboardController.getExpenseByCategory
);

module.exports = router;