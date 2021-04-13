let { usernameCheck, emailCheck, registerUser, loginUser } = require("../models/Auth");

let { writeResponse, writeError} = require("../helpers/Header");


const userRegister = async (req, res) => {
  let { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return writeResponse(res, false, 400, "An Empty Field");
    }
    let usernameAvailable = await usernameCheck(username);
    // console.log("username " + usernameAvailable);
    if (usernameAvailable === false) {
      return writeResponse(res, false, 400, "Username is taken");
    }
    let emailAvailable = await emailCheck(email);
    // console.log("email avail " + emailAvailable);
    if (emailAvailable === false) {
      return writeResponse(res, false, 400, "Email Already Registered");
    }
    await registerUser(name, username, email, password);
    return writeResponse(res, true, 200, "Registered Successfully", {name, username, email});
  } catch (err) {
    console.log(err)
    return writeError(res, err);
  }
};


const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try{
    if (!username || !password) {
      return writeResponse(res, false, 400, "An Empty Field");
    }
    let UserAuth = await loginUser(username, password)
    if (!UserAuth){
      return writeResponse(res, false, 401, "Incorrect Email or Password")
    }
    return writeResponse(res, true, 200, "Logged in", {token:UserAuth})

  } catch(err){
    console.log(err)
    return writeError(res, err)
  }
};

module.exports = { userRegister, userLogin };