//import
let db = require("../database/mysql");

let getUserId = (email) => {
  return new Promise((resolve, reject) => {
    let userQuery = "SELECT u.id From users u WHERE u.email = ?";
    db.query(userQuery, [email], function (err, result) {
      if (err) return reject(err);
      if (result.length === 0) {
        return resolve(false);
      }
      return resolve(result);
    });
  });
};

let myClass = (userId) => {
  return new Promise((resolve, reject) => {
    let myclassquery =
      "SELECT c.course_name AS 'Name', c.category AS 'Category', c.description AS 'Description' FROM courses c JOIN user_course uc ON c.id = uc.course_id WHERE uc.user_id = ?";
    db.query(myclassquery, [userId], function (err, result) {
      if (err) return reject(err);
      if (result.length === 0) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

let newClass = (userId) => {
  return new Promise((resolve, reject) => {
    let newclassquery =
      "SELECT c.course_name AS 'Name', c.category AS 'Category', c.description AS 'Description', c.course_level AS 'Level', c.price AS 'Price' FROM courses c WHERE c.id NOT IN (SELECT user_course.course_id FROM user_course WHERE user_course.user_id = ?)";
    db.query(newclassquery, [userId], function (err, result) {
      if (err) return reject(err);
      if (result.length === 0) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

let registerCourse = (userId, courseId) => {
  return new Promise((resolve, reject) => {
    let registerquery = "INSERT INTO `user_course`(`user_id`, `course_id`) VALUES (?, ?)"
    db.query(registerquery, [userId, courseId], function (err, result) {
      if (err) return reject (err)
      return resolve(result)
    })
  })
}

let courseSearch = (coursename) => {
  return new Promise ((resolve, reject) => {
    let searchquery = "SELECT c.id FROM courses c WHERE c.course_name = ?"
    db.query(searchquery, [coursename], function (err, result) {
      if (err) return reject(err)
      if (result.length === 0){
        return reject(false)
      }
      return resolve(result)
    })
  })
}
module.exports = { getUserId, myClass, newClass, registerCourse, courseSearch};
