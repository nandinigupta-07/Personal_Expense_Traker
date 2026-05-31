const Category = require("../models/category.model");

// ✅ GET ALL CATEGORIES (user-wise)
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      userId: req.user.id,
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type required" });
    }

    const formattedName = name.trim().toLowerCase();

    // ✅ duplicate check (user-wise + type)
    const existing = await Category.findOne({
      name: formattedName,
      type,
      userId: req.user.id,
    });

    if (existing) {
      return res.status(200).json({ category: existing });
    }

    const newCategory = new Category({
      name: formattedName,
      type,
      userId: req.user.id,
    });

    await newCategory.save();

    res.status(201).json({ category: newCategory });

  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ DELETE CATEGORY (NEW 🔥)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // check category exists for that user
    const category = await Category.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // delete
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully ✅" });

  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory, // ✅ export added
};