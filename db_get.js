const express = require("express");

const async = require("async");

const db_fun = require("./db");

//import test data
const my_db_data = require("./public_data");

const router_db_get = express.Router();

function db_insert_product(json_obj, callback1) {
  async.each(
    json_obj,
    function(item, callback) {
      db_fun.add(
        "default",
        item.content,
        item.catalog,
        item.pic_content,
        function(err, result) {
          callback(err, result);
        }
      );
    },
    function(err) {
      callback1(err);
    }
  );
}

function db_query_all_product(callback1) {
    db_fun.queryAll(function(err, result) {
      callback1(err, result);
    });
  }
  
  function db_deleteAll_product(callback1) {
    db_fun.deleteAll(function(err, result) {
      callback1(err, result);
    });
  }

router_db_get.get("/:name", (req, res, next) => {});

module.exports = router_db_get;
