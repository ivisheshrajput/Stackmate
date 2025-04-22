const express = require("express");
const app = express();

app.use("/home", (req, res) => {
  return res.send("Hello to Home");
});
// Note here instead of {} we cannot use ()

app.get("/userGetParams/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstname: "Vishesh", lastName: "Rajput" });
});
app.get("/userGetQuery", (req, res) => {
  console.log(req.query);
  res.send({ firstname: "Vishesh", lastName: "Rajput" });
});

app.get("/userGet", (req, res) => {
  res.send({ firstname: "Vishesh", lastName: "Rajput" });
});
app.post("/userPost", (req, res) => {
  res.send("Post the Data");
});
app.patch("/userPatch", (req, res) => {
  res.send("Patch the Data");
});
app.delete("/userDelete", (req, res) => {
  res.send("Delete the Data");
});

//Always put this in button
app.use("/", (req, res) => {
  res.send("Hello to Dashboard");
});

app.listen(3001, () => {
  console.log("Server is running on Port 3001");
});
