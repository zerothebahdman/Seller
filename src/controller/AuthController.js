const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const AppError = require("../utils/AppErrorClass");
const jwtToken = require("../utils/SignJWT");
const { loginMethod } = require("./FactoryFunctionController");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const checkIfUserExistsWithEmail = await User.findOne({
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
    // if (err.name === "SequelizeUniqueConstraintError") {
    //   return next(
    //     new AppError(
    //       "Opps!, This is email is already in use. Please try again.",
    //       err.status || 500
    //     )
    //   );
    // }
    return next(new AppError(err.message, err.status || 500));
  }
};

exports.login = loginMethod(User);
