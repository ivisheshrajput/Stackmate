const express = require("express");
const profileRoute = express.Router();
const Users = require("../models/user");

profileRoute.patch("/user/:userid", async (req, res) => {
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

module.exports = profileRoute;
