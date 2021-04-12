let db = require("../database/mysql");
let bcrypt = require("bcrypt")

let getUserProfile = (usernameemail) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT u.name, u.phone, u.password FROM users u WHERE (u.username = ? OR u.email = ?)";
    db.query(query, [usernameemail, usernameemail], function (err, result) {
      if (err) return reject(err);
      if (!result) return resolve(false);
      return resolve(result);
    });
  });
};

let updateUserProfile = (data, usernameemail) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE users SET ? FROM users u WHERE (u.username = ? OR u.email = ?)";
    let password = data.password;
    if (password){
      bcrypt.hash(password, 10, (err, hashedPass) => {
        if (err) return reject(err);
        data.password = (password = hashedPass)
        db.query(query, [data, usernameemail, usernameemail], function (err, result) {
          if (err) return reject(err);
          if (result.affectedRows !== 0) {
            return resolve(true);
          }
          return resolve(false);
        });
      });
    }
  });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
