const express = require("express");
const app = express(); // Correct initialization
const port = 8080;
const session = require("express-session");

app.use(
  session({
    secret: "jigarkovanshikapacrushha",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/test", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`bhai ${req.session.count} times request aai`);
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
