const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppErrorClass");
const jwtToken = require("../utils/SignJWT");

const checkPassword = async (storedPassword, incommingPassword) =>
  await bcrypt.compare(storedPassword, incommingPassword);

exports.loginMethod = (Model) => async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      next(new AppError(`Please provide an email and password`, 400));

    const person = await Model.findOne({ where: { email } });
    if (!person || (await checkPassword(person.password, password)))
      next(new AppError(`Incorrect email or password`, 401));
    const token = jwtToken(person.uuid);

    res.status(200).json({
      status: "success",
      token,
      message: `Welcome back ${person.name}`,
    });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};
