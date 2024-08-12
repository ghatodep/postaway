import express from "express";
import PostController from "./post.controller.js";
import { jwtAuthMiddleware } from "../../middlewares/jwtAuth.middleware.js";

const postController = new PostController();
const router = express.Router();

// returns all the posts by logged in user
router.get("/", jwtAuthMiddleware, postController.displayUserPosts);

// creates a new post
router.post("/", jwtAuthMiddleware, postController.createNewPost);

// returns all the posts available in the database
router.get("/all", jwtAuthMiddleware, postController.displayAllPosts);

// returns post by post id
router.get("/:postId", jwtAuthMiddleware, postController.displayPostById);

// update a post by id - only caption and image can be updated
router.patch("/update", jwtAuthMiddleware, postController.updatePost);

// returns post by post id
router.delete("/:postId", jwtAuthMiddleware, postController.deletePostById);

export default router;
