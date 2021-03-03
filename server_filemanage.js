"use strict";

var fs = require("fs"),
  url = require("url"),
  path = require("path"),
  http = require("http");

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

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || "../skynocean/dist");

console.log("Static root dir: " + root);

// 创建服务器:
var server = http.createServer(function(request, response) {
  // 获得URL的path，类似 '/css/bootstrap.css':
  var pathname = url.parse(request.url).pathname;
  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
  var filepath = path.join(root, pathname);
  console.log("filepath=" + filepath + " ready to read");

  fs.readFile(filepath, (err, data) => {
    if (!err) {
      console.log(filepath + " read success");

      /* response.write(data);*/
      const ext = path.parse(filepath).ext;
      // 根据后缀名获取响应的content-type; 这里的minType定义见上面的代码块
      response.setHeader("Content-type", mimeType[ext] || "text/plain");
      //通过end方法来结束response
      response.end(data);
    } else {
      response.write("404 NOT FOUND ");
      response.end();
    }
  });
});

server.listen(3000);

console.log("Server is running at http://127.0.0.1:3000/");
