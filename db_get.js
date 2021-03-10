const express = require("express");

const db_fun = require("./db");

var async = require("async");

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

function db_insert_catalog(json_obj, callback1) {
  async.each(
    json_obj,
    function(item, callback) {
      db_fun.add_catalog(item.catalog_name, item.catalog_pic, function(
        err,
        result
      ) {
        callback(err, result);
      });
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

function db_query_all_catalog(callback1) {
  db_fun.queryAll_catalog(function(err, result) {
    callback1(err, result);
  });
}

function db_deleteAll_product(callback1) {
  db_fun.deleteAll(function(err, result) {
    callback1(err, result);
  });
}

function db_deleteAll_catalog(callback1) {
  db_fun.deleteAll_catalog(function(err, result) {
    callback1(err, result);
  });
}

function db_delete_product(id, callback1) {
  db_fun.delete(function(err, result) {
    callback1(err, result);
  });
}

function db_delete_catalog(id, callback1) {
  db_fun.delete_catalog(function(err, result) {
    callback1(err, result);
  });
}

function db_update_product(id, callback1) {
  db_fun.update(function(err, result) {
    callback1(err, result);
  });
}

function db_update_catalog(id, callback1) {
  db_fun.update_catalog(function(err, result) {
    callback1(err, result);
  });
}

/*db_insert_catalog(my_db_data.product_catalog, function(err, result) {
  if (!err) {
    console.log("insert complete");
  } else {
    console.log("insert fail");
  }
});*/

/*db_deleteAll_catalog(function(err, result) {
  if (!err) {
    console.log("deleteAll complete");
  } else {
    console.log("deleteAll fail");
  }
});*/

/*db_deleteAll_product(function(err, result) {
  if (!err) {
    console.log("deleteAll complete");
  } else {
    console.log("deleteAll fail");
  }
});*/

/*db_insert_product(my_db_data.product, function(err, result) {
  if (!err) {
    console.log("insert complete");
  } else {
    console.log("insert fail");
  }
});*/

router_db_get.get("/:name", (req, res, next) => {});

module.exports = {
  router_db_get: router_db_get,
  db_query_all_product: db_query_all_product,
  db_query_all_catalog: db_query_all_catalog,
  db_insert_product: db_insert_product,
  db_insert_catalog: db_insert_catalog,
  db_deleteAll_product: db_deleteAll_product,
  db_deleteAll_catalog: db_deleteAll_catalog,
  db_delete_product: db_delete_product,
  db_delete_catalog: db_delete_catalog,
  db_update_product: db_update_product,
  db_update_catalog: db_update_catalog
};
