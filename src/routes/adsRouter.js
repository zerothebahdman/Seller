const express = require("express");
const { getAllAd, createAd } = require("../controller/AdsController");
const { adminAuth } = require("../middleware/AuthMiddleware");
const restricTo = require("../middleware/RolesPermissionsMiddleware");

const router = express.Router();

router.route("/").get(getAllAd).post(adminAuth, restricTo("vendor"), createAd);

module.exports = router;
