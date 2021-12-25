const AppError = require("../utils/AppErrorClass");

const restricTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.admin.role))
      return next(
        new AppError(`You dont have permission to perform this action`, 403)
      );
    next();
  };

module.exports = restricTo;
