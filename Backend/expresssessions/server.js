const express = require("express");
const app = express(); // Correct initialization
const port = 8080;
const session = require("express-session");
const flash = require("connect-flash")
const path = require('node:path');
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views")); 

app.use(
  session({
    secret: "jigarkovanshikapacrushha",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.get("/register", (req, res)=>{
  let {name} = req.query;
  req.session.name = name;
  req.flash("success", "user registered successfully")
  res.redirect("/hello");
})

app.get("/hello", (req, res)=>{  
  res.render("renderflash.ejs", { name : req.session.name, msg : req.flash('success')})
})

// app.get("/test", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`bhai ${req.session.count} times request aai`);
// });

app.listen(port, () => {
  console.log("Server started on port " + port);
}); 
