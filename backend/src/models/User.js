// backend/src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    subscription: {
      plan: { type: String, enum: ["free", "pro"], default: "free" },
      status: { type: String, enum: ["active", "inactive"], default: "inactive" },
      stripeCustomerId: { type: String }, // For Stripe integration
      stripeSubscriptionId: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
