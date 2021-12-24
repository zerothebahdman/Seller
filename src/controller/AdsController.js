const Ads = require("../../models");

exports.getAllAd = async (req, res, next) => {
  try {
    const ad = await Ads.findAll();
    res.status(200).json({ status: `success`, ad });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
};

exports.createAd = async (req, res, next) => {};
