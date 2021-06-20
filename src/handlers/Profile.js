/* eslint-disable no-unused-vars */
const { getUserProfile, updateUserProfile } = require("../models/Profile");
const { writeResponse, writeError } = require("../helpers/Response");

const getUser = async (req, res) => {
  try {
    let result = await getUserProfile(req.query.id);
    // console.log(result);
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
    // console.log("Handler" + file);
    let display_picture = file ? `/displaypicture/${file.filename}` : null;
    if (!display_picture) {
      data = { ...req.body };
    }
    if (display_picture) {
      data = { ...req.body, display_picture };
    }
    if (!token) {
      return writeError(res, 403, "Not Authorized");
    }
    if (!data.id) {
      return writeError(res, 400, "User id not provided");
    }
    // if (!data.name && !data.phone && !data.password && !data.newpassword) {
    //   return writeError(res, 400, "Missing query data");
    // }
    if (
      (data.password && !data.newpassword) ||
      (!data.password && data.newpassword)
    ) {
      return writeError(res, 400, "Enter your current password and a new one");
    }
    let result = await updateUserProfile(data);
    console.log(result);
    if (result === false) {
      return writeResponse(res, false, 400, "Data Not Updated");
    }
    return writeResponse(res, true, 200, "Data Changed");
  } catch (err) {
    if (err === "User Not Found") {
      return writeError(res, 404, "User not found");
    }
    if (err === "Wrong Password") {
      return writeError(res, 404, "Wrong Password");
    }
    if (err === "Same Password") {
      return writeError(res, 403, "Same Password");
    }
    console.log({ err });
  }
};

module.exports = { getUser, updateProfile };
