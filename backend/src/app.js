const express = require("express");
const Users = require("./models/user");
const connectDB = require("./config/database");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new Users({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User has been created");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.patch("/user/:userid", async (req, res) => {
  const userID = req.params?.userid;
  const data = req.body;
  console.log(data, "ooooooo");
  try {
    const ALLOWED_DATA = ["age", "skill", "gender", "photoUrl", "about"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_DATA.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Some fields are not allowed");
    }
    if (data?.skill?.length > 10) {
      throw new Error("Skills should be less than 10");
    }
    const user = await Users.findByIdAndUpdate(userID, data, {
      runValidators: true,
    });

    res.send("Update is successful");
  } catch (error) {
    res.status(400).send("Error Occur:" + error);
  }
});

// app.patch("/user", async (req, res) => {
//   const userID = req.body.userId;
//   const data = req.body;
//   try {
//     const user = await Users.findByIdAndUpdate(userID, data, {
//       runValidators: true,
//     });
//     res.send("User is updated");
//   } catch (err) {
//     res.status(400).send("Something went wrong" + err);
//   }
// });

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
