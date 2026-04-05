const User = require("../models/User");

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

  if (user && (await user.matchPassword(password))) {
    const userData = user.toObject();  // convert mongoose document to plain object
delete userData.password;          // remove password field

res.json({
  success: true,
  message: "Login successful",
  data: userData,
});
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
