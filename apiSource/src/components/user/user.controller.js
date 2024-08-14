import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";
import PostModel from "../post/post.model.js";
import { secretKey } from "../../middlewares/jwtAuth.middleware.js";
import PostawayError from "../../suppliments/postawayError.js";

export default class UserController {
  constructor() {
    console.log(`User Controller is Activated.`);
  }

  // returns all users
  getUserInfo = (request, response, next) => {
    console.log(
      `Request to get logged in user information - ${request.user.userId}`
    );
    const user = UserModel.getUserObject(request.user.userId);
    if (user) {
      return response.status(200).send({
        success: true,
        message: `Here are your user details.`,
        data: user,
      });
    } else {
      throw new PostawayError(400, `Invalid User Id - ${request.user.userId}`);
    }
  };

  register = (request, response, next) => {
    console.log(`Request to register a new user!`);
    const { name, email, password } = request.body;
    const userInfo = UserModel.addNewUser(name, email, password);
    return response.status(201).send({
      success: true,
      message: `New User Registered !`,
      data: userInfo,
    });
  };

  login = (request, response, next) => {
    console.log(`Request for a user log in!`);
    const { email, password } = request.body;
    const result = UserModel.checkCreds(email, password);
    if ("userId" in result) {
      const token = jwt.sign(result, secretKey, { expiresIn: 30 * 60 });
      return response.status(200).send({
        success: true,
        message: `User Logged in !`,
        data: result,
        authenticationToken: token,
      });
    } else {
      throw new PostawayError(400, result.error);
    }
  };

  bookmarkPostId = (request, response, next) => {
    const { postId } = request.params;
    const userId = request.user.userId;
    console.log(`Request to Bookmark a post - ${postId} for user - ${userId}`);
    // validate post id
    const post = PostModel.getPostById(postId);
    if (!post) {
      throw new PostawayError(400, `Invalid post Id - ${postId}`);
    }
    const bookmarkedList = UserModel.addBookmark(userId, postId);
    if (bookmarkedList) {
      return response.status(200).send({
        success: true,
        message: `Book mark added.`,
        data: bookmarkedList,
      });
    } else {
      throw new PostawayError(
        500,
        "Internal Error! Failure in bookmark addition. Try Again."
      );
    }
  };
}
