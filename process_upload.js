const express = require("express");

const multer = require("multer");

const fs = require("fs");

const bodyParser = require("body-parser");

const picture_dir = "./static/upload";

//create router
const router_upload = express.Router();

const upload = multer({
  dest: picture_dir
});

// process upload file
router_upload.use(upload.any());

router_upload.use(bodyParser.json()); // process json

router_upload.post("/picture", (req, res, next) => {
  console.log("originalname=" + req.files[0].originalname);
  console.log("filename=" + req.files[0].filename);

  var source_name = picture_dir + "/" + req.files[0].filename;
  var target_name = picture_dir + "/" + req.files[0].originalname;

  fs.renameSync(source_name, target_name);

  console.log("upload picture success!");

  res.send("picture upload success");
});

router_upload.post("/json/:name", (req, res, next) => {
  var json_name = req.url.slice(6);

  console.log("json_name=" + json_name);

  console.log(req.body);

  res.send("json upload success");
});

module.exports = router_upload;
