const express = require("express");

const bodyParser = require("body-parser");

const fs = require("fs");
const url = require("url");
const path = require("path");

const public_data = require("./public_data");

const router_get = express.Router();

var mimeType = public_data.mimeType;

// 处理表单提交，对应请求头application/x-www-form-urlencoded
router_get.use(
  bodyParser.urlencoded({
    extended: false // 为true时将使用qs库处理数据，通常不需要
  })
);

var root = path.resolve(process.argv[2] || "../skynocean/dist");

router_get.get("/picture", (req, res, next) => {
  var filepath = path.join(root, "cat_1.png");

  const ext = path.parse(filepath).ext;

  fs.readFile(filepath, (err, data) => {
    if (!err) {
      console.log(filepath + " read success");

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

router_get.get("/json", (req, res, next) => {
  res.end(JSON.stringify(public_data.product_catalog));
});

module.exports = router_get;
