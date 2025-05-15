const express = require("express");
const profileRoute = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validtateEditProfile } = require("../utils/validation");

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});
profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validtateEditProfile(req)) {
      throw new Error("Invalid Data Request");
    }
    const loggedInUsers = req.user;
    Object.keys(req.body).forEach(
      (key) => (loggedInUsers[key] = req.body[key])
    );
    await loggedInUsers.save();
    console.log(loggedInUsers);
    res.json({
      message: `${loggedInUsers.firstName}, your profile have been updated`,
      data: loggedInUsers,
    });
  } catch (err) {
    res.status(400).send("Error :" + err);
  }
});

module.exports = profileRoute;
