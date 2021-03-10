var express = require("express");

var router_upload = require("./process_upload");

var router_file = require("./file_manage");

var router_get = require("./process_get");

var router_db = require("./db_get");

var app = express();

app.use("/upload", router_upload);

app.use("/", router_file);

app.use("/get", router_get);

app.use("/dbget", router_db.router_db_get);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("application instance http://%s:%s", host, port);
});
