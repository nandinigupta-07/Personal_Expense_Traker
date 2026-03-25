const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
} = require("../controllers/category.controller");

const auth = require("../middleware/auth"); // ✅ IMPORTANT (token verify)

// ✅ GET all categories (user wise)
router.get("/", auth, getCategories);

// ✅ CREATE new category
router.post("/", auth, createCategory);

module.exports = router;