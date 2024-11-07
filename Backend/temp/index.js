const express = require ("express");
const app = express();

let port = 3000;

app.listen(port, ()=>{
    console.log(`Port running on localhost:${port}`);
})

// app.use((req, res)=>{
//     console.log("request received");
//     res.send({name: 'Jatin', 
//         age:18,
//         Maratial_status: "Single"
//     });
// })

// app.get('/', (req, res)=>{
//     res.send('You are on the root path');
// });

// app.get ('/search', (req, res)=>{
//     res.send('Searching for you!!!');
// });

// app.get('*', (req, res)=>{
//     res.send('Ye page exist nhai karta ha, Dhanayavad!!!');
// });

app.post('/', (req, res)=>{
    res.send('You sent a post request');
});

 app.get('/search', (req, res)=>{
    let {q} = req.query;
    if(!q){
        res.send('Bhai scam mat kar mera sath');
    }
    res.send(`aap ka result ka name ha ${q}` );
 });

 