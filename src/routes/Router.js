const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));

// Defining the routes
router.get("/", (req, res) => {
  res.send("Server is up and running");
});

router.post("/generate", (req, res) => {
  console.log(req.body);
});

module.exports = router;
