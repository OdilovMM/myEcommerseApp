const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getaUser,
  deleteAUser,
  updatedUser,
  blockUser,
  unBlockUser,
  handlerRefreshToken,
} = require("../controllers/userController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUser);
router.get("/refresh", handlerRefreshToken);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteAUser);
router.put("/:edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
