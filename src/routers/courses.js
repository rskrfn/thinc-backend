const Router = require("express").Router();

//import
let {
  getAllCourses,
  getMyClass,
  getNewClass,
  coursesSort,
  searchCoursebyName,
} = require("../handlers/Courses");
let {createCourse} = require("../handlers/Fasilitator")
let {deleteCourse} = require("../handlers/Fasilitator")

Router.get("/all", getAllCourses);
Router.get("/myclass", getMyClass);
Router.get("/newclass", getNewClass); //opsional

Router.get("/params", coursesSort);
Router.get("/", searchCoursebyName);
Router.post("/addcourse", createCourse); 

Router.delete("/deletecourse", deleteCourse);

module.exports = Router;
