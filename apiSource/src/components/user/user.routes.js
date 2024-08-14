import express from "express";
import UserController from "./user.controller.js";
import { jwtAuthMiddleware } from "../../middlewares/jwtAuth.middleware.js";

const userController = new UserController();
const router = express.Router();

// returns the user details of the logged in user
router.get("/", jwtAuthMiddleware, userController.getUserInfo);

// register user in the users Database - returns name and user id
router.post("/register", userController.register);

// User login into the system - returns jwt token
router.post("/login", userController.login);

// Bookmark a post by providing post id
router.post(
  "/bookmark-post/:postId",
  jwtAuthMiddleware,
  userController.bookmarkPostId
);

export default router;
