import express from "express";
import {
  registerUser,
  authUser,
  getUsers,
  updateUserProfile,
  saveCart,
  getCart,
  deleteUser,
  updateUserByAdmin,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);

router.get("/profile", protect, (req, res) => res.json(req.user)); // Get current user data
router.put("/profile", protect, updateUserProfile);

router.route("/cart").get(protect, getCart).post(protect, saveCart);

router.get("/", protect, admin, getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUserByAdmin);

export default router;
