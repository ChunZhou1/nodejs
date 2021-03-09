const express = require("express");

const multer = require("multer");

const bodyParser = require("body-parser");

//create router
const router_upload = express.Router();

const upload = multer({
  dest: "./static/upload"
});

// process upload file
router_upload.use(upload.any());

router_upload.use(bodyParser.json()); // process json

router_upload.post("/picture", (req, res, next) => {
  console.log("originalname=" + req.files[0].originalname);
  console.log("filename=" + req.files[0].filename);

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
