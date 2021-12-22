const express = require("express");
const {
  getAllUsers,
  getAllReviews,
  getOneUser,
  createReview,
} = require("../controller/UserController");

const { createUser, login } = require("../controller/AuthController");

const router = express.Router();

router.route("/reviews").get(getAllReviews).post(createReview);
router.get("/", getAllUsers);
router.get("/:uuid", getOneUser);

router.post("/signup", createUser);
router.post("/login", login);

module.exports = router;
