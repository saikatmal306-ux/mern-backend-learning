const { getLoginPage, loginUser } = require("../controllers/userController");

const express = require("express");

// Create a new router instance
const router = express.Router();

// Handle GET request for /login
router.get("/login", getLoginPage);
router.post("/login", loginUser);

// Export the router
module.exports = router;
