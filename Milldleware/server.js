const express = require("express");
const app = express();
const port = 3000;

app.use("/api", (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  } 
});

app.get("/api", (req, res) => {
  res.send(
    "Bhai bhai bada log aap ka pass access bhi ha is chij ka kya bat ha "
  );
});

app.get('/api/:id', (req, res)=>{
  let {id} = req.params;
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
