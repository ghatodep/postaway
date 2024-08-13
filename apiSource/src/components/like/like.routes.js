import express from "express";
import LikeController from "./like.controller.js";

const likeController = new LikeController();
const router = express.Router();

// returns all the likes by logged in user
router.get("/", likeController.getLikesByUserId);

// returns all the likes data in the database
router.get("/all", likeController.getAllLikes);

// returns all the likes data by post id
router.get("/:postId", likeController.getLikesByPostId);

// toggles the like for the post id with logged in user id
router.post("/toggle/:postId", likeController.toggleLike);

export default router;
