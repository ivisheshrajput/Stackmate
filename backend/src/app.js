const express = require("express");
const Users = require("./models/user");
const connectDB = require("./config/database");
const app = express();
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);

    // console.log(cookies);
    // res.send("Capturing Cookie");
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

app.delete("/delete", async (req, res) => {
  const userID = req.body.userId;
  try {
    // const user = await Users.findByIdAndDelete({ _id: userID });
    //  Instead of above we can send userID directly for this in mongoose it is provided
    const user = await Users.findByIdAndDelete(userID);
    res.send("User have been deleted");
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

app.get("/user", async (req, res) => {
  const emailUser = req.body.email;
  try {
    const user = await Users.find({ email: emailUser });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).res("Something went wrong:" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await Users.find({});
    if (!users) {
      res.send("No user is present");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something is wrong");
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
