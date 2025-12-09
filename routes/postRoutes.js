import express from "express";
import { createPost, getAllPosts, getPostBySlug } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);

router.post("/", createPost);

router.get("/:slug", getPostBySlug);

export default router;