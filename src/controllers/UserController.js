const User = require("../models/User");
const { generateQRCode } = require("../services/generateQR");
const { generateCanvas } = require("../services/generateCanvas");
const path = require("path");

//Register user
const register = async (req, res) => {
  const { name, linkedinId, githubId } = req.body;
  const user = await User.findOne({ name });
  let newUser = undefined;
  //Update user if already exists
  if (user) {
    await User.findOneAndUpdate(
      { name },
      { linkedinId, githubId, __v: user.__v + 1 },
      { new: true }
    );
  }
  // Create new user
  else {
    newUser = await User.create({
      name,
      linkedinId,
      githubId,
    });
  }

  if (newUser !== undefined) {
    res.status(200).json({ message: "User created" });
  } else {
    res.status(200).json({ message: "User updated" });
  }

  // If user is created generate or updated QRCode and canvas
  if (user || newUser) {
    generateQRCode(name)
      .then(() => {
        generateCanvas(name);
      })
      .catch((err) => console.log(`Error generating QR code: ${err}`));
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  const { name } = req.query;
  const currentUser = await User.findOne({ name });
  if (currentUser) {
    res.status(200).json({ currentUser });
  } else {
    res.status(400).json({ error: "User not found" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json({ users });
  } else {
    res.status(400).json({ error: "No users found" });
  }
};

// Get QRCode
const getQRCode = async (req, res) => {
  const { name } = req.query;
  let canvasPath = path.join(__dirname, "..", "data", `canvas-${name}.png`);
  res.sendFile(canvasPath, (err) => {
    if (err) {
      console.log(`Error sending file: ${err}`);
      res.status(500).send({ message: "Error sending file" });
    } else {
      console.log(`File sent: ${canvasPath}`);
    }
  });
};

module.exports = { register, getCurrentUser, getAllUsers, getQRCode };
