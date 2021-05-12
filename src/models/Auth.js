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
    let emailquery = "SELECT u.email FROM users u WHERE u.email = ?";
    db.query(emailquery, email, function (err, result) {

      if (err) return reject(err);
      if (result.length > 0) {
        return resolve(true);
      }
      return resolve(false);
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
      "SELECT u.id, u.email, u.name , u.username, u.password, ul.level_name AS 'role' FROM users u JOIN user_level ul on u.user_level = ul.level_id WHERE (u.username = ? or u.email = ?)";
    db.query(dbquery, [usernameemail, usernameemail], function (err, result) {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return resolve((result = false));
      }
      // return resolve(result)
      bcrypt.compare(password, result[0].password, (err, isPassMatch) => {
        if (err) reject(err);
        if (isPassMatch === false) {
          return resolve((result = false));
        }
        if (isPassMatch === true) {
          let { id, email, name, username, role } = result[0];
          let payload = {
            id,
            name,
            email,
            username,
            role,
          };
          console.log(payload);
          let options = {
            expiresIn: process.env.EXPIRE,
            issuer: process.env.ISSUER,
          };
          jwt.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
            if (err) return reject(err);
            resolve({ data: payload, token: token });
          });
        }
      });
    });
  });
};

let passwordChange = (newpassword, email) => {
  return new Promise((resolve, reject) => {
    const qs = "UPDATE `users` SET `password`= ? WHERE `email` = ?";
    bcrypt.hash(newpassword, 10, (err, hashedPass) => {
      if (err) return reject(err);
      db.query(qs, [hashedPass, email], function (err, result) {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  });
};

module.exports = {
  usernameCheck,
  emailCheck,
  registerUser,
  loginUser,
  passwordChange,
};
