import Order from "../models/orderModel.js";
import Subscription from "../models/subscriptionModel.js";

// @desc    Create new order and/or subscription
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      subscriptions,
      shippingAddress,
      totalPrice,
      paymentMethod,
    } = req.body;

    // 1. Validation Logic
    if (
      (!orderItems || orderItems.length === 0) &&
      (!subscriptions || subscriptions.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: "No items or subscriptions provided" });
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city) {
      return res
        .status(400)
        .json({ message: "Shipping address is incomplete" });
    }

    // 2. Process One-time Orders
    let createdOrder = null;
    if (orderItems && orderItems.length > 0) {
      const order = new Order({
        user: req.user._id,
        orderItems: orderItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product || item._id, // Support both formats
        })),
        shippingAddress,
        paymentMethod: paymentMethod || "Card",
        totalPrice: totalPrice || 0,
        isPaid: true,
        paidAt: Date.now(),
      });
      createdOrder = await order.save();
    }

    // 3. Process Subscriptions
    if (subscriptions && subscriptions.length > 0) {
      const subDocs = subscriptions.map((sub) => ({
        user: req.user._id,
        product: sub.product || sub._id,
        frequency: sub.frequency || "Daily",
        status: "Active",
        startDate: new Date(),
      }));
      await Subscription.insertMany(subDocs);
    }

    res.status(201).json({
      success: true,
      order: createdOrder,
      subscriptionCount: subscriptions ? subscriptions.length : 0,
    });
  } catch (error) {
    console.error("Order Controller Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
