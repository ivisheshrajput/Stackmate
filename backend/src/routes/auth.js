const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const Users = require("../models/user");

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credential Email");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login is successfull");
    } else {
      throw new Error("Invalid Credential Pass");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err);
  }
});

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
  res
    .clearCookie("token", null, { expires: new Date(Date.now()) }) //we can use .cookie as well but this is wide spread way
    .send("Logout Successfully"); //common practice in industries i can do here like this res.send but this is to be done like this
});

module.exports = authRouter;
