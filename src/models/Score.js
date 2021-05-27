//import
let db = require("../database/mysql");

let isenroled = (email, coursename) => {
    return new Promise ((resolve, reject) => {
        let enroledquery = "SELECT uc.course_id FROM user_course uc WHERE (uc.user_id = (SELECT u.id FROM users u WHERE u.email = ?)) AND (uc.course_id = (SELECT courses.id FROM courses WHERE courses.course_name = ?))"
        db.query(enroledquery, [email, coursename], function(err, result) {
            if (err) return reject(err)
            if (result.length === 0){
                return resolve(false)
            }
            return resolve(true)
        })
    })
} 

let getscore = (email) => {
  return new Promise((resolve, reject) => {
    let scorequery =
      "SELECT sc.subcourse_name, s.score FROM score s JOIN subcourses sc ON s.subcourse_id = sc.id WHERE s.user_id = (SELECT u.id FROM users u WHERE u.email = ?)";
    db.query(scorequery, [email], function (err, result) {
      if (err) return reject(err);
      if (result.length === 0) {
        return resolve(false);
      }
      return resolve(result);
    });
  });
};

// let postscore = () => {
//   return new Promise((resolve, reject) => {
//     let postquery = ""
//   })
// }

module.exports = {
    isenroled, getscore
}