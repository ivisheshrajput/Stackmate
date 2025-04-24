const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ivisheshrajput:sIyXI05Diqd7h8oW@stackmate.zo1tqfs.mongodb.net/stackmateDB"
  );
};

module.exports = connectDB;
