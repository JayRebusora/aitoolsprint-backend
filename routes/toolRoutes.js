import express from "express";
import {
  createTool,
  getAllTools,
  getToolBySlug,
  getFeaturedTool,
} from "../controllers/toolController.js";

const router = express.Router();

/**
 * @route   GET /api/tools/featured
 * @desc    Get featured tool
 */
router.get("/featured", getFeaturedTool);

/**
 * @route   GET /api/tools
 * @desc    Get all tools
 */
router.get("/", getAllTools);

/**
 * @route   POST /api/tools
 * @desc    Create a new tool
 */
router.post("/", createTool);

/**
 * @route   GET /api/tools/:slug
 * @desc    Get single tool by slug
 */
router.get("/:slug", getToolBySlug);

export default router;
