const Router = require("express").Router();

//import
let {
  allCoursePagination,
  getMyClass,
  getNewClass,
  coursesSort,
  searchCoursebyName,
  userRegisterCourse,
} = require("../handlers/Courses");
let { createCourse } = require("../handlers/Fasilitator");
let { deleteCourse } = require("../handlers/Fasilitator");
let authorize = require("../middlewares/Authorize");

Router.get("/all", allCoursePagination);
Router.get("/myclass", getMyClass);
Router.get("/newclass", getNewClass); //opsional
Router.get("/", coursesSort);
Router.get("/", searchCoursebyName);
Router.post("/register", authorize.memberOnly, userRegisterCourse);

Router.post("/addcourse", authorize.facilitatorOnly, createCourse);
Router.delete("/deletecourse", authorize.facilitatorOnly, deleteCourse);

module.exports = Router;
