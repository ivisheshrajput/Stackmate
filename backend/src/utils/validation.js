const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (firstName.length < 4 || firstName.length > 30) {
    throw new Error("First Name should be 4 to 30 words");
  } else if (!firstName || !lastName) {
    throw new Error("Required First Name and Last Name");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid Email");
  }
};
module.exports = { validateSignUpData };
