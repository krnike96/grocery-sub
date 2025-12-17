import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
