const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ivisheshrajput:sIyXI05Diqd7h8oW@stackmate.zo1tqfs.mongodb.net/stackmateDB"
  );
};

// connectDB()
//   .then(() => {
//     console.log("Database is successfully connected");
//   })
//   .catch((err) => {
//     console.log("Error in connecting database:", err);
//   });

module.exports = connectDB;
