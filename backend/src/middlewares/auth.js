const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not Valid");
    }
    const decodedObj = await jwt.verify(token, "stackmateprojectkey");
    const { _id } = decodedObj;
    const user = await Users.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR :" + err);
  }
};

module.exports = { userAuth };
