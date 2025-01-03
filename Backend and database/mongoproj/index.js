const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "build"); // Adjust 'build' to your public folder name
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// const chats = [
//   { from: "Alice", to: "Bob", message: "Hey, how are you?" },
//   { from: "Bob", to: "Alice", message: "I'm good, thanks! How about you?" },
//   { from: "Charlie", to: "Dave", message: "What's the plan for this weekend?" },
//   {
//     from: "Dave",
//     to: "Charlie",
//     message: "Let's meet up at the park on Saturday!",
//   },
//   {
//     from: "Eve",
//     to: "Frank",
//     message: "Can you send me the report by 5pm today?",
//   },
//   { from: "Frank", to: "Eve", message: "Sure, I’ll send it over soon." },
//   {
//     from: "Grace",
//     to: "Hank",
//     message: "Did you watch the new movie last night?",
//   },
//   {
//     from: "Hank",
//     to: "Grace",
//     message: "Yes, it was amazing! What did you think?",
//   },
//   {
//     from: "Ivy",
//     to: "Jack",
//     message: "Hey, can you help me with this project?",
//   },
//   {
//     from: "Jack",
//     to: "Ivy",
//     message: "Of course! What do you need help with?",
//   },
// ];

// Chat.insertMany(chats)
//   .then(() => console.log("Chats inserted"))
//   .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/chats", async (req, res) => {
  let allChat = await Chat.find();
  res.render("index.ejs", { allChat });
});

app.get("/chats/new", (req, res) => {
  res.render("newchat.ejs");
});

app.post("/chats", async (req, res) => {
  const { from, to, message } = req.body;
  const chat = new Chat({ from, to, message });
  await chat.save();
  res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
  let { chatid } = req.params;
  
  let chat = await Chat.findById(chatid);
  res.render("edit.ejs", { chat });
});
