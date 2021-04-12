/* eslint-disable no-undef */
//import
const express = require("express");
require("dotenv").config();
const Router = require("./src/routers/mainRouter");
const cors = require("cors");

//init
const app = express();
//port init
app.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});
//middleware parsing body
const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: false });

app.use(cors());
app.use(jsonParser);
app.use(urlEncodedParser);
app.use(express.static("public"))
app.use(Router);
