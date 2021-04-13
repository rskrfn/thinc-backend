/* eslint-disable no-unused-vars */
const { getUserProfile, updateUserProfile } = require("../models/Profile");
const { writeResponse, writeError } = require("../helpers/Header");

const getUser = async (req, res) => {
    try{
        let result = await getUserProfile(req.body.email)
        if(result === false) {
            return writeResponse(res, false, 400, "User Not Found")
        }
        return writeResponse(res, true, 200, {result: result})
    } catch (err) {
        return writeError(res, err)
    }
}
const updateProfile = async (req, res) => {
    try{
    let {file} = req;
    let display_picture = file.length !== 0 ? `/images/${file.filename}` : null
    let data = { ...req.body, display_picture}
    console.log(data)
    let result = await updateUserProfile(data, req.body.email)
    console.log(result)
    if(result === false){
        return writeResponse(res, false, 400, "Data Not Updated")
    }
    writeResponse(res, true, 200, "Data Changed")
    } catch (err) {
        return writeError(res, err)
    }
};

module.exports = {getUser, updateProfile}
