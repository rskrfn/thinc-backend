/* eslint-disable no-unused-vars */
const Router = require("express").Router();
const { uploadDP, multerUpload } = require("../middlewares/Multer");
const updateProfile = require('../handlers/Profile')

Router.post("/upload", multerUpload.single("image"), function (req, res) {
  let { file } = req;
  let url = `/images/${file.filename}`;
  res.status(200).json({ msg: "Upload Success", url });
});

// Router.patch("/", uploadDP.single("displaypicture"), function (req, res) {
//   let { file } = req;
//   let url = `/images/displaypicture/${file.filename}`;
//   res.status(200).json({ msg: "Image Uploaded", url });
// });

Router.patch("/coba", updateProfile)

module.exports = Router;