const express = require("express");
const {
  login,
  signup,
  getAllAdmins,
} = require("../controller/AdminController");
const { adminAuth } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", adminAuth, getAllAdmins);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
