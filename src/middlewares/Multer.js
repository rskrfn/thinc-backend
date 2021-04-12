const multer = require("multer");
const path = require("path");

const dpStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/displaypicture");
  },
  filename: function (req, file, cb) {
    let fileNameFormat = `${req.user.username}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, fileNameFormat);
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    let fileNameFormat = `${Date.now()}_${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, fileNameFormat);
  },
});

const power = (byte, n) => {
  if (n) return byte * power(byte, n - 1);
  return 1;
};
let bytes = 1000;
let limits = { fileSize: 2 * power(bytes, 2) };
const fileFilter = (req, file, cb) => {
  const acceptedFileType = /jpg|jpeg|gif|png/i;
  const isFileTypeAccepted = acceptedFileType.test(
    path.extname(file.originalname)
  );
  if (!isFileTypeAccepted) return cb(new Error("Error: Images Only"));
  cb(null, true);
};

let uploadDP = multer({
  dpStorage,
  limits,
  fileFilter,
});

let multerUpload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = {uploadDP, multerUpload};
