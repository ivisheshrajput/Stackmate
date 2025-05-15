const express = require("express");
const Users = require("./models/user");
const connectDB = require("./config/database");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRoute = require("./routes/profile");
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRoute);

app.use("/", (req, res) => {
  res.send("Hello to Dashboard");
});

connectDB()
  .then(() => {
    console.log("Database is connected succesfully");
    app.listen(8000, () => {
      console.log("Server is runnig on port 8000");
    });
  })
  .catch((err) => {
    console.error("Error in connecting with database:", err);
  });
