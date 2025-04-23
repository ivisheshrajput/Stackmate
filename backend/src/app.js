const express = require("express");
//require("./config/database");
const connectDB = require("./config/database");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello to Dashboard");
});

// app.listen(3001, () => {
//   console.log("Server is running on Port 3001");
// });

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
