import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    frequency: { type: String, required: true, default: "Daily" }, // Daily, Weekly
    startDate: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, default: "Active" }, // Active, Paused, Cancelled
    nextDelivery: { type: Date },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
