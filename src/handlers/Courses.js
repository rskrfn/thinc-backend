/* eslint-disable no-undef */
let mysql = require("mysql2");
let { writeError, writeResponse } = require("../helpers/Response");
let {
  getCourses,
  courseSort,
  searchCourse,
  myClass,
  registerCourse,
  getSubCoursesObjective,
  getScore,
  getNewClassNew,
  getAllSchedule,
  getScheduleUser,
  classMember,
} = require("../models/Course");

const userRegisterCourse = async (req, res) => {
  try {
    let { userid, courseid } = req.body;
    console.log("check", userid, courseid);
    let courseRegister = await registerCourse(userid, courseid);
    if (courseRegister === false) {
      return writeError(res, 400, "User is Enrolled");
    }
    return writeResponse(res, true, 200, courseRegister);
  } catch (err) {
    return writeError(res, 500, "Server Error");
  }
};

const getAllCourses = async (req, res) => {
  try {
    let getallcourse = await getCourses();
    if (!getallcourse) {
      return writeResponse(res, false, 400, "No Data");
    }
    return writeResponse(res, true, 200, getallcourse);
  } catch (err) {
    return writeResponse(res, false, 500, err);
  }
};
const getMyClass = async (req, res) => {
  let { baseUrl, path, hostname, protocol } = req;
  let { id, page } = req.query;
  try {
    if (!id || !page) {
      return writeResponse(res, false, 401, "Missing query params");
    }
    if (page < 1) {
      return writeError(res, 400, "Page query must be above 0");
    }
    let MyClass = await myClass(id, page);
    if (MyClass === false) {
      return writeResponse(res, false, 404, "Data not found");
    }
    console.log(MyClass);
    const { count, currpage, limit, result } = MyClass;
    let totalPage = Math.ceil(count / limit);
    if (currpage > totalPage) {
      return writeError(
        res,
        404,
        `Data cannot be found on page ${currpage}, please go back to previous page`
      );
    }
    if (currpage <= totalPage) {
      const url =
        protocol +
        "://" +
        hostname +
        ":" +
        process.env.PORT +
        baseUrl +
        path +
        "?id=" +
        id +
        "&";
      let prev = page <= 1 ? null : url + `page=${currpage - 1}`;
      let next = currpage === totalPage ? null : url + `page=${currpage + 1}`;
      const info = { count, currpage, totalPage, next, prev };
      const display = { info, result };
      return writeResponse(res, true, 200, "Data Recieved", display);
    }
  } catch (err) {
    return console.log(err);
  }
};

const newClassPaginated = async (req, res) => {
  try {
    let { baseUrl, path, hostname, protocol } = req;
    let { userid, search, sort, category, level, price, page } = req.query;
    // console.log(req.query);
    if (!userid) {
      return writeError(res, 403, "User id required");
    }
    if (page < 1) {
      return writeError(res, 400, "Page query must be above 0");
    }
    const searchval = search ? `%${search}%` : "%%";
    let sortval, sortby, order;
    if (!sort) {
      sort = null;
    }
    if (sort) {
      sortval = sort.split("-");
      switch (sortval[0].toLowerCase()) {
        case "category":
          sortby = mysql.raw("cat.category");
          break;
        case "level":
          sortby = mysql.raw("course_level");
          break;
        case "price":
          sortby = mysql.raw("c.price");
          break;
        default:
          sortby = null;
          break;
      }
      // console.log("sortby " + sortby);
      order = sortval[1] === "AZ" ? mysql.raw("ASC") : mysql.raw("DESC");
    }
    if (!category) {
      category = null;
    }
    if (!level) {
      level = null;
    }
    if (!level) {
      level = null;
    }
    if (!price) {
      price = null;
    }
    if (!page) {
      page = 1;
    }
    // console.log(userid);
    let newClass = await getNewClassNew(
      userid,
      searchval,
      category,
      level,
      price,
      sortby,
      order,
      page
    );
    // console.log("result " + newClass.result.length);
    if (!newClass.result.length) {
      return writeResponse(res, false, 400, "No Data");
    }
    const { count, currpage, limit, result } = newClass;
    // console.log(limit);
    let totalPage = Math.ceil(count / limit);
    if (currpage > totalPage) {
      return writeError(
        res,
        404,
        `Data cannot be found on page ${currpage}, please go back to previous page`
      );
    }
    if (currpage <= totalPage) {
      const url =
        protocol +
        "://" +
        hostname +
        ":" +
        process.env.PORT +
        baseUrl +
        path +
        "?userid=" +
        userid;
      +"&";
      let prev = page <= 1 ? null : url + `?page=${currpage - 1}`;
      let next = currpage === totalPage ? null : url + `?page=${currpage + 1}`;
      const info = { count, currpage, totalPage, next, prev };
      const display = { info, result };
      return writeResponse(res, true, 200, "Data Received", display);
    }
  } catch (err) {
    return writeError(res, 500, "", { err });
  }
};

const searchCoursebyName = async (req, res) => {
  let { search } = req.query;
  let searchValue = "%" + search + "%";
  // console.log(searchValue);
  try {
    if (!search) {
      return writeResponse(res, false, 400, "Enter Search Value");
    }
    let SearchCourse = await searchCourse(searchValue);
    return writeResponse(res, true, 200, SearchCourse);
  } catch (err) {
    return writeError(res, 500, "", err);
  }
};

const getObjective = async (req, res) => {
  let courseId = req.query.courseid;
  // console.log(req.query);
  try {
    if (!courseId) {
      return writeError(res, 400, "Missing courseid params");
    }
    let objectives = await getSubCoursesObjective(courseId);
    return writeResponse(res, true, 200, "Data Found", objectives);
  } catch (err) {
    return writeError(res, 500, "", err);
  }
};

const coursesSort = async (req, res) => {
  let sort = req.query;
  let sortValue = sort.sort?.split("-").map((q) => {
    switch (q) {
      case "AZ":
        return mysql.raw("ASC");
      case "ZA":
        return mysql.raw("DESC");
      default:
        return mysql.raw(q);
    }
  });
  // console.log(sortValue);
  try {
    if (!sort) {
      return writeResponse(res, false, 400, "Empty Query");
    }
    let SortCourse = await courseSort(sortValue);
    console.log(SortCourse);
    return writeResponse(res, true, 200, "Data Received", SortCourse);
  } catch (err) {
    return writeError(res, 500, "", err);
  }
};
const getUserScore = async (req, res) => {
  let query = req.query;
  try {
    if (!query.userid || !query.courseid || !query) {
      return writeError(res, 400, "Missing params");
    }
    let result = await getScore(query.userid, query.courseid);
    if (!result) {
      return writeError(res, 404, "Data not found");
    }
    return writeResponse(res, true, 200, "Coba", result);
  } catch (err) {
    // console.log(err);
    return writeError(res, 500, "", err);
  }
};

const allSchedule = async (req, res) => {
  let { schedule } = req.query;
  try {
    if (!schedule) {
      return writeError(res, 400, "Missing params");
    }
    let result = await getAllSchedule(schedule);
    if (!result) {
      return writeError(res, 404, "Data not found");
    }
    return writeResponse(res, true, 200, "Data found", result);
  } catch (err) {
    return writeError(res, 500, "Error Occured", { err });
  }
};

const foryou = async (req, res) => {
  let { schedule, userid } = req.query;
  try {
    if (!schedule || !userid) {
      return writeError(res, 400, "Missing query params");
    }
    let result = await getScheduleUser(userid, schedule);
    if (!result) {
      return writeError(res, 404, "Data not found");
    }
    return writeResponse(res, true, 200, "Data found", result);
  } catch (err) {
    return writeError(res, 500, "Error Occured", { err });
  }
};

const getClassMember = async (req, res) => {
  let { courseid } = req.query;
  try {
    if (!courseid) {
      return writeError(res, 400, "Missing query params");
    }
    const result = await classMember(courseid);
    if (result === false) {
      return writeResponse(res, true, 404, "No data found");
    }
    return writeResponse(res, true, 200, "Data found", result);
  } catch (err) {
    return writeError(res, 500, "Error Occured", { err });
  }
};

module.exports = {
  getAllCourses,
  newClassPaginated,
  getMyClass,
  getObjective,
  coursesSort,
  searchCoursebyName,
  userRegisterCourse,
  getUserScore,
  allSchedule,
  foryou,
  getClassMember,
};
