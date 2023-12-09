const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getAUser,
  deleteAUser,
  updatedUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUser);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);
router.put("/:id", updatedUser);

module.exports = router;
