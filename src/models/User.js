const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  linkedinId: String,
  githubId: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
