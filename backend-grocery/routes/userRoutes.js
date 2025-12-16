import express from "express";
import {
  registerUser,
  authUser,
  getUsers,
  deleteUser,
  updateUserByAdmin
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", getUsers);
router.delete('/:id', deleteUser);
router.route('/:id').delete(deleteUser).put(updateUserByAdmin);

export default router;
