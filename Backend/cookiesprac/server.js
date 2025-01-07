const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const cookieParser = require("cookie-parser");

app.use(cookieParser("SecretCode"));

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(req.signedCookies);
});

app.get("/cookie", (req, res) => {
    res.cookie("name", "jatin", {signed: true});
    res.send("cookie aai");
  });
  

app.listen(port, () => {
  console.log("Server started on port " + port);
});
