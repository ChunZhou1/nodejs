const express = require("express");

const multer = require("multer");

//create router
const router_upload = express.Router();

const upload = multer({
  dest: "./static/upload"
});

// process upload file
router_upload.use(upload.any());

router_upload.post("/picture", (req, res, next) => {
  console.log("originalname=" + req.files[0].originalname);
  console.log("filename=" + req.files[0].filename);

  console.log("upload success!");

  res.send({
    error: 0,
    data: req.body,
    msg: "upload success"
  });
});

module.exports = router_upload;
