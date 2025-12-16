import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch products",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, image, category, unit, stock, description } = req.body;

    const product = new Product({
      name,
      price,
      image,
      category,
      unit: unit || "1 unit",
      stock: stock || 0,
      description: description || "",
      // Assigning a dummy user ID for now since we haven't implemented auth middleware on this route yet
      user: "6418ae99b01f348b2f964444",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: error.message || "Invalid product data",
      });
  }
};
