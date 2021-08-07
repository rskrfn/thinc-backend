//router
const Router = require("express").Router();
const usersRouter = require("./users");
const coursesRouter = require("./courses");
const profileRouter = require("./profile");
const chatRouter = require("./Chat");

//user subrouter
Router.use("/users", usersRouter);
//courses subrouter
Router.use("/courses", coursesRouter);
//profile subrouter
Router.use("/profile", profileRouter);
//chat subrouter
Router.use("/chat", chatRouter);

// connection test
Router.get("/test", async (req, res) => {
  return res.send({ message: "Server is online!!" });
});

module.exports = Router;
