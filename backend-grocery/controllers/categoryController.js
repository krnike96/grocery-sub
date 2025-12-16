import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, image, desc } = req.body;
    const category = new Category({ name, image, desc });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: error.message || "Invalid category data",
      });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
