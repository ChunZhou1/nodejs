var express = require("express");

const fs = require("fs");
const url = require("url");
const path = require("path");

const multer = require("multer");
const bodyParser = require("body-parser");

const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".doc": "application/msword",
  ".eot": "application/vnd.ms-fontobject",
  ".ttf": "application/x-font-ttf"
};

const product_catalog = [
  {
    id: 1,
    catalog_name: "Smart Home"
  },

  {
    id: 2,
    catalog_name: "Smart Manufacturing"
  },

  {
    id: 3,
    catalog_name: "Smart health"
  },

  {
    id: 4,
    catalog_name: "Smart Farming - Agriculture"
  }
];

var root = path.resolve(process.argv[2] || "../skynocean/dist");

console.log("Static root dir: " + root);

var app = express();

// 设置保存上传文件路径
const upload = multer({
  dest: "./static/upload"
});

// 处理上传文件
app.use(upload.any());

// 处理表单提交，对应请求头application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false // 为true时将使用qs库处理数据，通常不需要
  })
);

// 接收文件上传结果
app.post("/upload/:name", (req, res, next) => {
  /*console.log(req.body);*/
  console.log("originalname=" + req.files[0].originalname);
  console.log("filename=" + req.files[0].filename);

  console.log("upload success!");

  res.send({
    error: 0,
    data: req.body,
    msg: "upload success"
  });
});

app.get("/reg", (req, res, next) => {
  console.log(req.query);
  res.send({
    error: 0,
    data: req.query,
    msg: "注册成功"
  });
});

app.get("/:name", function(req, res) {
  /*console.log(req.url + "777777777");*/
  var pathname = url.parse(req.url).pathname;

  var filepath = path.join(root, pathname);
  const ext = path.parse(filepath).ext;
  /*console.log("filepath=" + filepath + " ready to read");*/

  fs.readFile(filepath, (err, data) => {
    if (!err) {
      /*  console.log(filepath + " read success");*/

      res.setHeader("Content-type", mimeType[ext] || "text/plain");
      res.end(data);
    } else {
      console.log("read error");
      res.end("404 not found");
    }
  });
});

app.get("/search/:name", function(req, res) {
  name = req.params.name;
  console.log("receive " + name);

  res.end(JSON.stringify(product_catalog));
});

app.get("/pictute/:name", function(req, res) {
  name = req.params.name;
  console.log("receive picture " + name);

  var filepath = path.join(root, "cat_1.png");
  console.log("picture path = " + filepath);

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

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("application instance http://%s:%s", host, port);
});
