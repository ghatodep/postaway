import UserModel from "./user.model.js";

export default class UserController {
  contructor() {
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
}
