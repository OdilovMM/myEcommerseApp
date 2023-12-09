const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");

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
  // check if user exist or not
  const existUser = await User.findOne({ email });
  if (existUser && (await existUser.isPasswordMatch(password))) {
    res.status(200).json({
      _id: existUser?._id,
      firstname: existUser?.firstname,
      lastname: existUser?.lastname,
      email: existUser?.email,
      mobile: existUser?.mobile,
      token: generateToken(existUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL USERS

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.json(getAllUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  console.log(req.params);

  const { id } = req.params;
  console.log(id);

  try {
    const user = await User.findById(id);
    console.log(user);

    if (!user) return res.status(404).json({ error: "User not found" });
    // console.log(getaUser)
    res.json({
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a single user

const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAUser = await User.findByIdAndDelete(id);
    res.json({
      status: "success",
      data: {
        deleteAUser,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User is blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "User is unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getaUser,
  deleteAUser,
  updatedUser,
  blockUser,
  unBlockUser,
};
