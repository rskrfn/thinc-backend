const Router = require("express").Router();
const { getAllUsers } = require("../handlers/Chat");

Router.get("/user", getAllUsers);

module.exports = Router;
