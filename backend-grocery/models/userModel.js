import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    defaultAddress: {
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
    },
    cart: {
      orderItems: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          name: String,
          price: Number,
          image: String,
          qty: Number,
          stock: Number,
        },
      ],
      subscriptions: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          name: String,
          price: Number,
          image: String,
          frequency: { type: String, default: "Daily" },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
