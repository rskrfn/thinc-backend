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

  socket.on("adduser", (userId, socketId) => {
    // console.log(socket, userId);
    adduser(userId, socketId);
    io.emit("getUsers", onlineUser);
  });

  socket.on("private-message", (room, cb) => {
    socket.join(room);
    console.log(room);
    cb({ status: true });
  });

  socket.on("chat", (body, room, cb) => {
    console.log("Incoming message", body, room);
    cb({ status: true });
    if (room) {
      io.to(room).emit("chat", body);
    } else {
      console.log("broadcast");
      io.emit("chat", body);
    }
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

  socket.on("send-message", (body, room, cb) => {
    console.log("Incoming message");
    cb({ status: true });
    if (room) {
      console.log(room, body);
      socket.to("room1").emit("message-received", body);
    } else {
      console.log(body);
      socket.broadcast.emit("message-received", body);
    }
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(onlineUser);
    console.log("a user has been disconnected");
  });
});
server.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});
