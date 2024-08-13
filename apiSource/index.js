// importing external modules here
import express from "express";
import bodyParser from "body-parser";

// importing routers here
import UserRouter from "./src/components/user/user.routes.js";
import PostRouter from "./src/components/post/post.routes.js";
import LikeRouter from "./src/components/like/like.routes.js";
import CommentRouter from "./src/components/comment/comment.routes.js";

// importing middlewares here
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import { winstonLogger } from "./src/middlewares/logger.middleware.js";
import { jwtAuthMiddleware } from "./src/middlewares/jwtAuth.middleware.js";

// creating a express server
const server = express();

// middleware to process the request body data
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// making static directory directly accessible or public
server.use(express.static("./static/"));

// logging incoming request information
server.use(winstonLogger);

// root level get request handler
server.get("/", (request, response, next) => {
  console.log("Welcome to postaway API !");
  response
    .status(200)
    .send({ success: true, message: `Welcome to Postaway API !` });
});

// redirecting user requests to user router
server.use("/api/user", UserRouter);

// redirecting post requests to post router
server.use("/api/post", jwtAuthMiddleware, PostRouter);

// redirecting like requests to like router
server.use("/api/like", jwtAuthMiddleware, LikeRouter);

// redirecting comment requests to comment router
server.use("/api/comment", jwtAuthMiddleware, CommentRouter);

// adding express error handler as application level middleware
server.use(errorHandler);

export default server;
