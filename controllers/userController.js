const User = require("../models/userModel");

const createUser = async (req, res) => {
  // 1. check if user already exist
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    // if no user exist, create a new user
    const newUser = User.create(req.body);
    res.status(201).json({
      message: "success",
      user: newUser,
    });
  } else {
    // user already exist
    res.status(403).json({
      message: "User already exist",
      success: false,
    });
  }
};

module.exports = {
  createUser,
};
