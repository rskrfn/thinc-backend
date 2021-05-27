/* eslint-disable no-undef */
//import
let db = require("../database/mysql");
const bcrypt = require("bcrypt");

let emailCheck = (email) => {
  return new Promise((resolve, reject) => {
    let emailquery = "SELECT u.id FROM users u WHERE u.email = ?";
    db.query(emailquery, email, function (err, result) {
      if (err) return reject(err);
      if (result.length > 0) {
        return resolve(result[0].id);
      }
      return resolve(false);
    });
  });
};

let createOTP = (email, code, validuntil) => {
  return new Promise((resolve, reject) => {
    let user_id;
    let idlookup = "SELECT u.id FROM users u WHERE u.email = ?";
    db.query(idlookup, email, function (err, result) {
      if (err) return reject(err);
      user_id = result[0].id;
      // console.log(user_id);
      let createquery =
        "INSERT INTO `otp`( `user_id`, `otp_code`, `valid_until`) VALUES ( ?, ?, ?)";
      db.query(createquery, [user_id, code, validuntil], function (err) {
        if (err) return reject(err);
        // console.log(result);
        return resolve(true);
      });
    });
  });
};

let checkOTP = (email, code) => {
  return new Promise((resolve, reject) => {
    let user_id;
    let idlookup = "SELECT u.id FROM users u WHERE u.email = ?";
    db.query(idlookup, email, function (err, result) {
      if (err) return reject(err);
      // console.log(result)
      if (result.length === 0) {
        return reject("Email not found");
      }
      user_id = result[0].id;
      // console.log(user_id);
      let checkquery =
        "SELECT o.otp_code, o.valid_until FROM otp o WHERE o.user_id = ? AND o.otp_code = ?";
      db.query(checkquery, [user_id, code], function (err, result) {
        if (err) return reject(err);
        if (!result.length) return resolve(false);
        if (result.length > 0) {
          return resolve(result);
        }
      });
    });
  });
};
let deleteOTP = (userId) => {
  return new Promise((resolve, reject) => {
    let deletequery = "DELETE FROM `otp` WHERE user_id = ?";
    db.query(deletequery, [userId], function (err, result) {
      if (err) return reject(err);
      console.log(result.affectedRows);
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
  deleteOTP,
  passwordChange,
};
