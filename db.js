var mysql = require("mysql");

var sql_product = {
  insert:
    "insert into product(id, product_name, product_content,product_catalog,link_pic) values(0,?,?,?,?);",
  update:
    "update product set product_name=?, product_content=?,product_catalog=?,link_pic=? where id=?;",
  delete: "delete from product where id=?;",
  queryById: "select * from product where id=?;",
  queryAll: "select * from product;",
  deleteAll: "delete from product;"
};

var sql_catalog = {
  insert: "insert into catalog(id, catalog_name, link_pic) values(0,?,?);",
  update: "update catalog set catalog_name=?, link_pic=? where id=?;",
  delete: "delete from catalog where id=?;",
  queryById: "select * from catalog where id=?;",
  queryAll: "select * from catalog;",
  deleteAll: "delete from catalog;"
};

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "skynocean",
  port: 3306
});

//connect database
db.connect();
console.log("db connected!!");

//database structure: id,product_name,product_catalog,link_pic,product_content
module.exports = {
  add: function(
    peoduct_name,
    product_content,
    product_catalog,
    link_pic,
    callback
  ) {
    //begin to query
    //insert into product(id, peoduct_name, product_content,product_catalog,link_pic) values(0,?,?,?,?);",

    db.query(
      sql_product.insert,
      [peoduct_name, product_content, product_catalog, link_pic],
      function(err, result) {
        callback(err, result);
      }
    );
    //connect database
  },
  delete: function(id, callback) {
    //delete: "delete from product where id=?;",
    //begin to query
    db.query(sql_product.delete, [id], function(err, result) {
      callback(err, result);
    });
  },
  update: function(
    product_name,
    product_content,
    product_catalog,
    link_pic,
    id,
    callback
  ) {
    //  "update product set product_name=?, product_content=?,product_catalog=?,link_pic =? where id=?;",
    //begin to query
    db.query(
      sql_product.update,
      [product_name, product_content, product_catalog, link_pic, id],
      function(err, result) {
        callback(err, result);
      }
    );
  },
  queryById: function(id, callback) {
    //select * from product where id=?;,
    //begin to query
    db.query(sql_product.queryById, [id], function(err, result) {
      callback(err, result);
    });
  },
  queryAll: function(callback) {
    //sselect * from product;,
    //begin to query
    db.query(sql_product.queryAll, function(err, result) {
      callback(err, result);
    });
  },
  deleteAll: function(callback) {
    //delete * from product;,
    //begin to query
    db.query(sql_product.deleteAll, function(err, result) {
      callback(err, result);
    });
  },

  query_type: sql_product,
  db_conection: db,

  add_catalog: function(
    catalog_name,

    link_pic,
    callback
  ) {
    //begin to query
    //insert into product(id, peoduct_name, product_content,product_catalog,link_pic) values(0,?,?,?,?);",

    db.query(sql_catalog.insert, [catalog_name, link_pic], function(
      err,
      result
    ) {
      callback(err, result);
    });
    //connect database
  },
  delete_catalog: function(id, callback) {
    //delete: "delete from product where id=?;",
    //begin to query
    db.query(sql_catalog.delete, [id], function(err, result) {
      callback(err, result);
    });
  },
  update_catalog: function(
    catalog_name,

    link_pic,
    id,
    callback
  ) {
    //  "update product set product_name=?, product_content=?,product_catalog=?,link_pic =? where id=?;",
    //begin to query
    db.query(sql_catalog.update, [catalog_name, link_pic, id], function(
      err,
      result
    ) {
      callback(err, result);
    });
  },
  queryById_catalog: function(id, callback) {
    //select * from product where id=?;,
    //begin to query
    db.query(sql_catalog.queryById, [id], function(err, result) {
      callback(err, result);
    });
  },
  queryAll_catalog: function(callback) {
    //sselect * from product;,
    //begin to query
    db.query(sql_catalog.queryAll, function(err, result) {
      callback(err, result);
    });
  },
  deleteAll_catalog: function(callback) {
    //delete * from product;,
    //begin to query
    db.query(sql_catalog.deleteAll, function(err, result) {
      callback(err, result);
    });
  }
};
