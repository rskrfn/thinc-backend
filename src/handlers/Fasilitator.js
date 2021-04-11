let {getUserLevel, addcourse, deletecourse, searchcourse} = require("../models/Course")
let {writeResponse, writeError} = require("../helpers/Header")

const createCourse = async (req, res) => {
    let {email, coursename, category, description, level, price} = req.body
    try{
        if(!email ||!coursename ||!category ||!description ||!level || !price){
            return writeResponse(res, false, 400, "An Empty Field")
        }
        let userLevel = await getUserLevel(email)
        if (userLevel === false){
            return writeResponse(res, false, 400, "Email is Not Registered")
        }
        if (userLevel[0].user_level !== 1){
            console.log(userLevel[0].user_level)
            return writeResponse(res, false, 400, "This User is Not Authorized to Perform This Action")
        }
        console.log(userLevel[0].user_level)
        await addcourse(coursename, category, description, level, price)
        return writeResponse(res, true, 200, "Course Added")
    } catch (err){
        return console.log(err)
    }
}

const deleteCourse = async(req, res) => {
    let {email, coursename} = req.body
    try{
        if(!email){
            return writeResponse(res, false, 400, "Enter User Email")
        }
        if (!coursename){
            return writeResponse(res, false, 400, "Enter Course Name")
        }
        let courseAvailable = await searchcourse(coursename)
        if (courseAvailable === false){
            return writeResponse(res, false, 400, "Course is Not Found")
        }
        let userLevel = await getUserLevel(email)
        if (userLevel === false){
            return writeResponse(res, false, 400, "Email is Not Registered")
        }
        if (userLevel[0].user_level !== 1){
            return writeResponse(res, false, 400, "This User is Not Authorized to Perform This Action")
        }
        await deletecourse(coursename)
        return writeResponse(res, true, 200, (coursename + " Deleted"))
    }catch(err){
        return writeError(res, err)
    }
}

module.exports = {
    createCourse, deleteCourse
}