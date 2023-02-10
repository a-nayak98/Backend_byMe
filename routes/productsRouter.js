var express = require("express");
var router = express.Router();
var productsController = require('../controller/productsController');

//@ route GET
//@ path /api/products
//@ access Public
router.post("/api/products", productsController);

module.exports = router;
