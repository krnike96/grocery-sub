import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Subscription from "../models/subscriptionModel.js";

export const addOrderItems = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "No request body found" });
    }
    const {
      orderItems,
      subscriptions,
      shippingAddress,
      totalPrice,
      paymentMethod,
    } = req.body;

    if (
      (!orderItems || orderItems.length === 0) &&
      (!subscriptions || subscriptions.length === 0)
    ) {
      return res.status(400).json({ message: "No items provided" });
    }

    // 1. Verify Stock for One-Time Items BEFORE creating order
    if (orderItems && orderItems.length > 0) {
      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product not found: ${item.name}` });
        }
        if (product.stock < item.qty) {
          return res.status(400).json({
            message: `Insufficient stock for ${item.name}. Only ${product.stock} left.`,
          });
        }
      }
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      status: "Pending",
    });

    const createdOrder = await order.save();

    // 2. Handle Subscriptions: Insert into Subscription collection
    if (subscriptions && subscriptions.length > 0) {
      const subDocs = subscriptions.map((sub) => ({
        user: req.user._id,
        product: sub.product,
        frequency: sub.frequency || "Daily",
        status: "Active",
        startDate: new Date(),
      }));
      await Subscription.insertMany(subDocs);
    }

    res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name email");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;

    if (req.body.status === "Delivered" && !order.isDelivered) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock = product.stock - item.qty;
          await product.save();
        }
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

//   Delete order (Admin)
export const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.deleteOne();
    res.json({ message: "Order removed" });
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

export const getMySubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user._id }).populate(
      "product"
    );
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscriptions" });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);

    if (sub && sub.user.toString() === req.user._id.toString()) {
      // Changed from updating status to actual deletion for synchronization
      await sub.deleteOne();
      res.json({ message: "Subscription removed and cancelled successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Subscription not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
