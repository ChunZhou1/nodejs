var mysql = require("mysql");

var sql = {
  insert:
    "insert into product(id, product_name, product_content,product_catalog,link_pic) values(0,?,?,?,?);",
  update:
    "update product set product_name=?, product_content=?,product_catalog=?,link_pic=? where id=?;",
  delete: "delete from product where id=?;",
  queryById: "select * from product where id=?;",
  queryAll: "select * from product;"
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
  add: function(peoduct_name, product_content, product_catalog, link_pic) {
    //begin to query
    //insert into product(id, peoduct_name, product_content,product_catalog,link_pic) values(0,?,?,?,?);",

    console.log("enter query!");
    db.query(
      sql.insert,
      [peoduct_name, product_content, product_catalog, link_pic],
      function(err, result) {
        var return_data;
        if (!err) {
          console.log("add success!");
          return_data = {
            code: 200,
            msg: "add success"
          };
        } else {
          console.log("add fail!");
          return_data = {
            code: 404,
            msg: "add fail"
          };
        }
        console.log("result=", return_data);
      }
    );
    //connect database
  },
  delete: function(id) {
    //delete: "delete from product where id=?;",
    //begin to query
    db.query(sql.delete, [id], function(err, result) {
      var return_data;
      if (!err) {
        return_data = {
          code: 200,
          msg: "delete success"
        };
      } else {
        return_data = {
          code: 404,
          msg: "delete fail"
        };
      }
    });
  },
  update: function(
    peoduct_name,
    product_content,
    product_catalog,
    link_pic,
    id
  ) {
    //  "update product set product_name=?, product_content=?,product_catalog=?,link_pic =? where id=?;",
    //begin to query
    db.query(
      sql.update,
      [peoduct_name, product_content, product_catalog, link_pic, id],
      function(err, result) {
        var return_data;
        if (!err) {
          return_data = {
            code: 200,
            msg: "update success"
          };
        } else {
          return_data = {
            code: 404,
            msg: "update fail"
          };
        }
        console.log("result=", return_data);
      }
    );
  },
  queryById: function(id) {
    //select * from product where id=?;,
    //begin to query
    db.query(sql.queryById, [id], function(err, result) {
      var return_data;
      if (!err) {
        return_data.json(result);
      } else {
        return_data = {
          code: 404,
          msg: "querybyid fail"
        };
      }
    });
  },
  queryAll: function() {
    //sselect * from product;,
    //begin to query
    db.query(sql.queryAll, function(err, result) {
      var return_data;
      if (!err) {
        return_data = result;
      } else {
        return_data = {
          code: 404,
          msg: "querryAll fail"
        };
      }

      console.log(return_data);
    });
  }
};
