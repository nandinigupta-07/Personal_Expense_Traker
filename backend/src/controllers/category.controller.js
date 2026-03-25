const Category = require("../models/category.model");

// ✅ GET ALL CATEGORIES (user-wise)
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      userId: req.user.id, // ✅ user specific data
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

    // validation
    if (!name || !type) {
      return res.status(400).json({ message: "Name and type required" });
    }

    // check existing (user-wise)
    const existing = await Category.findOne({
      name: name.toLowerCase(),
      type,
      userId: req.user.id, // ✅ IMPORTANT
    });

    if (existing) {
      return res.status(200).json({ category: existing });
    }

    // create new category
    const newCategory = new Category({
      name: name.toLowerCase(),
      type,
      userId: req.user.id, // ✅ FIX HERE
    });

    await newCategory.save();

    res.status(201).json({ category: newCategory });

  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getCategories,
  createCategory,
};