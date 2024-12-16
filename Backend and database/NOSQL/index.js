const { name } = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");

main()
  .then((res) => {
    console.log("Connection Successful " + res);
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const newSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", newSchema);

const user1 = new User({
  name: "Jatin Maurya",
  email: "mauryajatin45@gmail.com",
  age: 18,
});

user1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
