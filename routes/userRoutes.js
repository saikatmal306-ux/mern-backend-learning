const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;