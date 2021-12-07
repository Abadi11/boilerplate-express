var express = require("express");
var env = require("dotenv").config();
var app = express();
console.log("Hello World");
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.use("/public", express.static(__dirname + "/public"));
process.env.MESSAGE_STYLE = "uppercase";
const mySecret = process.env["MESSAGE_STYLE"];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let response;
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({ message: response });
});

module.exports = app;
