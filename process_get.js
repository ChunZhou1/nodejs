const express = require("express");

const fs = require("fs");
const url = require("url");
const path = require("path");

const bodyParser = require("body-parser");

const public_data = require("./public_data");

const router_get = express.Router();

var mimeType = public_data.mimeType;

router_get.use(
  bodyParser.urlencoded({
    extended: false // 为true时将使用qs库处理数据，通常不需要
  })
);

var root = path.resolve(process.argv[2] || "../skynocean/dist");

router_get.get("/picture/:name", (req, res, next) => {
  var file_name = req.url.slice(9);

  var filepath = path.join(root, file_name);

  const ext = path.parse(filepath).ext;

  fs.readFile(filepath, (err, data) => {
    if (!err) {
      /* console.log(filepath + " read success");*/

      /* res.setHeader("Content-type", mimeType[ext] || "text/plain");*/
      res.setHeader(
        "Content-type",
        mimeType[ext] || " application/octet-stream"
      );

      res.end(data);
    } else {
      console.log("read pictute file error");
      res.end("picture file not found");
    }
  });
});

router_get.get("/json/:name", (req, res, next) => {
  var file_name = req.url.slice(6);

  var json_obj;

  switch (file_name) {
    case "product":
      json_obj = public_data.product;
      break;

    case "product_catalog":
      json_obj = public_data.product_catalog;
      break;

    default:
      json_obj = { id: 9999, msg: "not found" };
      break;
  }

  res.end(JSON.stringify(json_obj));
});

module.exports = router_get;
