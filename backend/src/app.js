const express = require("express");
const Users = require("./models/user");
const connectDB = require("./config/database");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    res.send("User has been created");
  } catch (err) {
    res.status(400).send("Error in storing to database:" + err.message);
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
