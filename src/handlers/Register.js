let { usernameCheck, emailCheck, registerUser } = require("../models/Auth");
let { writeResponse, writeError } = require("../helpers/Response");

const register = async (req, res) => {
  let { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return writeResponse(res, false, 400, "An Empty Field");
    }
    let usernameAvailable = await usernameCheck(username);
    // console.log("username " + usernameAvailable);
    if (usernameAvailable === false) {
      return writeResponse(res, false, 400, "Username Not Available");
    }
    let emailAvailable = await emailCheck(email);
    // console.log("email avail " + emailAvailable);
    if (emailAvailable === false) {
      return writeResponse(res, false, 400, "Email Already Registered");
    }
    await registerUser(name, username, email, password);
    return writeResponse(res, true, 200, "Registered Successfully", {name, username, email});
  } catch (err) {
    return writeError(res, 400, "Failed", err);
  }
};

module.exports = { register };
