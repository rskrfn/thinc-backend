/* eslint-disable no-undef */
//import
let db = require("../database/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    bcrypt.hash(password, 10, (err, hashedPass) => {
      if (err) return reject(err);
      let newPass = (password = hashedPass);
      db.query(
        registerquery,
        [name, username, email, newPass],
        function (error, results) {
          if (error) return reject(error);
          return resolve(results);
        }
      );
    });
  });
};

let loginUser = (usernameemail, password) => {
  return new Promise((resolve, reject) => {
    let dbquery =
      "SELECT u.name , u.username, u.password, ul.level_name AS 'role' FROM users u JOIN user_level ul on u.user_level = ul.level_id WHERE (u.username = ? or u.email = ?)";
    db.query(
      dbquery,
      [usernameemail, usernameemail],
      function (err, result) {
        if (err) {
          return reject(err);
        }
        if (result.length === 0) {
          return resolve((result = false));
        }
        // return resolve(result)
        bcrypt.compare(password, result[0].password, (err, isPassMatch) => {
          if (err) reject(err);
          if (!isPassMatch) {
            console.log(isPassMatch);
            return resolve((result = false));
          }
        });
        let { username, role } = result[0];
        let payload = {
          username,
          role,
        };
        let options = {
          expiresIn: process.env.EXPIRE,
          issuer: process.env.ISSUER,
        };
        jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
          if (err) return reject(err);
          console.log(process.env.EXPIRE);
          resolve(token);
        });
      }
    );
  });
};

module.exports = {
  usernameCheck,
  emailCheck,
  registerUser,
  loginUser,
};