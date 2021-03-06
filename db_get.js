const express = require("express");

const async = require("async");

const db_fun = require("./db");

//import test data
const my_db_data = require("./public_data");

const router_db_get = express.Router();

//test db
//add: function(peoduct_name, product_content, product_catalog, link_pic)

/*db_fun.add("default", "111111", "smart_home", "cent_1");*/

/*db_fun.db_conection.query(db_fun.query_type.deleteAll, "", function(
  err,
  result
) {
  console.log(result);
});*/

async.each(
  my_db_data.product,
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
    // all complete
    if (err) {
      console.log(err);
    } else {
      console.log("SQL全部执行成功");
    }
  }
);

router_db_get.get("/:name", (req, res, next) => {});

module.exports = router_db_get;
