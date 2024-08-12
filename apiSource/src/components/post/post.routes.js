import express from "express";
import PostController from "./post.controller.js";
import fileUploadMiddleware from "../../middlewares/fileUpload.middleware.js";

const postController = new PostController();
const router = express.Router();

// returns all the posts by logged in user
router.get("/", postController.displayUserPosts);

// creates a new post
router.post(
  "/",
  fileUploadMiddleware.single("image"),
  postController.createNewPost
);

// returns all the posts available in the database
router.get("/all", postController.displayAllPosts);

// returns post by post id
router.get("/:postId", postController.displayPostById);

// update a post by id - only caption and image can be updated
router.patch(
  "/update",
  fileUploadMiddleware.single("image"),
  postController.updatePost
);

// returns post by post id
router.delete("/:postId", postController.deletePostById);

export default router;
