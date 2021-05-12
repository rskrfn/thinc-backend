//init Router
const Router = require("express").Router();

//import handler
let { userRegister, userLogin } = require("../handlers/Auth");
let { emailLookup, passwordUpdate, sendEmail } = require("../handlers/Reset");
let { courseRegister } = require("../handlers/RegisterCourse");
let { getScore } = require("../handlers/Score");
let {validateOTP} = require('../handlers/Reset')
let authorize = require("../middlewares/Authorize");

//login
Router.post("/login", userLogin);
//register
Router.post("/register", userRegister);
//reset
Router.post("/forgot", emailLookup);
Router.patch("/forgot", passwordUpdate);
Router.post("/sendemail", sendEmail);

//course register
Router.post("/courseregister", authorize.memberOnly, courseRegister);
//score
Router.get("/score", getScore);

Router.post("/otp", validateOTP)

module.exports = Router;
