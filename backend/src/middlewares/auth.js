// const adminAuth = (req, res, next) => {
//   const token = "xyz"; //change this to check other routes for authentication
//   const isAuthenticated = token === "xyz";
//   if (!isAuthenticated) {
//     res.status(401).send("Admin in NOT Authenticated");
//   } else {
//     next();
//   }
// };

// const userAuth = (req, res, next) => {
//   const token = "xyz";
//   const isAuthenticated = token === "xyz";
//   if (!isAuthenticated) {
//     res.send("User in NOT Authenticated");
//   } else {
//     next();
//   }
// };

// module.exports = { adminAuth, userAuth };
