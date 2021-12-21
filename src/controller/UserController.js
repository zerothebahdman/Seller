// const Sequelize = require("sequelize");
const { User, Reviews } = require("../../models");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const user = await User.create({ name, email, phone_number: phoneNumber });
    res.status(200).json({ status: "success", user });
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.findAll({ include: ["reviews"] }); // The includes method will load the relationship or association between models
    res.status(200).json({ status: "success", user });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({ where: { uuid }, include: ["reviews"] });
    res.status(200).json({ status: "success", user });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
};

exports.createReview = async (req, res, next) => {
  const { review, uuid } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });
    const reviews = await Reviews.create({ review, userId: user.id });
    res.status(200).json({ status: "success", reviews });
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    // The includes object will load the relationship or association between models
    const reviews = await Reviews.findAll({
      include: ["user"],
    });
    res.status(200).json({ status: "success", reviews });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
};

// =================Sequelize methods to perform actions================
// Create - creates a new record
// FindOne - Gets one data from the database
// FindAll - Gets all data from the database
// Destroy - Performs Deletes Operation
// Save - Performs Update Operation
