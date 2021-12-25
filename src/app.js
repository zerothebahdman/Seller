const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRouter");
const adsRouter = require("./routes/adsRouter");
const adminRouter = require("./routes/adminRouter");
const globalErrorHandler = require("./middleware/ErrorHandlerMiddleware");
const AppError = require("./utils/AppErrorClass");

const app = express();

// Middleware that performs body Parsering, reading data from the request body and storing it in req.body
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/ads/", adsRouter);
app.use("/api/v1/admin/", adminRouter);

// Handling unhandled endpoints
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: `fail`,
  //   message: `404 ${req.originalUrl} not found on the server.`,
  // });
  next(new AppError(`Cant find ${req.originalUrl} on the server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
