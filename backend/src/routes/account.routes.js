const express = require("express");

const router = express.Router();

const accountController = require("../controllers/account.controller");

const authMiddleware = require("../middleware/auth");


router.post("/", authMiddleware, accountController.createAccount);

router.get("/", authMiddleware, accountController.getAccounts);

router.delete("/:id", authMiddleware, accountController.deleteAccount);

module.exports = router;