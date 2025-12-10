import mongoose from "mongoose";

const toolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    price: { type: String, default: "N/A" },
    tag: { type: String, default: "" },
  },
  { timestamps: true }
);

const Tool = mongoose.model("Tool", toolSchema);
export default Tool;
