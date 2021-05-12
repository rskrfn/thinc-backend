let {getUserId, registerCourse, courseSearch} = require("../models/Course")
let {writeResponse, writeError} = require("../helpers/Response")

const courseRegister = async (req, res) => {
    let {email, coursename} = req.body
    try {
        if(!email){
            return writeResponse(res, false, 400, "Enter User Email")
        }
        if (!coursename){
            return writeResponse(res, false, 400, "Enter Course Name")
        }
        let userId = await getUserId(email)
        // console.log(userId[0].id)
        let courseId = await courseSearch(coursename)
        // console.log(courseId[0].id)
        await registerCourse(userId[0].id, courseId[0].id)
        return writeResponse(res, true, 200, ("Successfully Registered on " + coursename))
    } catch(err){
        return writeError(res, err)
    }
}
module.exports = {
    courseRegister
}