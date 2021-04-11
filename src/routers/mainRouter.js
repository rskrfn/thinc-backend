//router
const Router = require("express").Router();
const usersRouter = require("./users");
const coursesRouter = require("./courses")

//user subrouter
Router.use("/users", usersRouter);
//courses subrouter
Router.use("/courses", coursesRouter)

module.exports = Router;
