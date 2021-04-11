//import
let db = require("../database/mysql");

let usernameCheck = (username) => {
  return new Promise((resolve, reject) => {
    let usernamequery = "SELECT `username` FROM `users` WHERE `username` = ?";
    db.query(usernamequery, [username], function (err, result) {
      if (err) return reject(err);
      if (result.length > 0) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};

let emailCheck = (email) => {
  return new Promise((resolve, reject) => {
    let emailquery = "SELECT `email` FROM `users` WHERE `email` = ?";
    db.query(emailquery, [email], function (err, result) {
      if (err) return reject(err);
      if (result.length > 0) {
        return resolve(false);
      }
      return resolve(result);
    });
  });
};
let registerUser = (name, username, email, password) => {
    return new Promise((resolve, reject) => {
      const registerquery =
        "INSERT INTO `users`(`name`, `username`, `email`, `password`, `user_level`) VALUES (?,?,?,?, 2)";
      db.query(
        registerquery,
        [name, username, email, password],
        function (error, results) {
          if (error) return reject(error);
          return resolve(results);
        }
      );
    });
  }

module.exports = { usernameCheck, emailCheck, registerUser };
