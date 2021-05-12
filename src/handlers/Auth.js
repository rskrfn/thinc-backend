/* eslint-disable no-undef */
let {
  usernameCheck,
  emailCheck,
  registerUser,
  loginUser,
} = require("../models/Auth");
let { writeResponse, writeError } = require("../helpers/Response");

//===========================================================
//===================Register Handlers=======================
//===========================================================

const userRegister = async (req, res) => {
  let { name, username, email, password } = req.body;
  name = name.trim();
  username = username.trim();
  email = email.trim();
  password = password.trim();
  let splittedName = name.split(" ");
  let emailValidation = () => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log(false);
      return false;
    } else {
      return true;
    }
  };
  let nameValidation = () => {
    let reg = /^[a-zA-Z ]*$/;
    if (!reg.test(name)) {
      return false;
    } else {
      return true;
    }
  };
  try {
    if (!name || !username || !email || !password) {
      return writeError(res, 406, "An Empty Field");
    }
    if (!nameValidation()) {
      return writeError(res, 406, "Name can only contain alphabets");
    }
    if (!splittedName[1]) {
      return writeError(res, 406, "Fullname required");
    }
    if (username.length < 4) {
      return writeError(res, 406, "Username must be at least 4 character");
    }
    if (emailValidation() === false) {
      return writeError(res, 406, "Wrong Email format");
    }
    if (password.length < 8) {
      return writeError(res, 406, "Password must be at least 8 character");
    }
    if (
      password
        .toLocaleLowerCase()
        .includes(
          splittedName[0].toLocaleLowerCase() ||
            splittedName[1].toLocaleLowerCase()
        )
    ) {
      return writeError(res, 406, "Password cannot contain your name");
    }
    if (password.includes(username)) {
      return writeError(res, 406, "Password cannot contain your username");
    }
    let usernameAvailable = await usernameCheck(username);
    // console.log("username " + usernameAvailable);
    if (usernameAvailable === false) {
      return writeError(res, 406, "Username is taken");
    }
    let emailAvailable = await emailCheck(email);
    console.log("email avail " + emailAvailable);
    if (emailAvailable === true) {
      return writeError(res, 406, "Email Already Registered");
    }
    await registerUser(name, username, email, password);
    return writeResponse(res, true, 200, "Registered Successfully");
  } catch (err) {
    console.log(err);
    return writeError(res, 500, err);
  }
};

//===========================================================
//======================Login Handlers=======================
//===========================================================

const userLogin = async (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();
  try {
    if (!username || !password) {
      return writeError(res, 406, "An Empty Field");
    }
    let UserAuth = await loginUser(username, password);
    if (!UserAuth) {
      return writeError(res, 404, "Incorrect Email or Password");
    }
    return writeResponse(res, true, 200, "Logged in", {
      data: UserAuth.data,
      token: UserAuth.token,
    });
  } catch (err) {
    return writeError(res, err);
  }
};



module.exports = {
  userRegister,
  userLogin,
};
