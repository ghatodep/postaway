export default class UserModel {
  constructor(_id, _userName, _userEmail, _userPassword) {
    this.id = _id ? _id : `USER-${++UserModel.idCounter}`;
    this.name = _userName;
    this.email = _userEmail;
    this.password = _userPassword;
    console.log(`Excellent! New User Created - ${this.id}~${this.name}`);
  }

  static idCounter = 0;

  static getUserObject(loggedInUserId) {
    return usersDb.find((user) => {
      return user.id == loggedInUserId;
    });
  }

  static addNewUser(name, email, password) {
    let newUser = new UserModel(null, name, email, password);
    usersDb.push(newUser);
    return {
      userId: newUser.id,
      userName: newUser.name,
      userEmail: newUser.email,
    };
  }

  static checkCreds(email, password) {
    let ind = usersDb.findIndex((user) => {
      return user.email == email;
    });

    if (ind == -1) {
      return { error: `email id ${email} is not valid. Provide a valid one.` };
    }

    if (usersDb[ind].password == password) {
      return {
        userId: usersDb[ind].id,
        userName: usersDb[ind].name,
        userEmail: usersDb[ind].email,
      };
    } else {
      return {
        error: `Incorrect password given for this email - ${email}. Please try again with correct password.`,
      };
    }
  }

  static addBookmark(userId, postId) {
    const userIndex = usersDb.findIndex((user) => {
      return user.id == userId;
    });
    if (userIndex != -1) {
      if (!("bookmark" in usersDb[userIndex])) {
        usersDb[userIndex].bookmark = [postId];
      } else if (!usersDb[userIndex].bookmark.find((p) => p == postId)) {
        usersDb[userIndex].bookmark.push(postId);
      }
      return usersDb[userIndex].bookmark;
    }
    return [];
  }
}

let usersDb = [
  new UserModel(null, "postaway-admin", "admin@py.com", "admin@123"),
  new UserModel(null, "pushpak ghatode", "pushpak@gmail.com", "pushpak@123"),
];
