const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello to Dashboard");
});

app.use("/home", (req, res) => {
  return res.send("Hello to Home");
});
// Note here instead of {} we cannot use ()

app.listen(3001, () => {
  console.log("Server is running on Port 3001");
});
