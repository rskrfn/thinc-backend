/* eslint-disable no-unused-vars */
const { getUserProfile, updateUserProfile } = require("../models/Profile");
const { writeResponse, writeError } = require("../helpers/Response");

const getUser = async (req, res) => {
  try {
    let result = await getUserProfile(req.query.id);
    console.log(result);
    if (result === false) {
      return writeResponse(res, false, 400, "User Not Found");
    }
    return writeResponse(res, true, 200, "Success", result);
  } catch (err) {
    return writeError(res, err);
  }
};
const updateProfile = async (req, res) => {
  try {
    let { file } = req;
    let data = {};
    let token = req.headers.token;
    // console.log({ req });
    let display_picture = file ? `/images/${file.filename}` : null;
    if (!display_picture) {
      data = { ...req.body };
    }
    if (display_picture) {
      data = { ...req.body, display_picture };
    }
    if (!token) {
      return writeError(res, 403, "Not Authorized");
    }
    // console.log(data)
    let result = await updateUserProfile(data, req.body.id);
    console.log(result);
    if (result === false) {
      return writeResponse(res, false, 400, "Data Not Updated");
    }
    return writeResponse(res, true, 200, "Data Changed");
  } catch (err) {
    // return console.log(err);
  }
};

module.exports = { getUser, updateProfile };
