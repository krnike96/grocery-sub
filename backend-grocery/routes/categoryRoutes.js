import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory );
router.get("/get-categories", getCategories)

export default router;
