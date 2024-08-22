import mongoosem, { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", categorySchema);

export default Category;
