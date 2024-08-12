export default class UserModel {
  constructor(_id, _userName, _userEmail, _userPassword) {
    this.id = _id ? _id : `USER-${++UserModel.idCounter}`;
    this.name = _userName;
    this.email = _userEmail;
    this.password = _userPassword;
    console.log(`Excellent! New User Created - ${this.id}~${this.name}`);
  }

  static idCounter = 0;

  static getAllUsers() {
    return usersDb;
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
}

let usersDb = [
  new UserModel(null, "postaway-admin", "admin@py.com", "admin@123"),
  new UserModel(null, "pushpak ghatode", "pushpak@gmail.com", "pushpak@123"),
];
