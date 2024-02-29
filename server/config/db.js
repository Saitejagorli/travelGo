const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connection = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("error while connecting to the database", err);
  }
};

module.exports = connection;
