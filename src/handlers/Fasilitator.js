let {
  getUserLevel,
  addcourse,
  deletecourse,
  searchcourse,
  facilitatorClass,
  getFacilitatorSchedule,
} = require("../models/Course");
let { writeResponse, writeError } = require("../helpers/Response");

const createCourse = async (req, res) => {
  let {
    id,
    coursename,
    category,
    description,
    level,
    price,
    schedule,
    start,
    end,
  } = req.body;
  try {
    if (
      !id ||
      !coursename ||
      !category ||
      !description ||
      !level ||
      !price ||
      !schedule ||
      !start ||
      !end
    ) {
      return writeResponse(res, false, 400, "An Empty Field");
    }
    let userLevel = await getUserLevel(id);
    if (userLevel === false) {
      return writeResponse(res, false, 400, "Email is Not Registered");
    }
    if (userLevel[0].user_level !== 1) {
      console.log(userLevel[0].user_level);
      return writeResponse(
        res,
        false,
        400,
        "This User is Not Authorized to Perform This Action"
      );
    }
    console.log(userLevel[0].user_level);
    await addcourse(
      id,
      coursename,
      category,
      description,
      level,
      price,
      schedule,
      start,
      end
    );
    return writeResponse(res, true, 200, "Course Added");
  } catch (err) {
    return console.log(err);
  }
};

const deleteCourse = async (req, res) => {
  let { email, coursename } = req.body;
  try {
    if (!email) {
      return writeResponse(res, false, 400, "Enter User Email");
    }
    if (!coursename) {
      return writeResponse(res, false, 400, "Enter Course Name");
    }
    let courseAvailable = await searchcourse(coursename);
    if (courseAvailable === false) {
      return writeResponse(res, false, 400, "Course is Not Found");
    }
    let userLevel = await getUserLevel(email);
    if (userLevel === false) {
      return writeResponse(res, false, 400, "Email is Not Registered");
    }
    if (userLevel[0].user_level !== 1) {
      return writeResponse(
        res,
        false,
        400,
        "This User is Not Authorized to Perform This Action"
      );
    }
    await deletecourse(coursename);
    return writeResponse(res, true, 200, coursename + " Deleted");
  } catch (err) {
    return writeError(res, err);
  }
};

const getFacilitatorClass = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return writeError(res, 400, "Missing query");
    }
    const result = await facilitatorClass(id);
    if (!result) {
      return writeResponse(
        res,
        true,
        404,
        "Particular user doesn't have any courses"
      );
    }
    return writeResponse(res, true, 200, "Data Found", result);
  } catch (err) {
    return writeError(res, 500, "Error occured", err);
  }
};

const facilitatorSchedule = async (req, res) => {
  const { id, schedule } = req.query;
  try {
    if (!id || !schedule) {
      return writeError(res, 400, "Missing query");
    }
    const result = await getFacilitatorSchedule(id, schedule);
    if (!result) {
      return writeResponse(res, true, 404, "No schedule found");
    }
    return writeResponse(res, true, 200, "Data Found", result);
  } catch (err) {
    return writeError(res, 500, "Error Occured");
  }
};

module.exports = {
  createCourse,
  deleteCourse,
  getFacilitatorClass,
  facilitatorSchedule,
};
