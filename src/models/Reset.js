/* eslint-disable no-undef */
//import
let db = require("../database/mysql");
const bcrypt = require("bcrypt");

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

let createOTP = (code, start, end) => {
  return new Promise((resolve, reject) => {
    let createquery =
      "INSERT INTO `otp`(`otp_code`, `start_time`, `end_time`) VALUES ( ?, ?, ?)";
    db.query(createquery, code, start, end, function (err, result) {
      if (err) return reject(err);
      console.log(result);
      return resolve(true);
    });
  });
};

let checkOTP = (code) => {
  return new Promise((resolve, reject) => {
    let checkquery =
      "SELECT o.otp_code, o.start_time, o.end_time FROM otp o WHERE o.otp_code = ?";
    db.query(checkquery, code, function (err, result) {
      if (err) return reject(err);
      console.log(result)
      return resolve(true);
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
  emailCheck,
  createOTP,
  checkOTP,
  passwordChange,
};
