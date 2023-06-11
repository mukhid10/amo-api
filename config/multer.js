const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./asset");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const imageFilter = (req, file, callback) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = { storage, imageFilter };
