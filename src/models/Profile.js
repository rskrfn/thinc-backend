let db = require("../database/mysql");
let bcrypt = require("bcrypt");

let getUserProfile = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT u.name, u.phone, u.email, u.display_picture FROM users u WHERE id = ?";
    db.query(query, id, function (err, result) {
      if (err) return reject(err);
      if (!result) return resolve(false);
      return resolve(result);
    });
  });
};

let updateUserProfile = (data) => {
  return new Promise((resolve, reject) => {
    const passcheckquery = "SELECT u.password FROM users u WHERE u.id = ?";
    const query = "UPDATE users SET ? WHERE id = ?";
    let { password, newpassword } = data;
    console.log(data);
    password
      ? db.query(passcheckquery, data.id, (err, result) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          if (result.length === 0) {
            // console.log("passcheck");
            return reject("User Not Found");
          }
          bcrypt.compare(password, result[0].password, (err, isPassMatch) => {
            if (err) reject(err);
            if (isPassMatch === false) {
              // console.log("password wrong");
              return reject("Wrong Password");
            }
            if (password === newpassword) {
              return reject("Same Password");
            }
            if (isPassMatch === true) {
              // console.log("password match");
              bcrypt.hash(newpassword, 10, (err, hashedPass) => {
                if (err) {
                  return reject("Failed to Hash Password");
                }
                const newPassword = { password: hashedPass };
                db.query(query, [newPassword, data.id], function (err, result) {
                  if (err) {
                    console.log({ err });
                    return reject(err);
                  }
                  if (result.affectedRows !== 0) {
                    return resolve(true);
                  }
                  return resolve(false);
                });
              });
            }
          });
        })
      : db.query(query, [data, data.id], (err, result) => {
          console.log(result);
          if (err) {
            console.log({ err });
            return reject(err);
          }
          if (result.affectedRows !== 0) {
            return resolve(true);
          }
          return resolve(false);
        });
  });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
