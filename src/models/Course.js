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

let myClass = (userId) => {
  return new Promise((resolve, reject) => {
    let myclassquery =
      "SELECT c.course_name AS 'Name', cat.category AS 'Category', c.description AS 'Description' FROM courses c JOIN user_course uc ON c.id = uc.course_id JOIN course_category cat ON cat.id = c.id_category WHERE uc.user_id = ?";
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
      "SELECT c.course_name AS 'Name', cat.category AS 'Category', c.description AS 'Description', c.course_level AS 'Level', c.price AS 'Price' FROM courses c JOIN course_category cat ON cat.id = c.id_category WHERE c.id NOT IN (SELECT user_course.course_id FROM user_course WHERE user_course.user_id = ?)";
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
    let registerquery =
      "INSERT INTO `user_course`(`user_id`, `course_id`) VALUES (?, ?)";
    db.query(registerquery, [userId, courseId], function (err, result) {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let courseSearch = (coursename) => {
  return new Promise((resolve, reject) => {
    let searchquery = "SELECT c.id FROM courses c WHERE c.course_name = ?";
    db.query(searchquery, [coursename], function (err, result) {
      if (err) return reject(err);
      if (result.length === 0) {
        return reject(false);
      }
      return resolve(result);
    });
  });
};

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

let getCoursesPagination = (query) => {
  return new Promise((resolve, reject) => {
    const userid = query.userid
    const mainquery =
      "SELECT c.course_name, cat.category, c.description, cl.level_name AS 'level', c.price FROM courses c JOIN course_level cl ON cl.level_id = c.course_level JOIN course_category cat ON cat.id = c.id_category ";
    const secondaryquery = " LIMIT ? OFFSET ?";
    const paginatedquery = mainquery.concat(" ", secondaryquery);
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    db.query(paginatedquery, [limit, offset], (err, result) => {
      if (err) return reject(err);
      const qsCount = "SELECT COUNT(*) AS 'count' FROM courses";
      db.query(qsCount, (err, data) => {
        if (err) return reject(err);
        const { count } = data[0];
        let finalResult = {
          count,
          page,
          limit,
          result,
        };
        resolve(finalResult);
      });
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
module.exports = {
  getUserId,
  getUserLevel,
  addcourse,
  deletecourse,
  searchcourse,
  myClass,
  newClass,
  registerCourse,
  courseSearch,
  getCourses,
  getCoursesPagination,
  courseSort,
  searchCourse,
};
