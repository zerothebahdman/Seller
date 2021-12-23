const express = require("express");
const {
  getAllUsers,
  getAllReviews,
  getOneUser,
  createReview,
} = require("../controller/UserController");

const { createUser, login } = require("../controller/AuthController");
const { auth } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.route("/reviews").get(auth, getAllReviews).post(createReview);
router.get("/", auth, getAllUsers);
router.get("/:uuid", getOneUser);

router.post("/signup", createUser);
router.post("/login", login);

module.exports = router;
