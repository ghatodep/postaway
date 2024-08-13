import express from "express";
import CommentController from "./comment.controller.js";

const commentController = new CommentController();
const router = express.Router();

// returns all the comments by logged in user
router.get("/", commentController.displayCommentByUserId);

// returns all the comments in the database
router.get("/all", commentController.displayAllComments);

// returns a comment by id
router.get("/:commentId", commentController.displayCommentById);

// returns all the comments by a postId
router.get("/postId/:postId", commentController.displayCommentsByPostId);

// creates a new comment - postId and comment text in request body
router.post("/", commentController.createNewComment);

// update a existing comment - commentId and updated comment text in request body
router.patch("/", commentController.updateComment);

// delete a comment by comment id
router.delete("/:commentId", commentController.deleteComment);

export default router;
