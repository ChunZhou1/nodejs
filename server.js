var express = require("express");

const fs = require("fs");
const url = require("url");
const path = require("path");

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

app.get("/:name", function(req, res) {
  console.log(req.url + "777777777");
  var pathname = url.parse(req.url).pathname;

  var filepath = path.join(root, pathname);
  const ext = path.parse(filepath).ext;
  console.log("filepath=" + filepath + " ready to read");

  fs.readFile(filepath, (err, data) => {
    if (!err) {
      console.log(filepath + " read success");

      res.setHeader("Content-type", mimeType[ext] || "text/plain");
      res.end(data);
    } else {
      console.log("read error");
      res.end("404 not found");
    }
  });
});

app.get("/search/:name", function(req, res) {
  console.log("receive ajax");
  res.end(JSON.stringify(product_catalog));
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
