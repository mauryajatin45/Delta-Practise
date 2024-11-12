const express = require('express');
const app = express();

const port =3000; 

// app.get('/', (req, res) =>{
//     // res.send("Response received successfully");
//     res.render("home.ejs")
// });

// app.get('/rolldice', (req, res) =>{
//     let value = Math.ceil(Math.random()*6);
//     res.render("rolldice.ejs", {
//         num: value
//     })
// });

app.get('/ig/:username', (req, res)=>{
    const instadata = require("./data.json");
    const {username} = req.params;
    const data = instadata[username];
    if(data){
        res.render("instagram.ejs", {data});
        console.log(data);
    }else{
        res.render("error.ejs", {username});
    }
});

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});