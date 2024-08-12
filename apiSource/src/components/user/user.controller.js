import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";
import { secretKey } from "../../middlewares/jwtAuth.middleware.js";
import PostawayError from "../../suppliments/postawayError.js";

export default class UserController {
  constructor() {
    console.log(`User Controller is Activated.`);
  }

  // returns all users
  getAllUsers = (request, response, next) => {
    console.log(`Request to get all users!`);
    const users = UserModel.getAllUsers();
    return response
      .status(200)
      .send({ success: true, message: `Here are your users`, data: users });
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
      return response.status(201).send({
        success: true,
        message: `User Logged in !`,
        data: result,
        authenticationToken: token,
      });
    } else {
      throw new PostawayError(400, result.error);
    }
  };
}
