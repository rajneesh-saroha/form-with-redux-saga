var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");

var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", function (req, res, next) {
  res.status(200);
  res.json({ msg: "received" });
});

app.listen(4000, () => {
  console.log("server running");
});

module.exports = app;
