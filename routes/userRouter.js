var express = require("express");
var router = express.Router();
var authenticate = require('../middleware/authenticate');
var registerController = require("../controller/registerController");
var loginController = require("../controller/loginController");
var logoutController = require("../controller/logoutController");


//@ route POST
//@ path /api/register
//@ access Public
router.post("/api/register", registerController);

//@ route POST
//@ path /api/login
//@ access Public
router.post("/api/login", loginController);

//@ route POST
//@ path /api/logout
//@ access Public
router.delete("/api/logout", logoutController);


module.exports = router;
