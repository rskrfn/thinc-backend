/* eslint-disable no-undef */
let mysql = require("mysql");
let { writeError, writeResponse } = require("../helpers/Response");
let {
  getCourses,
  getCoursesPagination,
  courseSort,
  searchCourse,
  myClass,
  newClass,
  registerCourse,
  getSubCoursesObjective,
  getScore,
} = require("../models/Course");

const userRegisterCourse = async (req, res) => {
  try {
    let { userid, courseid } = req.body;
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
const allCoursePagination = async (req, res) => {
  try {
    let { query, baseUrl, path, hostname, protocol } = req;
    // console.log(req.query);
    let allcoursepagination = await getCoursesPagination(query);
    if (!allcoursepagination) {
      return writeResponse(res, false, 400, "No Data");
    }
    const { count, page, limit, result } = allcoursepagination;
    let totalPage = Math.ceil(count / limit);
    const url =
      protocol + "://" + hostname + ":" + process.env.PORT + baseUrl + path;
    let prev =
      page === 1 ? null : url + `?page=${page - 1}&limit=${query.limit || 5}`;
    let next =
      page === totalPage
        ? null
        : url + `?page=${page + 1}&limit=${query.limit || 5}`;
    const info = { count, page, totalPage, next, prev };
    const display = { info, result };
    return writeResponse(res, true, 200, "Data Received", display);
  } catch (err) {
    return writeResponse(res, false, 500, err);
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
    return writeError(res, err);
  }
};

const getMyClass = async (req, res) => {
  let userId = req.query.id;
  try {
    if (!userId) {
      return writeResponse(res, false, 401, "Missing userId params");
    }
    let MyClass = await myClass(userId);
    return writeResponse(res, true, 200, "Data Recieved", MyClass);
  } catch (err) {
    return console.log(err);
  }
};

const getNewClass = async (req, res) => {
  const userId = req.query.id;
  console.log(req);
  try {
    if (!userId) {
      return writeResponse(res, false, 400, "Missing userId params");
    }
    let NewClass = await newClass(userId);
    return writeResponse(res, true, 200, "Data Recieved", NewClass);
  } catch (err) {
    return writeError(res, err);
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
    return writeError(res, err);
  }
};

const coursesSort = async (req, res) => {
  let sort = req.query;
  let sortValue = sort.sort.split("-").map((q) => {
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
    return writeError(res, 500, err);
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
    return writeError(res, 500, err);
  }
};

module.exports = {
  getAllCourses,
  allCoursePagination,
  getMyClass,
  getNewClass,
  getObjective,
  coursesSort,
  searchCoursebyName,
  userRegisterCourse,
  getUserScore,
};
