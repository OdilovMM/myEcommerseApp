const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
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
    throw new Error("User already exist!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // check if user exist
  const existUser = await User.findOne({ email });
  if (existUser && (await existUser.isPasswordMatch(password))) {
    res.status(200).json({
      status: "success",
      data: {
        data: existUser,
      },
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  createUser,
  loginUser,
};
