let db = require("../database/mysql");

const getUsers = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT u.id, u.name, u.display_picture FROM users u WHERE u.user_level = 2 && u.id <> ?";
    db.query(query, id, function (err, result) {
      if (err) return reject(err);
      if (!result) return reject(false);
      return resolve(result);
    });
  });
};

module.exports = { getUsers };
