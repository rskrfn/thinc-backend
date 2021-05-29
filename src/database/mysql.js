/* eslint-disable no-undef */

//init db
const mysql = require("mysql2");
const {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE} = process.env;
const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,

};

//init db connect
const db = mysql.createConnection(config);
module.exports = db

