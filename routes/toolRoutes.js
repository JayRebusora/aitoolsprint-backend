import express from "express";
import {
  createTool,
  getAllTools,
  getToolBySlug,
} from "../controllers/toolController.js";

const router = express.Router();

router.get("/", getAllTools);        // GET /api/tools
router.post("/", createTool);        // POST /api/tools
router.get("/:slug", getToolBySlug); // GET /api/tools/slug

export default router;
