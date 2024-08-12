// importing external modules here
import express from "express";
import bodyParser from "body-parser";

// importing routers here
import UserRouter from "./src/components/user/user.routes.js";

// importing middlewares here
import errorHandler from "./src/middlewares/errorHandler.middleware.js";

// creating a express server
const server = express();

// middleware to process the request body data
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// root level get request handler
server.get("/", (request, response, next) => {
  console.log("Welcome to postaway API !");
  response
    .status(200)
    .send({ success: true, message: `Welcome to Postaway API !` });
});

// redirecting user requests to user router
server.use("/api/user", UserRouter);

// adding express error handler as application level middleware
server.use(errorHandler);

export default server;
