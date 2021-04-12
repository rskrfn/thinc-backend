/* eslint-disable no-unused-vars */
const { getUserProfile, updateUserProfile } = require("../models/Profile");
const { writeResponse, writeError } = require("../helpers/Header");

const updateProfile = (req, res) => {

    console.log(req)
};

module.exports = updateProfile;
