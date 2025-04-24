const express = require("express");
const Users = require("./models/user");
const connectDB = require("./config/database");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new Users({
    firstName: "Vishesh",
    lastName: "Rajput",
    email: "visheshr47@gmail.com",
    password: "12345678v",
    gender: "Male",
    age: 28,
  });
  // await user.save();
  // res.send("User Got saved in Database");

  //Error Handling
  try {
    await user.save();
    res.send("User created Successfully");
  } catch (err) {
    res.status(400).send("Error in creating user" + err.message);
  }
});
app.use("/", (req, res) => {
  res.send("Hello to Dashboard");
});

connectDB()
  .then(() => {
    console.log("Database is connected succesfully");
    app.listen(3001, () => {
      console.log("Server is runnig on port 3001");
    });
  })
  .catch((err) => {
    console.error("Error in connecting with database:", err);
  });
