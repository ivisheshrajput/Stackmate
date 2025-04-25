const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});
const Users = mongoose.model("User", userSchema); //here this User which is model name will create a collection ie table name of
// which will be user in small letter but it will be plural so nam will be "users" of collection
module.exports = Users;
