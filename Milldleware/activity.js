const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res)=>{
    res.send("I am main route")
})

app.listen(port, ()=>{
    console.log("App listening on " + port);
})