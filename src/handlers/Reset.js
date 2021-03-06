/* eslint-disable no-undef */
let {
  emailCheck,
  checkOTP,
  createOTP,
  passwordChange,
  deleteOTP,
} = require("../models/Reset");
let { writeResponse, writeError } = require("../helpers/Response");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

//===========================================================
//======================Reset Handlers=======================
//===========================================================
const emailLookup = async (req, res) => {
  let { email } = req.body;
  try {
    if (!email) {
      return writeError(res, 406, "An Empty Field");
    }
    let emailFound = await emailCheck(email);
    if (emailFound === false) {
      return writeError(res, 404, "User not found");
    }
    return writeResponse(res, true, 200, "Email exist");
  } catch (err) {
    return writeError(res, 500, err);
  }
};

const sendEmail = async (req, res) => {
  const code = Math.floor(1000 + Math.random() * 9000);
  let expire = dayjs.utc().add(3, "hour").format();
  let { email } = req.body;
  let account = {
    email: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD,
  };
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./src/assets/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/assets/views"),
    extName: ".handlebars",
  };
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: account.email,
      pass: account.password,
    },
  });
  transporter.use("compile", hbs(handlebarOptions));

  let sendVerification = (createdcode) => {
    let mailOptions = {
      from: account.email,
      to: email,
      subject: "Reset Password",
      template: "reset",
      context: {
        code: createdcode,
      },
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return console.log(err);
      } else {
        return data;
      }
    });
  };
  try {
    if (!email) {
      return writeError(res, 406, "An empty field");
    }
    let emailFound = await emailCheck(email);
    if (emailFound === false) {
      return writeError(res, 404, "User not found");
    }
    let createotp = await createOTP(email, code, expire);
    if (!createotp) {
      return writeError(res, 500, "Failed to create OTP code");
    }
    console.log(createotp);
    sendVerification(code);
    // console.log(sendcode);
    return writeResponse(res, true, 200, "Email Sent");
  } catch (err) {
    // console.log(err);
    return writeError(res, 500, { err });
  }
};

const passwordUpdate = async (req, res) => {
  let { email, newpassword } = req.body;
  try {
    if (!email || !newpassword) {
      return writeResponse(res, false, 400, "An Empty Field");
    }
    let emailAvailable = await emailCheck(email);
    if (emailAvailable === false) {
      return writeResponse(res, false, 400, "Email Not Registered");
    }
    await passwordChange(newpassword, email);
    await deleteOTP(emailAvailable);
    return writeResponse(res, true, 200, "Password Changed");
  } catch (err) {
    return writeError(res, 500, { err });
  }
};

const validateOTP = async (req, res) => {
  let now = dayjs.utc().format();
  let { query } = req;
  console.log(query);
  let isValid = (end_time) => {
    let expire = end_time;
    let nowdate = now.slice(0, 10).split("-").join("");
    let expiredate = expire.slice(0, 10).split("-").join("");
    let nowtime = now.slice(11, 19).split(":").join("");
    let expiretime = expire.slice(11, 19).split(":").join("");
    let validdate;
    let validtime;
    if (nowdate === expiredate) {
      validdate = true;
    }
    if (nowtime < expiretime) {
      validtime = true;
    }
    if (validdate && validtime) {
      return true;
    } else {
      return false;
    }
  };

  try {
    if (!query) {
      return writeError(res, 400, "An empty field");
    }
    if (!query.email) {
      return writeError(res, 404, "Email empty");
    }
    if (!query.otp) {
      return writeError(res, 404, "OTP empty");
    }
    let otpstatus = await checkOTP(query.email, query.otp);
    console.log(otpstatus);
    if (!otpstatus) {
      return writeError(res, 404, "Wrong otp code");
    }
    // otpstatus = {};
    let isvalid = isValid(otpstatus[0].valid_until);
    // console.log(isvalid);
    if (!isvalid) {
      // isvalid = {};
      return writeError(res, 406, "OTP Expired");
    }
    return writeResponse(res, true, 200, "OTP valid");
  } catch (err) {
    console.log(err);
    return writeError(res, 500, "", { err });
  }
};

module.exports = {
  emailLookup,
  passwordUpdate,
  sendEmail,
  validateOTP,
};
