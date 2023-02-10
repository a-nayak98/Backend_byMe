var express = require("express");
var morgan = require("morgan");
// var registerController = require("./controller/registerController");
var userRoutes = require("./routes/userRouter");
var productRoute = require("./routes/productsRouter");

//init expr.app
var app = express();

//global middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(userRoutes);

//@ route get
//@ path /
//@ access public
app.get("/", function (req, res) {
  res.status(200).send("Responce dela kiye..seee.. Server :)");
});

//@ route POST
//@ path /api/register
//@ access Public
// app.post("/api/register", registerController);

//listening to the server
app.listen(
  5656,
  console.log("Hei lo mo na Serverna.. mora sabu ade chinha..5656")
);
