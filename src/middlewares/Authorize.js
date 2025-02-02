/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const { writeResponse, writeError } = require("../helpers/Response");

const memberOnly = (req, res, next) => {
  let token = req.header("x-access-token");
  let options = {
    issuer: process.env.ISSUER,
    secretkey: process.env.SECRET_KEY,
  };
  if (!token) {
    return writeResponse(res, false, 400, "User is not logged in");
  }
  jwt.verify(token, options.secretkey, options.issuer, (err, decodedToken) => {
    console.log(err);
    if (err && err.name === "TokenExpiredError") {
      return writeError(res, 403, err.name);
    }
    if (err && err.name === "JsonWebTokenError") {
      return writeError(res, 403, err.name);
    }
    if (err) {
      console.log(err);
      return writeError(res, false, 500, { err });
    }
    if (decodedToken.role === "Facilitator") {
      return writeResponse(res, false, 403, "User doesn't have access");
    }
    if (decodedToken.role === "Member") return next();
  });
};

const facilitatorOnly = (req, res, next) => {
  const coba = req;
  console.log({ coba });
  let token = req.header("x-access-token");
  let options = {
    issuer: process.env.ISSUER,
    secretkey: process.env.SECRET_KEY,
  };
  if (!token) {
    return writeResponse(res, false, 400, "User is not logged in");
  }
  jwt.verify(token, options.secretkey, options.issuer, (err, decodedToken) => {
    if (err && err.name === "TokenExpiredError") {
      return writeError(res, 403, err.name);
    }
    if (err && err.name === "JsonWebTokenError") {
      return writeError(res, 403, err.name);
    }
    if (err) {
      return writeError(res, false, 500, { err });
    }
    if (decodedToken.role === "Member") {
      return writeResponse(res, false, 403, "User doesn't have access");
    }
    if (decodedToken.role === "Facilitator") return next();
  });
};

const tokenCheck = (req, res, next) => {
  let token = req.header("x-access-token");
  let options = {
    issuer: process.env.ISSUER,
    secretkey: process.env.SECRET_KEY,
  };
  if (!token) {
    return writeResponse(res, false, 404, "User is not logged in");
  }
  jwt.verify(token, options.secretkey, options.issuer, (err, decodedToken) => {
    if (err && err.name === "TokenExpiredError") {
      return writeError(res, 403, err.name);
    }
    if (err && err.name === "JsonWebTokenError") {
      return writeError(res, 403, err.name);
    }
    if (err) {
      return writeError(res, false, 500, { err });
    }
    return next();
  });
};

module.exports = {
  memberOnly,
  facilitatorOnly,
  tokenCheck,
};
