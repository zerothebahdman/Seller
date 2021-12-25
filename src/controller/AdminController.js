const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppErrorClass");
const { Admin } = require("../../models");
const { loginMethod } = require("./FactoryFunctionController");

const jwtToken = (uuid) =>
  jwt.sign({ uuid }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

exports.getAllAdmins = async (req, res, next) => {
  try {
    const admin = await Admin.findAll();
    console.log(req.admin);
    res.status(200).json({ status: "success", admin });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};
exports.signup = async (req, res, next) => {
  const { name, email, password, shopName, phoneNumber, role } = req.body;
  try {
    const checkIfUserExistsWithEmail = await Admin.findOne({
      where: { email },
    });
    if (checkIfUserExistsWithEmail)
      return next(
        new AppError(
          `Opps!, this email ${email} is already in use please try again`,
          403
        )
      );
    const hashedPassword = await bcrypt.hash(password, 13);
    const admin = await Admin.create({
      name,
      email,
      role,
      password: hashedPassword,
      shop_name: shopName,
      phone_number: phoneNumber,
    });
    const token = jwtToken(admin.uuid);
    res.status(200).json({ status: "success", token, admin });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};
exports.login = loginMethod(Admin);
