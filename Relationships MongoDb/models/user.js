const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationships");
}

const userSchema = new Schema({
  username: { type: String },
  address: [
    {
      location: { type: String },
      city: { type: String },
    },
  ],
});

const User = mongoose.model("User", userSchema);

const userData = async () => {
  let user1 = {
    username: "Jatin Maurya",
    address: {
      location: "Sabarmati",
      city: "Ahmedabad",
    },
  };

  user1.push.address({ location: "Gota", city: "Delhi" });
  let result = await user1.save();
  console.log("user 1");
};

userData();
