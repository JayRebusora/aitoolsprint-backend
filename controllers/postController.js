import Post from "../models/Post.js"



export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1});
        res.json(posts);
    }catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({message: "Server error"});
    }
};

export const getPostBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await Post.findOne({slug});

        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }
        res.json(post);
    }catch (error) {
        console.error("Error fetching post:", error.message);
        res.status(500).json({message: "Server error"});
    }
};

export const createPost = async (req, res) => {
    try {
        const {title, slug, content, author} = req.body;

        if (!title || !slug ||!content) {
            return res.status(400).json({message: "Title, slug, and content are required"});
        }
        const existing = await Post.findOne({slug});
        if (existing) {
            return res.status(400).json({message: "Slug already exists"});
        }
        const post = await Post.create({
            title,
            slug,
            content,
            author: author || "Jay",
        });
        res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({message: "Server error"});
    }
};