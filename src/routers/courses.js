const Router = require("express").Router();

//import
let {
  newClassPaginated,
  getMyClass,
  getNewClass,
  searchCoursebyName,
  userRegisterCourse,
  getObjective,
  getUserScore,
} = require("../handlers/Courses");
let {
  createCourse,
  deleteCourse,
  getFacilitatorClass,
} = require("../handlers/Fasilitator");
let authorize = require("../middlewares/Authorize");

Router.get("/all", newClassPaginated);
Router.get("/myclass", getMyClass);
Router.get("/newclass", getNewClass); //opsional
Router.get("/objective", getObjective);
// Router.get("/", coursesSort);
Router.get("/", searchCoursebyName);
Router.post("/register", authorize.memberOnly, userRegisterCourse);

Router.get("/score", getUserScore);

Router.get("/facilitatorclass", authorize.facilitatorOnly, getFacilitatorClass);
Router.post("/addcourse", authorize.facilitatorOnly, createCourse);
Router.delete("/deletecourse", authorize.facilitatorOnly, deleteCourse);

module.exports = Router;
