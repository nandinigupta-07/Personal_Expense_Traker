const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  deleteCategory, // ✅ ADD THIS
} = require("../controllers/category.controller");

const auth = require("../middleware/auth");

// ✅ GET all categories (user wise)
router.get("/", auth, getCategories);

// ✅ CREATE new category
router.post("/", auth, createCategory);

// ✅ DELETE category (NEW 🔥)
router.delete("/:id", auth, deleteCategory);

module.exports = router;