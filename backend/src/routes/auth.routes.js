const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.put("/change-password", authMiddleware, authController.changePassword);

// ✅ Delete Account
router.delete("/delete-account", authMiddleware, authController.deleteAccount);

module.exports = router;
