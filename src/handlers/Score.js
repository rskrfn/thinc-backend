//import
let {isenroled, getscore} = require("../models/Score")
let {writeResponse, writeError} = require("../helpers/Header")

const getScore = async (req, res) => {
    let {email, coursename} = req.body
    try{
        if (!email || !coursename){
            return writeResponse(res, false, 400, "An Empty Field")
        }
        let IsEnroled = await isenroled(email, coursename)
        if (IsEnroled === true){
            let GetScore = await getscore(email)
            return writeResponse(res, true, 200, "Data Received", GetScore)
        }
    }catch(err){
        return writeError(res, err)
    }
}

module.exports = {
    getScore
}