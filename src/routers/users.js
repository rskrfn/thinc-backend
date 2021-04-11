//init Router
const Router = require("express").Router();

//import handler
let { userRegister, userLogin } = require("../handlers/Auth");
let { passwordUpdate } = require("../handlers/Reset");
let { courseRegister} = require("../handlers/RegisterCourse")
let { getScore } = require("../handlers/Score")

//login
Router.post("/login", userLogin);
//register
Router.post("/register", userRegister);
//password update
Router.patch("/forgot", passwordUpdate);

//course register
Router.post("/courseregister", courseRegister)
//score
Router.get("/score", getScore)
module.exports = Router;