const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 25,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 25,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    age: {
      type: Number,
      min: 18,
      max: 55,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        } //this will work like this when we create new user we need to make changes to update api to make it work
      },
    },
    photoUrl: {
      type: String,
    },
    skill: {
      type: [String],
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("User", userSchema); //here this User which is model name will create a collection ie table name of
// which will be user in small letter but it will be plural so nam will be "users" of collection
module.exports = Users;
