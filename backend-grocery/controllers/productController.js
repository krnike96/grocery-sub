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
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      user: "6418ae99b01f348b2f964444",
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Invalid product data",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock, unit } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.unit = unit || product.unit;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
