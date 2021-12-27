const express = require("express");
const {
  login,
  signup,
  getAllAdmins,
  verifyEmail,
} = require("../controller/AdminController");
const { adminAuth } = require("../middleware/AuthMiddleware");
const restricTo = require("../middleware/RolesPermissionsMiddleware");

const router = express.Router();

router.get("/", adminAuth, restricTo("admin"), getAllAdmins);
router.post("/login", login);
router.post("/signup", signup);

router.post("/verify-email/:verificationToken", verifyEmail);

module.exports = router;
