// Controller to handle the login page request
const getLoginPage = (req, res) => {
  res.send("Login page");
};

// Controller to handle user login
const loginUser = (req, res) => {
  res.send("User logged in");
};

// Export functions
module.exports = {
  getLoginPage,
  loginUser,
};