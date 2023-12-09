const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUser);

module.exports = router;
