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

let getUserLevel = (id) => {
  return new Promise((resolve, reject) => {
    let userquery = "SELECT u.user_level From users u WHERE u.id = ?";
    db.query(userquery, [id], function (err, result) {
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

let addcourse = (
  id,
  coursename,
  category,
  description,
  level,
  price,
  schedule,
  start,
  end
) => {
  return new Promise((resolve, reject) => {
    let addquery =
      "INSERT INTO `courses`(`id_facilitator`, `course_name`, `id_category`, `description`, `course_level`, `price`, `schedule`, `start_time`, `end_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      addquery,
      [
        id,
        coursename,
        category,
        description,
        level,
        price,
        schedule,
        start,
        end,
      ],
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

let myClass = (userId, page) => {
  return new Promise((resolve, reject) => {
    // console.log("halo");
    let myclassquery =
      "SELECT c.id AS 'id', c.course_name AS 'Name', cat.category AS 'Category', c.description AS 'Description', cl.level_name AS 'Level', c.price AS 'Price', (SELECT COUNT(*) FROM score s LEFT JOIN user_course uc ON uc.id = s.id_user_course WHERE uc.user_id = ? and uc.course_id = c.id and s.score IS NOT NULL) as progress ,(SELECT COUNT(*) FROM subcourses sc WHERE sc.course_id = c.id) AS totalsubcourse, (SELECT AVG(DISTINCT s.score) FROM score s LEFT JOIN user_course uc ON uc.id = s.id_user_course WHERE uc.user_id = ? and uc.course_id = c.id) as score  FROM courses c JOIN course_level cl ON cl.level_id = c.course_level JOIN user_course uc ON c.id = uc.course_id JOIN course_category cat ON cat.id = c.id_category WHERE uc.user_id = ? ORDER BY uc.id DESC LIMIT ? OFFSET ?";
    const limit = 8;
    const currpage = page !== undefined ? Number(page) : 1;
    const offset = (page - 1) * limit;
    db.query(myclassquery, [userId, userId, userId, limit, offset], function (err, result) {
      if (err) return reject(err);
      if (result.length === 0) {
        return resolve(false);
      }
      const countquery =
        "SELECT COUNT(*) AS count FROM courses c JOIN user_course uc ON c.id = uc.course_id WHERE uc.user_id = ?";
      db.query(countquery, userId, (err, resultcount) => {
        if (err) return reject(err);
        console.log(resultcount);
        let count = resultcount[0].count;
        let finalResult = {
          count,
          currpage,
          limit,
          result,
        };
        // console.log(finalResult);
        return resolve(finalResult);
      });
    });
  });
};

let getSubCoursesObjective = (courseId) => {
  return new Promise((resolve, reject) => {
    let objectivequery =
      "SELECT GROUP_CONCAT(sc.objective SEPARATOR ',') AS 'Objective' FROM subcourses sc WHERE sc.course_id = ?";
    db.query(objectivequery, [courseId], function (err, result) {
      if (err) return reject(err);
      if (result.length === 0) {
        return resolve(false);
      }
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

let getNewClassNew = (
  userid,
  search,
  category,
  level,
  price,
  sortby,
  order,
  page
) => {
  return new Promise((resolve, reject) => {
    // const userid = query.userid;
    let mainquery = [
      "SELECT c.id, c.id_facilitator AS 'Owner', c.course_name AS 'Name', cat.category AS 'Category', c.description 'Description', cl.level_name AS 'Level', c.price AS 'Price' FROM courses c JOIN course_level cl ON cl.level_id = c.course_level JOIN course_category cat ON cat.id = c.id_category",
      "WHERE c.id NOT IN (SELECT user_course.course_id FROM user_course WHERE user_course.user_id = ?)",
      "&& c.course_name LIKE ?",
    ];
    // console.log(userid, search, category, level, price, sortby, order, page);
    const categoryquery = "&& cat.category = ?";
    const levelquery = "&& cl.level_name = ?";
    const pricequery = "&& c.price = ?";
    const sortquery = "ORDER BY ? ?";
    const paginationquery = "LIMIT ? OFFSET ?";
    const limit = 10;
    const currpage = page !== undefined ? Number(page) : 1;
    const offset = (page - 1) * limit;
    const values = [userid, search];
    if (category) {
      values.push(category);
      mainquery.push(categoryquery);
    }
    if (level) {
      values.push(level);
      mainquery.push(levelquery);
    }
    if (price) {
      values.push(price);
      mainquery.push(pricequery);
    }
    if (sortby && order) {
      values.push(sortby, order);
      mainquery.push(sortquery);
    }
    // console.log(userid);
    // console.log(search);
    values.push(limit, offset);
    // console.log(offset);
    mainquery.push(paginationquery);
    // console.log(values);
    db.query(mainquery.join(" "), values, (err, result) => {
      if (err) return reject(err);
      // console.log("length =>> " + Object.keys(result).length);
      const qsCount =
        "SELECT COUNT(*) AS 'count' FROM courses c WHERE c.id NOT IN (SELECT uc.course_id FROM user_course uc WHERE uc.user_id = ?)";
      db.query(qsCount, userid, (err, countres) => {
        if (err) return reject(err);
        // console.log("countres", countres);
        let count = countres[0].count;
        let finalResult = {
          count,
          currpage,
          limit,
          result,
        };
        // console.log(finalResult);
        return resolve(finalResult);
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
      "SELECT c.course_name AS 'Name', c.id_category AS 'Category', c.description AS 'Description', c.course_level AS 'Level', c.price AS 'Price'  FROM courses c WHERE `course_name` LIKE ?";
    db.query(searchquery, [searchValue], (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) {
        return reject(false);
      }
      return resolve(result);
    });
  });
};
let getScore = (userid, courseid) => {
  return new Promise((resolve, reject) => {
    const queryusercourseid =
      "SELECT uc.id FROM user_course uc WHERE uc.user_id = ? AND uc.course_id = ?";
    db.query(queryusercourseid, [userid, courseid], (err, result) => {
      if (err) return reject(err);
      // console.log(result);
      if (!result.length) {
        return resolve(false);
      }
      if (result.length > 0) {
        let queryscore =
          'SELECT sc.subcourse_name AS "Name", s.score AS "Score" FROM score s JOIN subcourses sc ON sc.id = s.id_subcourses WHERE s.id_user_course = ?';
        db.query(queryscore, [result[0].id], (err, scoreresult) => {
          if (err) return reject(err);
          if (scoreresult.length > 0) {
            // console.log(scoreresult);
            return resolve(scoreresult);
          }
        });
      }
    });
  });
};

let registerCourse = (userid, courseid) => {
  return new Promise((resolve, reject) => {
    const isEnrolled =
      "SELECT `user_id`, `course_id` FROM `user_course` WHERE user_id = ? AND course_id = ?";
    db.query(isEnrolled, [userid, courseid], (errenroll, resultenrolled) => {
      if (errenroll) {
        return reject(errenroll);
      }
      if (resultenrolled.length > 0) {
        return resolve(false);
      }
      db.beginTransaction((err) => {
        let idSubCourses = [];
        let idUserCourse = "";
        if (err) return reject(err);
        const insertUserCourse =
          "INSERT INTO `user_course`(`user_id`, `course_id`) VALUES (?, ?)";
        // eslint-disable-next-line no-unused-vars
        db.query(insertUserCourse, [userid, courseid], (errIUC, resultIUC) => {
          if (errIUC) {
            return db.rollback(() => {
              return reject(errIUC);
            });
          }
          // console.log(resultIUC);
          const getIdUserCourse =
            "SELECT id FROM user_course WHERE user_id = ? AND course_id = ?";
          db.query(
            getIdUserCourse,
            [userid, courseid],
            (errGIUC, resultGIUC) => {
              if (errGIUC) {
                return db.rollback(() => {
                  return reject(errGIUC);
                });
              }
              if (resultGIUC.length > 0) {
                idUserCourse = resultGIUC;
              }
              const getSubCourses =
                "SELECT sc.id FROM subcourses sc WHERE sc.course_id = ?";
              db.query(getSubCourses, courseid, (errGSC, resultGSC) => {
                if (errGSC) {
                  return db.rollback(() => {
                    return reject(errGSC);
                  });
                }
                if (!resultGSC) {
                  return db.rollback(() => {
                    return reject(errGSC);
                  });
                }
                if (resultGSC.length > 0) {
                  idSubCourses = resultGSC;
                  // console.log(idSubCourses);
                }
                const insertScore =
                  "INSERT INTO `score`(`id_user_course`, `id_subcourses`) VALUES (?, ?)";
                for (let i = 0; i < idSubCourses.length; i++) {
                  db.query(
                    insertScore,
                    [idUserCourse[0].id, idSubCourses[i].id],
                    // eslint-disable-next-line no-unused-vars
                    (errIS, resultIS) => {
                      if (errIS) {
                        return db.rollback(() => {
                          return reject(errIS);
                        });
                      }
                      return;
                    }
                  );
                }
                db.commit((errcommit) => {
                  if (errcommit) {
                    return db.rollback(() => {
                      return reject(errcommit);
                    });
                  }
                  return resolve(true);
                });
              });
            }
          );
        });
      });
    });
  });
};

const facilitatorClass = (id) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT c.id as course_id, c.course_name as course_name, ct.category as category, cl.level_name as level, c.description AS Description, c.schedule, c.start_time, c.end_time, 0 as students, c.backdrop, c.price FROM courses c JOIN course_level cl ON cl.level_id = c.course_level JOIN course_category ct ON c.id_category = ct.id WHERE c.id_facilitator = ? && c.course_name NOT IN (SELECT c.course_name FROM courses c JOIN user_course uc ON c.id = uc.course_id) UNION SELECT c.id as course_id, c.course_name as course_name, ct.category as category, cl.level_name as level, c.description, c.schedule, c.start_time, c.end_time, COUNT(uc.user_id) AS students, c.backdrop, c.price FROM courses c JOIN course_level cl ON cl.level_id = c.course_level JOIN user_course uc ON c.id = uc.course_id  JOIN course_category ct ON c.id_category = ct.id WHERE c.id_facilitator = ? GROUP BY c.id ORDER BY course_id DESC`;
    db.query(qs, [id, id], (error, result) => {
      if (error) return reject(error);
      if (result.length > 0) {
        console.log({ result });
        return resolve(result);
      }
      if (result.length === 0) {
        // console.log("cek 0", result);
        return resolve(false);
      }
    });
  });
};

const getFacilitatorSchedule = (id, schedule) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT c.id, c.course_name , ct.category, c.description, c.schedule, c.start_time, c.end_time, COUNT(uc.user_id) AS students FROM courses c JOIN user_course uc ON c.id = uc.course_id  JOIN course_category ct ON c.id_category = ct.id WHERE c.id_facilitator = ? && c.schedule = ? GROUP BY c.id UNION SELECT c.id, c.course_name, ct.category, c.description, c.schedule, c.start_time, c.end_time, 0 as students FROM courses c JOIN course_category ct ON c.id_category = ct.id WHERE c.id_facilitator = ? && c.schedule = ? && c.course_name NOT IN (SELECT c.course_name FROM courses c JOIN user_course uc ON c.id = uc.course_id) ORDER BY start_time`;
    db.query(query, [id, schedule, id, schedule], (error, result) => {
      if (error) return reject(error);
      if (result.length > 0) {
        console.log({ result });
        return resolve(result);
      }
      if (result.length === 0) {
        return resolve(false);
      }
    });
  });
};

const getAllSchedule = (date) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM courses c WHERE c.schedule = ? ORDER BY c.start_time ASC";
    db.query(query, date, (error, result) => {
      if (error) return reject(error);
      if (result.length > 0) {
        return resolve(result);
      }
      if (result.length === 0) {
        return resolve(false);
      }
    });
  });
};

const getScheduleUser = (userid, schedule) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT c.id, c.course_name, cc.category, c.description, cl.level_name AS 'level', c.schedule, c.start_time, c.end_time, (SELECT COUNT(*) FROM score s LEFT JOIN user_course uc ON uc.id = s.id_user_course WHERE uc.user_id = ? and uc.course_id = c.id and s.score IS NOT NULL) as progress ,(SELECT COUNT(*) FROM subcourses sc WHERE sc.course_id = c.id) AS totalsubcourse FROM courses c JOIN user_course uc ON c.id = uc.course_id JOIN course_category cc ON c.id_category = cc.id JOIN course_level cl ON c.course_level = cl.level_id WHERE uc.user_id = ? && c.schedule = ? ORDER BY c.start_time ASC";
    db.query(query, [userid, userid, schedule], (error, result) => {
      if (error) return reject(error);
      if (result.length > 0) {
        return resolve(result);
      }
      if (result.length === 0) {
        return resolve(false);
      }
    });
  });
};

// const coba = (userid, schedule) =>{
//   return new Promise((resolve, reject) => {
//     const countall = ""
//   })
// }
const classMember = (courseid) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT u.id, u.name, u.display_picture FROM users u LEFT JOIN user_course uc ON uc.user_id = u.id WHERE uc.course_id = ?";
    db.query(query, [courseid], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      if (result.length > 0) {
        return resolve(result);
      }
      if (result.length === 0) {
        return resolve(false);
      }
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
  getSubCoursesObjective,
  registerCourse,
  courseSearch,
  getNewClassNew,
  courseSort,
  searchCourse,
  getScore,
  facilitatorClass,
  getFacilitatorSchedule,
  getAllSchedule,
  getScheduleUser,
  classMember,
};
