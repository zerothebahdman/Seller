const express = require("express");
const { getAllAd, createAd } = require("../controller/AdsController");

const router = express.Router();

router.route("/").get(getAllAd).post(createAd);

module.exports = router;
