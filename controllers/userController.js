const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// 🔥 REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

 const userData = user.toObject();
delete userData.password;

res.status(201).json({
  success: true,
  message: "User registered successfully",
  data: userData,
});
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // ❗ Step 1: check if user exists
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // ❗ Step 2: check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // ❗ Step 3: remove password
  const userData = user.toObject();
  delete userData.password;

  // ❗ Step 4: send response
  res.json({
  success: true,
  message: "Login successful",
  data: userData,
  token: generateToken(user._id),
});
};

const getUserProfile = async (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
};

const updateUserProfile = async (req, res) => {
  // 🔹 Find current user using req.user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // 🔹 Update fields (if provided)
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  // 🔹 Save updated user
  const updatedUser = await user.save();

  // 🔹 Remove password
  const userData = updatedUser.toObject();
  delete userData.password;

  // 🔹 Send response
  res.json({
    success: true,
    message: "Profile updated",
    data: userData,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};

