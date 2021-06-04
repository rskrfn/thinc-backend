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
//port init
// app.listen(process.env.PORT, () => {
//   console.log("Server Running at Port", process.env.PORT);
// });
//middleware parsing body
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
io.on("conneciton", (socket) => {
  console.log(`${socket.id} connected`);
  io.emit("welcome", "Hello!!");
});
server.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});
