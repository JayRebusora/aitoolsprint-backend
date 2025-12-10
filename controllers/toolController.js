import Tool from "../models/Tool.js";

export const getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find().sort({ createdAt: -1 });
    res.json(tools);
  } catch (err) {
    console.error("Error fetching tools:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getToolBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const tool = await Tool.findOne({ slug });

    if (!tool) return res.status(404).json({ message: "Tool not found" });

    res.json(tool);
  } catch (err) {
    console.error("Error fetching tool:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTool = async (req, res) => {
  try {
    const { name, slug, category, description, rating, price, tag } = req.body;

    if (!name || !slug || !description)
      return res.status(400).json({ message: "Name, slug, and description are required" });

    const exists = await Tool.findOne({ slug });
    if (exists)
      return res.status(400).json({ message: "Slug already exists" });

    const tool = await Tool.create({
      name,
      slug,
      category,
      description,
      rating,
      price,
      tag,
    });

    res.status(201).json(tool);
  } catch (err) {
    console.error("Error creating tool:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFeaturedTool = async (req, res) => {
  try {
    const tool = await Tool.findOne({ isFeatured: true }).sort({ createdAt: -1 });

    if (!tool) {
      return res.status(404).json({ message: "No featured tool set" });
    }

    res.json(tool);
  } catch (err) {
    console.error("Error fetching featured tool:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

