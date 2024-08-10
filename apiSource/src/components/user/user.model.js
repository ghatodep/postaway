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
}

let usersDb = [
  new UserModel(null, "postaway-admin", "admin@py.com", "admin@123"),
  new UserModel(null, "pushpak ghatode", "pushpak@gmail.com", "pushpak@123"),
];
