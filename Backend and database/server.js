import { faker } from "@faker-js/faker";
import mysql from "mysql2";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";
import { connect } from "http2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "1234",
});

app.get("/", (req, res) => {
  try {
    connection.query("Select * from user", (err, result) => {
      if (err) throw err;
      res.render("index.ejs", { result });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/user", (req, res) => {
  let q = "Select * from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.render("user.ejs", { result });
    });
  } catch (err) {
    console.log(err);
  }
  console.log("request received on user route");
});
app.get("/user/register", (req, res) => {
  res.render("newuser.ejs"); // Render the registration form
});

app.post("/user/register", (req, res) => {
  // Access data from req.body
  const data = req.body;
  const id = uuidv4(); // Generate a unique ID

  // Log the data
  const arr = [id, data.username, data.email, data.password];
  const q = "INSERT INTO user (id, username, email, passwod) VALUES (?, ?, ?, ?)"; // Fixed typo

  // Insert the data into the database
  connection.query(q, arr, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting user into database");
    }

    console.log("User inserted:", arr);
    res.redirect("/user"); // Redirect after successful registration
  });
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// let getRandomUser = () => {
//   return {
//     id: faker.string.uuid(),
//     username: faker.internet.username(), // before version 9.1.0, use userName()
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// };

// const connection = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "test",
//   password: "1234",
// });

// let q = "INSERT INTO user (id, username, email, passwod) VALUES (?, ?, ?, ?)"

// for (let i = 0; i<= 10; i++) {
//   let VALUES = [getRandomUser().id, getRandomUser().username, getRandomUser().email, getRandomUser().password];
//   try {
//     connection.query(q, VALUES, (err, result) => {
//       if (err) throw err;
//       console.log(result);
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   if(i>=10){
//     connection.end();
//   }
// }
