const User = require("../models/userModel");

const createUser = async (req, res) => {
  // 1. check if user already exist
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    // if no user exist, create a new user
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newUser,
      },
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
