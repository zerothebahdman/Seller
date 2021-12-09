const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.status(200).json(`URL ${req.originalUrl} found`);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
});

module.exports = router;
