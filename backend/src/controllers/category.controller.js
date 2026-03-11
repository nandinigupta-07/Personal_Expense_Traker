const Category = require("../models/category.model");


// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {

    const { name, type } = req.body;

    const category = await Category.create({
      userId: req.user.id,
      name,
      type
    });

    res.status(201).json({
      message: "Category created successfully",
      category
    });

  } catch (error) {

    console.log("Create Category Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {

    const categories = await Category.find({
      userId: req.user.id
    });

    res.status(200).json(categories);

  } catch (error) {

    console.log("Get Categories Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  try {

    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      message: "Category deleted successfully"
    });

  } catch (error) {

    console.log("Delete Category Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};