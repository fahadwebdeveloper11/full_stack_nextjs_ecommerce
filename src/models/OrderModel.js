import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Delivered", "Cancelled"],
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
