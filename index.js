/* eslint-disable no-undef */
//import
const express = require("express");
require("dotenv").config();
const Router = require("./src/routers/mainRouter");
const cors = require("cors");
const morgan = require("morgan");
const socketIO = require("socket.io");
const http = require("http");

//init
const app = express();
const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: false });
app.use(morgan("dev"));
app.use(cors());
app.use(jsonParser);
app.use(urlEncodedParser);
app.use(express.static("public"));
app.use(Router);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUser = [];

const adduser = (userId, socketId) => {
  {
    onlineUser.some((user) => user.userId === userId)
      ? null
      : onlineUser.push({ userId, socketId });
  }
  console.log({ onlineUser });
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
  console.log({ onlineUser });
};

const getUser = (userId) => {
  let userFound = onlineUser.find((user) => user.userId === userId);
  console.log(userFound, userId);
  if (!userFound) {
    return null;
  }
  return userFound;
};

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  io.emit("welcome", "Hello!!");

  socket.on("adduser", (userId, socketId, coba) => {
    console.log(userId, socket.id, coba);
    adduser(userId, socket.id);
    io.emit("getUsers", onlineUser);
  });

  socket.on("private", (body, receiverId, cb) => {
    let user = getUser(receiverId);
    let sender = getUser(body.sender);
    if (user) {
      io.to(user.socketId, sender.socketId).emit("getMessage", body);
      cb({ status: true });
    }
    cb({ status: false });
  });

  socket.on("course-register", (owner, sender, cb) => {
    let ownerId = getUser(owner.id);
    console.log("io", owner, sender);
    if (ownerId) {
      io.to(ownerId.socketId).emit("course-notif", owner.coursename, sender);
      cb({ status: true });
    }
    console.log("io", ownerId);
    cb({ status: false });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(onlineUser);
    console.log("a user disconnected");
  });
});
server.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});
