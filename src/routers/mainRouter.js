//router
const Router = require("express").Router();
const usersRouter = require("./users");
const coursesRouter = require("./courses")
const profileRouter = require("./profile")

//user subrouter
Router.use("/users", usersRouter);
//courses subrouter
Router.use("/courses", coursesRouter)
//profile subrouter
Router.use("/profile", profileRouter)

module.exports = Router;
