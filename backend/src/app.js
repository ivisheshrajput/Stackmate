const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

//Dummy Middleware auth for admin

// 1st way to handle middleware

// app.use("/admin", (req, res, next) => {
//   const token = "xyzy";
//   const isAuthenticated = token === "xyz";
//   if (!isAuthenticated) {
//     res.send("Admin is not Authenticated");
//   } else {
//     next();
//   }
// });
// app.get("/admin/getData", (req, res) => {
//   res.send("Admin will get all Data");
// });
// app.get("/admin/deleteData", (req, res) => {
//   res.send("Admin will delete all Data");
// });

//2nd way to handle middleware the general way in which we create a function
app.use("/admin", adminAuth);
app.get("/admin/getData", (req, res) => {
  res.send("Admin will get all Data");
});
app.get("/admin/deleteData", (req, res) => {
  res.send("Admin will delete all Data");
});

//Dummy middleware auth for user including all routes of /user except /user/login

//by this we can use middleware where we want and restricted to specific route

//if we have used "use" instead of "get" then we need to put /user/login above /user but here it is not required because all
// the /user api are authentication get apis since used app.get by this way we can actually use middleware where we require
// particularly
app.get("/user", userAuth, (req, res) => {
  res.send("We are in User");
});
app.post("/user/login", (req, res) => {
  res.send("Login is directly accessed");
});

// app.get(
//   "/userGet",
//   //All these functions are caller Middlewares
//   (req, res, next) => {
//     console.log("RouteHandler1");
//     res.send("RouteHandler1");
//     next();
//   },
//   (req, res) => {
//     console.log("RouteHandler2");
//     res.send("RouteHandler2");
//   }
// );

// app.use("/home", (req, res) => {
//   return res.send("Hello to Home");
// });
// // Note here instead of {} we cannot use ()

// app.get("/userGetParams/:userId/:name/:password", (req, res) => {
//   console.log(req.params);
//   res.send({ firstname: "Vishesh", lastName: "Rajput" });
// });
// app.get("/userGetQuery", (req, res) => {
//   console.log(req.query);
//   res.send({ firstname: "Vishesh", lastName: "Rajput" });
// });

// app.get("/userGet", (req, res) => {
//   res.send({ firstname: "Vishesh", lastName: "Rajput" });
// });
// app.post("/userPost", (req, res) => {
//   res.send("Post the Data");
// });
// app.patch("/userPatch", (req, res) => {
//   res.send("Patch the Data");
// });
// app.delete("/userDelete", (req, res) => {
//   res.send("Delete the Data");
// });

//Always put this in button
app.use("/", (req, res) => {
  res.send("Hello to Dashboard");
});

app.listen(3001, () => {
  console.log("Server is running on Port 3001");
});
