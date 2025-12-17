import express from "express";
import {
  addOrderItems,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getMySubscriptions,
  cancelSubscription,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.get("/my-subscriptions", protect, getMySubscriptions);
router.delete("/subscription/:id/cancel", protect, cancelSubscription);
router.route("/:id").delete(protect, admin, deleteOrder);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
