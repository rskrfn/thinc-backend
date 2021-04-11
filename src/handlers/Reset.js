let { emailCheck, passwordChange } = require("../models/Auth");
let { writeResponse, writeError } = require("../helpers/Header");

const passwordUpdate = async (req, res) => {
  let { email, newpassword,} = req.body;

  try {
    if (!email || !newpassword){
      return writeResponse(res, false, 400, "An Empty Field")
    }
    let emailAvailable = await emailCheck(email);
    if (emailAvailable === false) {
      return writeResponse(res, false, 400, "Email Not Registered")
    }
    await passwordChange(newpassword, email)
    console.log(emailAvailable[0].email)
    return writeResponse(res, true, 200, ("Password Changed"))
  } catch (err) {
    return writeError(res, err)
  }
}
module.exports = {
  passwordUpdate,
};
