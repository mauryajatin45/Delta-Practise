// const express = require("express");
// const app = express();
const mongoose = require("mongoose");
// const port = 3000;

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationships");
}



// app.get("/", (req, res) => {
//   res.send("This is basic server setup");
// });

// app.listen(port, () => {
//   console.log(`app listening on port ${port}`);
// });
