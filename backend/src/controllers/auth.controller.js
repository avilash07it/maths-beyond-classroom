const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.error("Login Error:", error);
  
    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};