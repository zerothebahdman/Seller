const express = require("express");
const {
  createUser,
  getAllUsers,
  getAllReviews,
  getOneUser,
  createReview,
} = require("../controller/UserController");

const router = express.Router();

router.route("/reviews").get(getAllReviews).post(createReview);
router.get("/", getAllUsers);
router.get("/:uuid", getOneUser);

router.post("/", createUser);

module.exports = router;
