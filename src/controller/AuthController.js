const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const AppError = require("../utils/AppErrorClass");

const jwtToken = (uuid) =>
  jwt.sign({ uuid }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

const checkPassword = async (incommingPassword, storedPassword) =>
  await bcrypt.compare(incommingPassword, storedPassword);

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 13);
    const user = await User.create({
      name,
      email,
      phone_number: phoneNumber,
      password: hashedPassword,
    });
    const token = jwtToken(user.uuid);

    res.status(200).json({ status: "success", token, user });
  } catch (err) {
    // res.status(err.status || 500).json(err);
    if (err.name === "SequelizeUniqueConstraintError") {
      return next(
        new AppError(
          "Opps!, This is email is already in use. Please try again.",
          err.status || 500
        )
      );
    }
    return next(new AppError(err.message, err.status || 500));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(
        new AppError(`Please provide a valid email and password`, 404)
      );
    }

    const user = await User.findOne({ where: { email } });
    if (!user || (await checkPassword(user.password, password))) {
      return next(new AppError(`Invalid email or password`, 401));
    }

    const token = jwtToken(user.uuid);

    res
      .status(200)
      .json({ status: "success", token, message: "Logged in successfully" });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};
