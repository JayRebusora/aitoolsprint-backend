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
    affiliateUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/* ✅ AUTO-GENERATE SLUG FROM NAME */
toolSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

const Tool = mongoose.model("Tool", toolSchema);
export default Tool;
