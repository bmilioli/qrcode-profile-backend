const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGODB_URI;


const conn = async () => {
  try {
    const dbConn = await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB database");
    return dbConn;
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};

module.exports = conn``;
