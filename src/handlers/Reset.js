let { emailCheck, passwordChange } = require("../models/Auth");
let { checkOTP } = require('../models/Reset')
let { writeResponse, writeError } = require("../helpers/Response");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

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

  let mailOptions = {
    from: account.email,
    to: email,
    subject: "Reset Password",
    template: "reset",
    context: {
      code: 2345,
    },
  };
  let sendVerification = () => {
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return err;
      } else {
        return data;
      }
    });
  };
  try {
    if (!email) {
      writeError(res, 406, "An empty field");
    }
    let sendcode = await sendVerification();
    console.log(sendcode)
    return writeResponse(res, true, 200, "Email Sent");
  } catch (err) {
    return writeError(res, 500, err);
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
    return writeResponse(res, true, 200, "Password Changed");
  } catch (err) {
    return writeError(res, err);
  }
};

const validateOTP = async (req, res) => {
    let {otp} = req.body;
    try {
        if(!otp){
            return writeError(res, 400, "An empty field")
        }
        let otpstatus = checkOTP(otp)
        return writeResponse(res, true, 200, otpstatus)
    } catch (err){
        return writeError(res, 500, err)
    }
}

module.exports = {
  emailLookup,
  passwordUpdate,
  sendEmail,
  validateOTP,
};
