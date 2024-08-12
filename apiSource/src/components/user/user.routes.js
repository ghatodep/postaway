import express from "express";
import UserController from "./user.controller.js";
import { jwtAuthMiddleware } from "../../middlewares/jwtAuth.middleware.js";

const userController = new UserController();
const router = express.Router();

// returns all the users to client available in users Database
router.get("/", jwtAuthMiddleware, userController.getAllUsers);

// register user in the users Database - returns name and user id
router.post("/register", userController.register);

// User login into the system - returns jwt token
router.post("/login", userController.login);

export default router;
