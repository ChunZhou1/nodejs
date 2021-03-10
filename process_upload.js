const express = require("express");

const multer = require("multer");

const fs = require("fs");

const bodyParser = require("body-parser");

const picture_dir = "./static/upload";

const query = require("./db_get");

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

  switch (json_name) {
    case "product":
      var input_obj = [];
      input_obj.push(req.body);
      query.db_insert_product(input_obj, function(err, result) {
        if (!err) {
          res.send("json upload success");
        } else {
          res.send("json upload fail");
        }
      });

      break;

    case "catalog":
      var input_obj = [];
      input_obj.push(req.body);

      query.db_insert_catalog(input_obj, function(err, result) {
        if (!err) {
          console.log("insert catalog ok");

          res.send("json upload success");
        } else {
          res.send("json upload fail");
        }
      });

      break;

    default:
      res.send("json upload param err");
      break;
  }
});

module.exports = router_upload;
