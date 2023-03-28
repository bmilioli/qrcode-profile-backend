const express = require("express");
const router = express.Router();

//Controllers
const {
  register,
  getCurrentUser,
  getAllUsers,
  getQRCode,
} = require("../controllers/UserController");

//Routes
router.post("/register", register);
router.get("/profile", getCurrentUser);
router.get("/all", getAllUsers);
router.get("/generate", getQRCode);
module.exports = router;
