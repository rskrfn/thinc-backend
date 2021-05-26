let db = require("../database/mysql");
let bcrypt = require("bcrypt");

let getUserProfile = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT u.name, u.phone FROM users u WHERE id = ?";
    db.query(query, id, function (err, result) {
      if (err) return reject(err);
      if (!result) return resolve(false);
      return resolve(result);
    });
  });
};

let updateUserProfile = (data, id) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET ? WHERE id = ?";
    let password = data.password;
    data.password
      ? bcrypt.hash(password, 10, (err, hashedPass) => {
          if (err) {
            return reject(err);
          }
          data.password = hashedPass;
          db.query(query, [data, id], function (err, result) {
            if (err) {
              return reject(err);
            }
            if (result.affectedRows !== 0) {
              return resolve(result);
            }
            return resolve(false);
          });
        })
      : db.query(query, [data, id], (err, result) => {
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
