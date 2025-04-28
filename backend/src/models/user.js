const mongoose = require("mongoose");
const validator = require("validator");
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email format is not correct");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is weak");
        }
      },
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Incorrect URL");
        }
      },
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
