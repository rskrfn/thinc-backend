//import
let db = require("../database/mysql");

let getUserLevel = (email) => {
  return new Promise((resolve, reject) => {
    let userquery = "SELECT u.user_level From users u WHERE u.email = ?";
    db.query(userquery, [email], function (err, result) {
      if (err) return reject(err);
      if (result.length === 0) {
        return resolve(false);
      }
      return resolve(result);
    });
  });
};
let searchcourse = (coursename) => {
  return new Promise((resolve, reject) => {
    const searchquery =
      "SELECT c.course_name AS 'Course Name' FROM courses c WHERE `course_name` LIKE ?";
    db.query(searchquery, [coursename], (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};

let addcourse = (coursename, category, description, level, price) => {
  return new Promise((resolve, reject) => {
    let addquery =
      "INSERT INTO `courses`(`course_name`, `category`, `description`, `course_level`, `price`) VALUES (?, ?, ?, ?, ?)";
    db.query(
      addquery,
      [coursename, category, description, level, price],
      function (err, result) {
        if (err) return reject(err);
        return resolve(result);
      }
    );
  });
};
let deletecourse = (coursename) => {
  return new Promise((resolve, reject) => {
    let deletequery = "DELETE FROM `courses` WHERE course_name = ?";
    db.query(deletequery, [coursename], function (err, result) {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
module.exports = {
  getUserLevel,
  addcourse,
  deletecourse,
  searchcourse,
};
