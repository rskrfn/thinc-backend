let { getUsers } = require("../models/Chat");
let { writeResponse, writeError } = require("../helpers/Response");

const getAllUsers = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return writeError(res, 400, "Missing query");
    }
    const result = await getUsers(id);
    if (!result) {
      return writeError(res, 404, "Data not found");
    }
    return writeResponse(res, true, 200, "Data found", result);
  } catch (err) {
    return writeError(res, 500, '', {err});
  }
};

module.exports = { getAllUsers };
