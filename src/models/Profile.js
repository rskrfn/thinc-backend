let db = require("../database/mysql");
let bcrypt = require("bcrypt");

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

let updateUserProfile = (data, email) => {
  return new Promise((resolve, reject) => {
    console.log([data, email]);
    const query = "UPDATE users SET ? WHERE email = ?";
    let password = data.password;
    data.password
      ? bcrypt.hash(password, 10, (err, hashedPass) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          data.password = hashedPass;
          db.query(query, [data, email], function (err, result) {
            if (err) {
              console.log(err);
              return reject(err);
            }
            if (result.affectedRows !== 0) {
              return resolve(result);
            }
            return resolve(false);
          });
        })
      : db.query(query, [data, email], (err, result) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve(result);
        });
  });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
