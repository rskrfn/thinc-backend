const Router = require("express").Router();

//import
let {
  allCoursePagination,
  getMyClass,
  getNewClass,
  coursesSort,
  searchCoursebyName,
} = require("../handlers/Courses");
let { createCourse } = require("../handlers/Fasilitator");
let { deleteCourse } = require("../handlers/Fasilitator");
let authorize = require("../middlewares/Authorize");

Router.get("/all", allCoursePagination);
Router.get("/myclass", getMyClass);
Router.get("/newclass", getNewClass); //opsional

Router.get("/params", coursesSort);
Router.get("/", searchCoursebyName);
Router.post("/addcourse", authorize.facilitatorOnly, createCourse);
Router.delete("/deletecourse", authorize.facilitatorOnly, deleteCourse);

module.exports = Router;
