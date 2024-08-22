import mongoose, { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    name: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", reviewSchema);

export default Review;
