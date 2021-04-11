let db = require("../database/mysql");

let getCourses = () => {
  return new Promise((resolve, reject) => {
    const coursequery =
      "SELECT `id`, `course_name`, `category`, `description`, `course_level`, `price` FROM `courses`";
    db.query(coursequery, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

let courseSort = (sortValue) => {
  return new Promise((resolve, reject) => {
    const sortquery =
      "SELECT c.course_name AS 'Course Name', c.category AS 'Category', c.description AS 'Description', c.course_level AS 'Level', c.price AS 'Price' FROM courses c ORDER BY ? ?";
    db.query(sortquery, sortValue, (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) {
        return reject(false);
      }
      return resolve(result);
    });
  });
};

let searchCourse = (searchValue) => {
  return new Promise((resolve, reject) => {
    const searchquery =
      "SELECT c.course_name AS 'Course Name', c.category AS 'Category', c.description AS 'Description', c.course_level AS 'Level', c.price AS 'Price'  FROM courses c WHERE `course_name` LIKE ?";
    db.query(searchquery, [searchValue], (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) {
        return reject(false);
      }
      return resolve(result);
    });
  });
};
module.exports = { getCourses, courseSort, searchCourse };
