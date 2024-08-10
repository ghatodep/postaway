// importing external modules here
import express from "express";

// importing internal modules here
// importing routers here
import UserRouter from "./src/components/user/user.routes.js";

// importing middlewares here
const server = express();

server.get("/", (request, response, next) => {
  console.log("Welcome to postaway API !");
  response
    .status(200)
    .send({ success: true, message: `Welcome to Postaway API !` });
});

// redirecting user requests to user router
server.use("/api/user", UserRouter);

export default server;
