const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const path = require("path");
const { readFileSync } = require("fs");
const AppError = require("../utils/AppErrorClass");
const { User, Admin } = require("../../models");

// const updatedPassword = () => {};
exports.userAuth = async (req, res, next) => {
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
    //   Check if the token is valid
    const PUB_KEY = readFileSync(
      path.join(__dirname, "../certs/public.pem"),
      "utf-8"
    );

    let decodedToken;
    try {
      decodedToken = await promisify(jwt.verify)(token, PUB_KEY, {
        algorithms: ["RS256"],
      });
    } catch (err) {
      if (err.name === "TokenExpiredError")
        return new AppError("Whoops!, your token has expired.", 401);
    }

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

exports.adminAuth = async (req, res, next) => {
  try {
    let token;
    // Get the token for the current Admin
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];
    //   Check if the Admin is authenticated
    if (!token) {
      return next(
        new AppError("You are not authenticated, please login.", 401)
      );
    }
    //   Check if the token is valid
    const PUB_KEY = readFileSync(
      path.join(__dirname, "../certs/public.pem"),
      "utf-8"
    );

    let decodedToken;
    try {
      decodedToken = await promisify(jwt.verify)(token, PUB_KEY, {
        algorithms: ["RS256"],
      });
    } catch (err) {
      if (err.name === "TokenExpiredError")
        return new AppError("Whoops!, your token has expired.", 401);
    }

    // Check if Admin exist
    const { uuid } = decodedToken;
    const authAdmin = await Admin.findOne({ where: { uuid } });
    if (!authAdmin) return next(new AppError("Admin does not exist", 404));
    if (authAdmin.email_verified_at === null)
      return next(new AppError("Please verify your email address", 403));

    // Check if Admin changed their password after token was issued
    const jwtIssuedAt = (tokenIssuedAt) => {
      if (authAdmin.password_updated_at) {
        const passwordUpdatedAt = parseInt(
          authAdmin.password_updatd_at.getTime() / 1000,
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

    //   Store the authenticated Admin in req object
    req.admin = authAdmin;
    next();
  } catch (err) {
    return new AppError(err.message, err.status);
  }
};
