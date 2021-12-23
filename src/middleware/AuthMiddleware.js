const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppErrorClass");
const { User } = require("../../models");

// const updatedPassword = () => {};
exports.auth = async (req, res, next) => {
  try {
    let token;
    // Get the token for the current user
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];
    //   Check if the user is authenticated
    if (!token) {
      return next(
        new AppError("You are not authenticated, please login.", 401)
      );
    }
    console.log(new Date(1647992159 * 1000));
    //   Check if the token is valid
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_TOKEN
    );

    console.log(decodedToken.uuid);

    // Check if user exist
    const { uuid } = decodedToken;
    const authUser = await User.findOne({ where: { uuid } });
    if (!authUser) return next(new AppError("User does not exist", 404));

    // Check if user changed their password after token was issued
    const jwtIssuedAt = (tokenIssuedAt) => {
      if (authUser.password_updated_at) {
        const passwordUpdatedAt = parseInt(
          authUser.password_updatd_at.getTime() / 1000,
          10
        );
        return passwordUpdatedAt > tokenIssuedAt;
      }
      return false;
    };
    if (jwtIssuedAt(decodedToken.iat)) {
      return next(
        new AppError(
          "You recently chaned your password, please login again.",
          401
        )
      );
    }

    //   Store the authenticated user in req object
    req.user = authUser;
    next();
  } catch (err) {
    return new AppError(err.message, err.status);
  }
};
