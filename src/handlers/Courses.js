/* eslint-disable no-undef */
let mysql = require("mysql");
let { writeError, writeResponse } = require("../helpers/Response");
let {
  getCourses,
  getCoursesPagination,
  courseSort,
  searchCourse,
  getUserId,
  myClass,
  newClass,
  registerCourse,
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
    console.log(req.query);
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
  console.log(searchValue);
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
  let email = "emirkharisma@arkademy.com";
  try {
    if (!email) {
      return writeResponse(res, false, 401, "Enter User Email");
    }
    let UserId = await getUserId(email);
    if (!UserId) {
      return writeResponse(
        res,
        true,
        200,
        "This user hasn't registered in any class"
      );
    }
    if (UserId === false) {
      return writeResponse(res, false, 400, "Email Not Found");
    }
    let MyClass = await myClass(UserId[0].id);
    return writeResponse(res, true, 200, "Data Recieved", MyClass);
  } catch (err) {
    return console.log(err);
  }
};

const getNewClass = async (req, res) => {
  let { email } = req.body;
  try {
    if (!email) {
      return writeResponse(res, false, 400, "Enter User Email");
    }
    let UserId = await getUserId(email);
    console.log(UserId);
    if (UserId === false) {
      return writeResponse(res, false, 400, "Email Not Found");
    }
    let NewClass = await newClass(UserId[0].id);
    return writeResponse(res, true, 200, "Data Recieved", NewClass);
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
  console.log(sortValue);
  try {
    if (!sort) {
      return writeResponse(res, false, 400, "Empty Query");
    }
    let SortCourse = await courseSort(sortValue);
    console.log(SortCourse);
    return writeResponse(res, true, 200, "Data Received", SortCourse);
  } catch (err) {
    return writeError(res, err);
  }
};

module.exports = {
  getAllCourses,
  allCoursePagination, 
  getMyClass,
  getNewClass,
  coursesSort,
  searchCoursebyName,
  userRegisterCourse,
};
