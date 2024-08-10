import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();
const router = express.Router();

// returns all the users to client available in users Database
router.get("/", userController.getAllUsers);

export default router;
