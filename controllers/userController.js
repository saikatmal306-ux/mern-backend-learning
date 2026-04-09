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

  // ❗ Check user exists
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // ❗ Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // ❗ Remove password
  const userData = user.toObject();
  delete userData.password;

  res.json({
  success: true,
  message: "Login successful",
  data: userData,
  token: generateToken(user._id), // 🔥 ADD THIS
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

const deleteUserProfile = async (req, res) => {
  // 🔹 Find user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // 🔹 Delete user
  await user.deleteOne();

  res.json({
    success: true,
    message: "User account deleted",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};

