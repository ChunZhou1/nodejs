const express = require("express");

const db_fun = require("./db");

const router_db_get = express.Router();

//test db
//add: function(peoduct_name, product_content, product_catalog, link_pic)

db_fun.queryAll();

router_db_get.get("/:name", (req, res, next) => {});

module.exports = router_db_get;
